import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const VALID_USERS = {
  'muser1': { password: 'mpassword1', blocked: false },
  'muser2': { password: 'mpassword2', blocked: false },
  'muser3': { password: 'mpassword3', blocked: true }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = VALID_USERS[username];
    if (!user) {
      console.log('User not found:', username);
      return NextResponse.json(
        { message: 'Informations de connexion invalides' },
        { status: 401 }
      );
    }

    if (user.blocked) {
      return NextResponse.json(
        { message: 'Ce compte a été bloqué.' },
        { status: 403 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Informations de connexion invalides' },
        { status: 401 }
      );
    }

    const token = sign({ username }, JWT_SECRET, { expiresIn: '24h' });

    console.log('Authentication successful for user:', username);
    return NextResponse.json({ token, success: true });

  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Une erreur est survenue',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}