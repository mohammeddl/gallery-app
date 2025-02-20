import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authService } from '../../../lib/services/auth';
import { likeService } from '../../../lib/services/likes';

export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ isLiked: false });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = authService.verifyToken(token);

    if (!decoded || typeof decoded === 'string' || !decoded.username) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if image is liked
    const isLiked = likeService.isLiked(decoded.username, params.imageId);

    return NextResponse.json({ isLiked });
  } catch (error) {
    console.error('Error checking like status:', error);
    return NextResponse.json(
      { message: 'Error checking like status' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = authService.verifyToken(token);

    if (!decoded || typeof decoded === 'string' || !decoded.username) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    likeService.addLike(decoded.username, params.imageId);

    return NextResponse.json({
      success: true,
      message: 'Image liked successfully'
    });
  } catch (error) {
    console.error('Like error:', error);
    return NextResponse.json(
      { message: 'Failed to process like' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = authService.verifyToken(token);

    if (!decoded || typeof decoded === 'string' || !decoded.username) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    likeService.removeLike(decoded.username, params.imageId);

    return NextResponse.json({
      success: true,
      message: 'Like removed successfully'
    });
  } catch (error) {
    console.error('Unlike error:', error);
    return NextResponse.json(
      { message: 'Failed to remove like' },
      { status: 500 }
    );
  }
}