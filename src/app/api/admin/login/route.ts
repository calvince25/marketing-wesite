import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { email } = body;
    const { password } = body;
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = db.findOne('users', u => u.email === email);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (user.isSuspended) {
      return NextResponse.json({ error: 'Account suspended. Contact super admin.' }, { status: 403 });
    }

    if (!user.isApproved) {
      return NextResponse.json({ error: 'Account pending approval by Super Admin.' }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Determine the user's role: superadmin, admin, editor
    const role = user.role || (user.isAdmin ? 'superadmin' : 'editor');

    // Create JWT
    const token = await signToken({
      id: user.id || user._id,
      email: user.email,
      role: role as any,
      name: user.name,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });

    // Log Activity
    db.logActivity(user.email, 'Login', `Successfully logged in from IP.`);

    return NextResponse.json({
      message: 'Login successful',
      user: { name: user.name, email: user.email, role: role }
    });

  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
