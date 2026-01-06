import { NextRequest, NextResponse } from 'next/server';
import { saveContact, sendContactEmail, ContactFormData } from '@/app/services/contact';
import { checkRateLimit } from '@/app/services/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown-ip';

    const identifier = `${ip}:${body.email}`;

    // 0️⃣ Rate limit check
    const rateLimit = await checkRateLimit(identifier);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter ?? 3600),
          },
        }
      );
    }

    // 1️⃣ Save to Neon DB
    const saved = await saveContact(body);

    // 2️⃣ Send notification email
    await sendContactEmail(body);

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('Contact Save or Email Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save contact or send email' },
      { status: 500 }
    );
  }
}
