import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { name, email } = body;
    const { password } = body;
    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = db.findOne('users', u => u.email === email);

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Check if this is the first user
    const users = db.read('users');
    const isFirstUser = users.length === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: isFirstUser ? 'superadmin' : 'editor', // First user is superadmin, rest are editors by default
      isAdmin: isFirstUser,
      isApproved: isFirstUser, // First user is auto-approved
      isSuspended: false,
      createdAt: new Date().toISOString(),
    };

    const result = db.insert('users', newUser) as typeof newUser & { id: string };

    // Log Activity
    db.logActivity(
      email,
      'Registration',
      isFirstUser 
        ? 'Successfully registered as first user (Super Admin).' 
        : 'Registered successfully. Account pending super admin approval.'
    );

    return NextResponse.json({
      message: isFirstUser 
        ? 'Super Admin registered and approved successfully!' 
        : 'Registration successful! Your account is pending approval from the Super Admin.',
      user: { name: result.name, email: result.email, role: result.role, isApproved: result.isApproved }
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
