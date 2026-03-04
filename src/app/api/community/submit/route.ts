import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, locationName, latitude, longitude, storyText, consent } = body;

    if (!title || typeof title !== 'string' || title.length < 1) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    if (!['gear', 'story'].includes(category)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return NextResponse.json({ error: 'Valid location required' }, { status: 400 });
    if (!storyText || storyText.length < 10) return NextResponse.json({ error: 'Story must be at least 10 characters' }, { status: 400 });
    if (consent !== true) return NextResponse.json({ error: 'Consent is required' }, { status: 400 });

    // In production: create Sanity document with approvalStatus: 'pending'
    console.log('[Community Submit]', { title, category, location: locationName });
    return NextResponse.json({ success: true, message: 'Your story is under review.' });
  } catch (error) {
    console.error('[Community Submit] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
