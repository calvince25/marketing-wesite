import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { adminClient } from '@/sanity/lib/adminClient';

export async function POST(request: Request) {
  try {
    let { name, email, password } = await request.json();
    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await adminClient.fetch(
      `*[_type == "adminUser" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Check if this is the first user
    const userCount = await adminClient.fetch(`count(*[_type == "adminUser"])`);
    const isFirstUser = userCount === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _type: 'adminUser',
      name,
      email,
      password: hashedPassword,
      isAdmin: isFirstUser,
      isApproved: isFirstUser, // First user is auto-approved
      createdAt: new Date().toISOString(),
    };

    const result = await adminClient.create(newUser);

    return NextResponse.json({
      message: isFirstUser ? 'Admin registered successfully' : 'Registration successful! Your account is pending approval from the system administrator.',
      user: { name: result.name, email: result.email, isAdmin: result.isAdmin, isApproved: result.isApproved }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
