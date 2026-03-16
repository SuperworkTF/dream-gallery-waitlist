import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import WaitlistLanding from '@/components/waitlist/WaitlistLanding';
import { getSiteUrl } from '@/lib/site';
import {
  detectWaitlistLocale,
  normalizeWaitlistLocale,
  waitlistCopyByLocale,
} from '@/lib/waitlist/content';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'Dream Gallery Waitlist',
  description:
    'Voice-first dream capture, AI dream imagery, interpretation, and calendar journaling in one mobile flow.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dream Gallery Waitlist',
    description:
      'Voice-first dream capture, AI dream imagery, interpretation, and calendar journaling in one mobile flow.',
    url: getSiteUrl(),
    siteName: 'Dream Gallery',
    images: [
      {
        url: `${getSiteUrl()}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Dream Gallery waitlist preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream Gallery Waitlist',
    description:
      'Speak your dream, see the image, and keep the meaning in a mobile-first journal.',
    images: [`${getSiteUrl()}/twitter-image`],
  },
};

export default async function HomePage() {
  const headerList = await headers();
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get('dream-gallery-waitlist-locale')?.value;
  const locale = localeFromCookie
    ? normalizeWaitlistLocale(localeFromCookie)
    : detectWaitlistLocale(headerList.get('accept-language'));
  const initialCopy = waitlistCopyByLocale[locale];

  return <WaitlistLanding initialLocale={locale} initialCopy={initialCopy} />;
}
