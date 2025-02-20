import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authService } from '../../lib/services/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.username || !body.password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const result = await authService.validateCredentials(body);
    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.message === 'Ce compte a été bloqué.' ? 403 : 401 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

