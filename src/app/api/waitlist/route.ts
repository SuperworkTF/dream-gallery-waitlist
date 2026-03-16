import { NextResponse } from 'next/server';
import { createWaitlistEntry } from '@/lib/waitlist/storage';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' },
      },
      { status: 429 }
    );
  }

  let body: { email?: string; locale?: string; source?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'BAD_REQUEST', message: 'Invalid JSON body' },
      },
      { status: 400 }
    );
  }

  try {

    const email = body.email?.trim().toLowerCase() ?? '';
    const locale = body.locale?.trim() ?? 'en';
    const source = body.source?.trim() ?? 'landing-page';
    const referrer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Invalid email address' },
        },
        { status: 400 }
      );
    }

    await createWaitlistEntry({
      email,
      locale,
      source,
      createdAt: new Date().toISOString(),
      referrer,
      userAgent,
    });

    return NextResponse.json({ success: true, data: { email } }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'CONFLICT', message: 'Email already registered' },
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Unexpected server error' },
      },
      { status: 500 }
    );
  }
}
