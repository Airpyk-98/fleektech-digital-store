import { NextResponse } from 'next/server';
import { updateUserPassword, getUserByEmail } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, email, oldPassword, newPassword } = await request.json();
    if (!newPassword || (!userId && !email)) {
      return NextResponse.json({ success: false, error: 'User identifier and new password are required' }, { status: 400 });
    }

    let user = null;
    if (email) {
      user = await getUserByEmail(email);
    }
    
    const targetId = userId || (user ? user.id : null);
    if (!targetId) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    if (user && oldPassword && user.password !== oldPassword) {
      return NextResponse.json({ success: false, error: 'Incorrect old password' }, { status: 401 });
    }

    const updated = await updateUserPassword(targetId, newPassword);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Failed to update password' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (err: any) {
    console.error('Change password error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
