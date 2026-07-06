import { NextResponse } from 'next/server';
import { getUserByEmail, createUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password are required' }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    const existing = await getUserByEmail(cleanEmail);
    if (existing) {
      return NextResponse.json({ success: false, error: 'An account with this email already exists' }, { status: 409 });
    }

    const newUser = await createUser({ name: cleanName, email: cleanEmail, password: cleanPass, role: 'user' });
    const { password: _, ...userWithoutPass } = newUser;
    return NextResponse.json({ success: true, user: userWithoutPass });
  } catch (err: any) {
    console.error('Signup error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
