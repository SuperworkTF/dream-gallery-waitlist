'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  type WaitlistCopy,
  type WaitlistLocale,
  waitlistCopyByLocale,
  waitlistLocaleOptions,
} from '@/lib/waitlist/content';

type WaitlistLandingProps = {
  initialLocale: WaitlistLocale;
  initialCopy: WaitlistCopy;
};

const LOCALE_STORAGE_KEY = 'dream-gallery-waitlist-locale';

export default function WaitlistLanding({
  initialLocale,
  initialCopy,
}: WaitlistLandingProps) {
  const hasRestoredLocaleRef = useRef(false);
  const [locale, setLocale] = useState<WaitlistLocale>(initialLocale);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const copy = useMemo(
    () => (locale === initialLocale ? initialCopy : waitlistCopyByLocale[locale]),
    [initialCopy, initialLocale, locale]
  );

  const isCjk = locale !== 'en';
  const label = (latinTracking: string) =>
    isCjk ? '' : `uppercase ${latinTracking}`;

  useEffect(() => {
    if (hasRestoredLocaleRef.current) {
      return;
    }

    hasRestoredLocaleRef.current = true;
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY) as WaitlistLocale | null;
    if (storedLocale && storedLocale !== locale && storedLocale in waitlistCopyByLocale) {
      const timer = setTimeout(() => setLocale(storedLocale), 0);
      return () => clearTimeout(timer);
    }
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `dream-gallery-waitlist-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setStatus('error');
      setMessage(copy.error);
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          locale,
          source: `${window.location.pathname}${window.location.search}`,
        }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        error?: { code?: string; message?: string };
      };

      if (!response.ok || !payload.success) {
        const nextMessage =
          payload.error?.code === 'CONFLICT'
            ? copy.duplicate
            : payload.error?.code === 'RATE_LIMITED'
              ? copy.rateLimited
              : payload.error?.message || copy.error;

        setStatus('error');
        setMessage(nextMessage);
        return;
      }

      setStatus('success');
      setMessage(copy.success);
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(copy.error);
    }
  }

  return (
    <main className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#1a2744_0%,#0f1520_40%,#090b10_70%)] text-text-primary">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="waitlist-orb absolute left-[-10rem] top-[-8rem] h-[22rem] w-[22rem] rounded-full bg-[#c4a882]/20 blur-[100px]" />
        <div className="waitlist-orb absolute right-[-6rem] top-24 h-[26rem] w-[26rem] rounded-full bg-[#7b8db8]/15 blur-[100px]" />
        <div className="waitlist-orb absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-[#c4a882]/10 blur-[80px]" />
        <div className="waitlist-grid absolute inset-0" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-32 pt-6 sm:px-8 lg:px-12 lg:pb-20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 pb-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#c4a882]/90">
            Dream Gallery
          </p>
          <label className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/70 backdrop-blur">
            <span>{copy.localeLabel}</span>
            <select
              aria-label={copy.localeLabel}
              value={locale}
              onChange={(event) => setLocale(event.target.value as WaitlistLocale)}
              className="rounded-full bg-transparent pr-1 text-[13px] text-white outline-none"
            >
              {waitlistLocaleOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-[#11151f] text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Hero Grid */}
        <div className="grid flex-1 gap-10 pt-10 pb-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,460px)] lg:items-start lg:gap-16 lg:pt-14">
          {/* Left column */}
          <div className="order-1 max-w-3xl lg:order-1">
            {/* Stats pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {copy.stats.map((item) => (
                <span
                  key={item}
                  className={`rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[12px] ${label('tracking-[0.12em]')} text-white/70 backdrop-blur-sm`}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Headline */}
            <h1 className="waitlist-headline max-w-4xl whitespace-pre-line font-display text-[2.6rem] leading-[1.08] font-semibold tracking-[-0.02em] sm:text-[3.5rem] lg:text-[4.2rem] xl:text-[4.8rem]">
              {copy.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl whitespace-pre-line text-[15px] leading-[1.8] text-white/60 sm:text-base sm:leading-[1.85]">
              {copy.subheadline}
            </p>

            {/* Pillar cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {copy.pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <p className="text-[15px] font-semibold text-white/90">{pillar.title}</p>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-white/50">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Right column - CTA (simplified: no steps) */}
          <div className="order-2 relative lg:sticky lg:top-8 lg:order-2">
            <div className="absolute inset-x-6 top-8 -z-10 h-48 rounded-full bg-[#c4a882]/15 blur-[60px]" />
            <div className="rounded-[28px] border border-white/10 bg-[#0f1420]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
              <p className={`text-[14px] font-semibold ${label('tracking-[0.18em]')} text-[#e8c994]`}>
                {copy.cta}
              </p>
              <p className="mt-3 text-[13px] leading-[1.7] text-white/55">{copy.ctaNote}</p>

              <form id="waitlist-form" className="mt-7 space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-[13px] text-white/65">{copy.emailLabel}</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={copy.emailPlaceholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-[#c4a882]/60 focus:bg-white/[0.08]"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="waitlist-cta-btn w-full rounded-full bg-[#f0cf9d] px-5 py-4 text-[15px] font-semibold text-[#1a1308] transition hover:bg-[#f5d9ae] disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'submitting' ? copy.submitting : copy.submit}
                </button>

                <p className="text-[11px] leading-5 text-white/45">{copy.trust}</p>
                {message ? (
                  <p
                    className={`rounded-2xl border px-4 py-3 text-[13px] ${
                      status === 'success'
                        ? 'border-emerald-400/25 bg-emerald-500/8 text-emerald-300/90'
                        : 'border-rose-400/25 bg-rose-500/8 text-rose-300/90'
                    }`}
                  >
                    {message}
                  </p>
                ) : null}
              </form>

              {/* Perks inside CTA */}
              <div className="mt-7 rounded-2xl border border-white/6 bg-white/[0.03] p-5">
                <p className={`text-[12px] font-semibold ${label('tracking-[0.2em]')} text-[#e8c994]/80`}>
                  {copy.perksTitle}
                </p>
                <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-white/55">
                  {copy.perks.map((perk) => (
                    <li key={perk} className="flex gap-2.5">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c4a882]/70" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Steps + Phone mockup */}
        <div className="grid gap-10 border-t border-white/6 pt-8 pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-center lg:gap-14">
          {/* Steps */}
          <div>
            <p className={`text-[13px] font-semibold ${label('tracking-[0.18em]')} text-[#e8c994]`}>
              {copy.stepsTitle}
            </p>
            <div className="mt-6 space-y-6">
              {copy.steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c4a882]/30 bg-[#c4a882]/8 text-[13px] font-semibold text-[#e8c994]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-white/90">{step.title}</p>
                    <p className="mt-1 text-[13px] leading-[1.7] text-white/55">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-full max-w-sm rounded-[36px] border border-white/10 bg-[#0d1220]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <div className="rounded-[28px] border border-white/6 bg-[#131a2a] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Dream Gallery
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-white/90">{copy.showcaseLabels.voice}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0cf9d] text-[#16110a]">
                  <span className="text-base">●</span>
                </div>
              </div>

              <div className="rounded-[22px] border border-white/6 bg-[#1a2236] p-4">
                <p className="text-[13px] text-white/65">{copy.showcaseDreamText}</p>
                <Image
                  src="/showcase-dream.png"
                  alt=""
                  width={400}
                  height={400}
                  priority
                  className="mt-4 h-28 w-full rounded-[18px] object-cover"
                />
                <div className="mt-3 rounded-[16px] border border-white/6 bg-black/25 p-3">
                  <p className={`text-[10px] ${label('tracking-[0.14em]')} text-white/45`}>
                    {copy.showcaseLabels.interpretation}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[1.6] text-white/60">
                    {copy.showcaseInterpretation}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className={`rounded-xl border border-white/6 py-1.5 text-center text-[11px] ${
                        item === 3 ? 'bg-[#f0cf9d] font-medium text-[#16110a]' : 'bg-white/[0.04] text-white/50'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - social proof only */}
        <div className="border-t border-white/6 pt-8">
          <p className="text-center text-[13px] leading-relaxed text-white/40">{copy.socialProof}</p>
        </div>
      </section>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/8 bg-[#0b0e15]/90 px-4 py-3 backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white/90">{copy.cta}</p>
            <p className="truncate text-[11px] text-white/45">{copy.perks[0]}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.getElementById('waitlist-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            className="shrink-0 rounded-full bg-[#f0cf9d] px-4 py-2.5 text-[13px] font-semibold text-[#1a1308]"
          >
            {copy.jumpToForm}
          </button>
        </div>
      </div>
    </main>
  );
}
