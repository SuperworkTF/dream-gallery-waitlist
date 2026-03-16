import type { Viewport } from 'next';
import { cookies, headers } from 'next/headers';
import { Inter, Playfair_Display, Geist_Mono, Noto_Serif_KR } from 'next/font/google';
import { detectWaitlistLocale, normalizeWaitlistLocale } from '@/lib/waitlist/content';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const notoSerifKr = Noto_Serif_KR({
  variable: '--font-noto-serif-kr',
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0e15',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const headerList = await headers();
  const localeFromCookie = cookieStore.get('dream-gallery-waitlist-locale')?.value;
  const locale = localeFromCookie
    ? normalizeWaitlistLocale(localeFromCookie)
    : detectWaitlistLocale(headerList.get('accept-language'));

  return (
    <html lang={locale} className={notoSerifKr.variable}>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
