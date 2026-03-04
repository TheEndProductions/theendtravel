import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // In production: create Sanity document
    // await sanityWriteClient.create({
    //   _type: 'kickstarterSignup',
    //   email,
    //   signupDate: new Date().toISOString(),
    //   source: source || 'other',
    //   notified: false,
    // });

    console.log(`[Kickstarter Signup] ${email} from ${source || 'unknown'}`);
    return NextResponse.json({ success: true, message: "You're on the list." });
  } catch (error) {
    console.error('[Kickstarter Signup] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
