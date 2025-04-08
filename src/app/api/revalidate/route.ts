import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const secret = searchParams.get('secret');

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid revalidation token' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Path parameter is required' }, { status: 400 });
  }

  try {
    // Revalidate the specific path
    revalidatePath(path);
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(), 
      path 
    });
  } catch (err) {
    // If there was an error, return a 500
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 });
  }
}
