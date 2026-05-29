import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || '08b63914-19d8-41da-8b75-1eb56145f10f'
);

export async function signToken(payload: {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  name: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string; role: string; name: string };
  } catch {
    return null;
  }
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  return await verifyToken(token);
}

export async function requireAuth(allowedRoles?: ('superadmin' | 'admin' | 'editor')[]) {
  const user = await getAuthUser();
  
  if (!user) {
    return { authorized: false, errorResponse: NextResponse.json({ error: 'Authentication required' }, { status: 401 }), user: null };
  }

  // Check if role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role as 'superadmin' | 'admin' | 'editor')) {
    return { authorized: false, errorResponse: NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 }), user };
  }

  return { authorized: true, errorResponse: null, user };
}
