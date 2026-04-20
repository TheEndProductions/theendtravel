import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.error('[Kickstarter Signup] Formspree endpoint not configured');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    const fd = new FormData();
    fd.append('email', email);
    fd.append('source', source || 'unknown');
    fd.append('_subject', `[KICKSTARTER] ${email}`);

    const res = await fetch(endpoint, {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[Kickstarter Signup] Formspree rejected:', detail);
      return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }

    console.log(`[Kickstarter Signup] ${email} from ${source || 'unknown'}`);
    return NextResponse.json({ success: true, message: "You're on the list." });
  } catch (error) {
    console.error('[Kickstarter Signup] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
