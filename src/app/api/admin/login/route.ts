import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { adminClient } from '@/sanity/lib/adminClient';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    let { email, password } = await request.json();
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const user = await adminClient.fetch(
      `*[_type == "adminUser" && email == $email][0]`,
      { email }
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isApproved) {
      return NextResponse.json({ error: 'Account pending approval' }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT
    const token = await signToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
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

    return NextResponse.json({
      message: 'Login successful',
      user: { name: user.name, email: user.email, isAdmin: user.isAdmin }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
