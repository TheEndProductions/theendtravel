import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since');
  if (!since) return NextResponse.json({ error: 'Missing "since" parameter' }, { status: 400 });

  // In production: query Sanity for pins created after `since`
  // const pin = await sanityClient.fetch(LATEST_PIN_QUERY, { since });
  // return NextResponse.json({ newPin: pin || null });

  return NextResponse.json({ newPin: null });
}
