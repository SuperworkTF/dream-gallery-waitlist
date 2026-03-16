'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

/* ── Step mini-screen mockups ── */
function StepVoiceScreen({ dreamText }: { dreamText: string }) {
  return (
    <div className="step-screen flex h-full flex-col p-5">
      {/* Status bar */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-[9px] text-white/25">Dream Gallery</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f0cf9d]/80" />
          <span className="font-mono text-[9px] text-[#f0cf9d]/60">REC</span>
        </div>
      </div>
      {/* Waveform */}
      <div className="flex flex-1 items-center justify-center gap-[3px] py-4">
        {[18, 28, 36, 24, 40, 32, 20, 36, 26].map((h, i) => (
          <div
            key={i}
            className="waveform-bar w-[3px] rounded-full bg-gradient-to-t from-[#f0cf9d]/40 to-[#f0cf9d]"
            style={{ height: h }}
          />
        ))}
      </div>
      {/* Transcription */}
      <div className="mt-auto rounded-xl bg-white/[0.03] px-4 py-3">
        <p className="line-clamp-2 text-[11px] leading-relaxed text-white/40">
          {dreamText}
        </p>
      </div>
      {/* Mic button */}
      <div className="mt-4 flex justify-center">
        <div className="mic-pulse flex h-11 w-11 items-center justify-center rounded-full bg-[#f0cf9d]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5.5" y="1" width="5" height="9" rx="2.5" fill="#1a1308" />
            <path d="M3 7v1a5 5 0 0 0 10 0V7" stroke="#1a1308" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 13v2" stroke="#1a1308" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StepImageScreen({ dreamText }: { dreamText: string }) {
  return (
    <div className="step-screen flex h-full flex-col overflow-hidden">
      {/* Generated image */}
      <div className="relative">
        <Image
          src="/showcase-dream.png"
          alt=""
          width={400}
          height={260}
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1118] via-transparent to-transparent" />
      </div>
      {/* Caption */}
      <div className="flex flex-1 flex-col gap-3 p-5 pt-3">
        <p className="line-clamp-2 text-[11px] leading-relaxed text-white/35">
          {dreamText}
        </p>
        <div className="mt-auto flex gap-2">
          {['mystical', 'cave', 'trust'].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#c4a882]/[0.08] px-2.5 py-1 font-mono text-[9px] text-[#c4a882]/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCalendarScreen() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const dreamDays = new Set([3, 7, 10, 11, 15, 18, 22, 25]);
  const today = 16;
  return (
    <div className="step-screen flex h-full flex-col p-5">
      {/* Month header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold text-white/70">2026. 03</span>
        <div className="flex gap-2 text-[10px] text-white/25">
          <span>◂</span>
          <span>▸</span>
        </div>
      </div>
      {/* Weekday header */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="font-mono text-[8px] text-white/20">{d}</span>
        ))}
      </div>
      {/* Days grid */}
      <div className="grid flex-1 grid-cols-7 gap-[3px]">
        {days.map((d) => {
          const hasDream = dreamDays.has(d);
          const isToday = d === today;
          return (
            <div
              key={d}
              className={`flex flex-col items-center justify-center rounded-lg py-1 text-center ${
                isToday
                  ? 'bg-[#f0cf9d]/15 ring-1 ring-[#f0cf9d]/30'
                  : hasDream
                    ? 'bg-white/[0.03]'
                    : ''
              }`}
            >
              <span className={`font-mono text-[9px] ${
                isToday ? 'font-semibold text-[#f0cf9d]' : 'text-white/30'
              }`}>
                {d}
              </span>
              {hasDream && (
                <span className={`mt-0.5 h-1 w-1 rounded-full ${
                  isToday ? 'bg-[#f0cf9d]' : 'bg-[#c4a882]/50'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
  const mono = (extra = '') =>
    `font-mono ${isCjk ? '' : 'uppercase tracking-[0.1em]'} ${extra}`.trim();

  // ── Locale persistence ──
  useEffect(() => {
    if (hasRestoredLocaleRef.current) return;
    hasRestoredLocaleRef.current = true;
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY) as WaitlistLocale | null;
    if (stored && stored !== locale && stored in waitlistCopyByLocale) {
      const t = setTimeout(() => setLocale(stored), 0);
      return () => clearTimeout(t);
    }
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `dream-gallery-waitlist-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  // ── Scroll reveal (re-run when locale changes → new DOM nodes) ──
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [locale]);

  // ── Form submit ──
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
          const msg =
            payload.error?.code === 'CONFLICT'
              ? copy.duplicate
              : payload.error?.code === 'RATE_LIMITED'
                ? copy.rateLimited
                : payload.error?.message || copy.error;
          setStatus('error');
          setMessage(msg);
          return;
        }
        setStatus('success');
        setMessage(copy.success);
        setEmail('');
      } catch {
        setStatus('error');
        setMessage(copy.error);
      }
    },
    [copy, email, locale]
  );

  const stepScreens = [
    <StepVoiceScreen key="v" dreamText={copy.showcaseDreamText} />,
    <StepImageScreen key="i" dreamText={copy.showcaseDreamText} />,
    <StepCalendarScreen key="c" />,
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0e15] text-[#eeeef4]">
      {/* ── Background layers ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="metro-grid absolute inset-0" />
        <div className="metro-noise absolute inset-0" />
      </div>

      {/* ── Fixed Nav ── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0e15]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <div className={`${mono()} text-[13px] text-[#c4a882]`}>
            Dream Gallery<span className="pulse-dot" />
          </div>
          <select
            aria-label={copy.localeLabel}
            value={locale}
            onChange={(e) => setLocale(e.target.value as WaitlistLocale)}
            className={`${mono()} rounded bg-transparent px-2 py-1 text-[12px] text-white/50 outline-none transition hover:text-white/80`}
          >
            {waitlistLocaleOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0b0e15] text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          Section 1: HERO
      ══════════════════════════════════════════ */}
      <section className="full-section relative px-6 pt-20">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto flex max-w-[1100px] flex-col items-center justify-center text-center"
             style={{ minHeight: 'calc(100vh - 80px)' }}>
          {/* Badge */}
          <div className={`${mono()} mb-8 rounded-full border border-[#c4a882]/20 bg-[#c4a882]/[0.06] px-4 py-1.5 text-[11px] text-[#c4a882]`}>
            {copy.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="metro-headline max-w-4xl whitespace-pre-line font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {copy.headline}
          </h1>

          {/* Sub */}
          <p className="mt-8 max-w-xl whitespace-pre-line text-[16px] leading-[1.8] text-white/50">
            {copy.subheadline}
          </p>

          {/* Email form */}
          <form
            id="waitlist-form"
            className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              className="flex-1 rounded-xl border border-white/10 bg-[#1a1a2e]/60 px-5 py-4 font-mono text-[14px] text-white placeholder:text-white/25 outline-none transition focus:border-[#c4a882]/50 focus:bg-[#1a1a2e]"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="metro-cta-btn shrink-0 rounded-xl px-8 py-4 text-[15px] font-bold tracking-wide disabled:cursor-wait disabled:opacity-60"
            >
              {status === 'submitting' ? copy.submitting : copy.submit}
            </button>
          </form>
          {message && (
            <p
              className={`mt-3 rounded-lg border px-4 py-2.5 text-[13px] ${
                status === 'success'
                  ? 'border-emerald-400/25 bg-emerald-500/8 text-emerald-300/90'
                  : 'border-rose-400/25 bg-rose-500/8 text-rose-300/90'
              }`}
            >
              {message}
            </p>
          )}
          <p className="mt-4 text-[12px] text-white/30">{copy.trust}</p>

          {/* Stats row */}
          <div className="mt-auto flex flex-wrap items-center justify-center gap-8 pb-8 pt-12">
            {copy.stats.map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#c4a882]/50" />
                <span className={`${mono()} text-[11px] text-white/35`}>{stat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 2: SHOWCASE — product preview
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="reveal mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Left: text */}
          <div className="max-lg:text-center">
            <div className={`${mono()} text-[12px] text-[#c4a882]/70`}>{copy.showcaseTitle}</div>
            <h2 className="mt-3 text-[clamp(1.4rem,3.5vw,2.2rem)] font-semibold leading-snug tracking-[-0.02em] text-white/90">
              {copy.showcaseBody}
            </h2>

            {/* Feature dots */}
            <div className="mt-8 space-y-4 max-lg:mx-auto max-lg:max-w-sm">
              {Object.entries(copy.showcaseLabels).map(([key, label], i) => (
                <div key={`label-${i}`} className="flex items-start gap-3 max-lg:text-left">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c4a882]/40" />
                  <div>
                    <p className="text-[14px] font-medium text-white/75">{label}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-white/35">
                      {copy.microCopy[key as keyof typeof copy.microCopy]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="relative max-lg:mx-auto">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#c4a882]/[0.06] blur-[80px] lg:-inset-16" />

            <div className="phone-float relative w-full max-w-[340px]">
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                {/* Notch */}
                <div className="relative">
                  <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#111827]" />
                </div>
                <div className="rounded-[26px] border border-white/[0.04] bg-[#0d1220] p-5 pt-7">
                  {/* Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[9px] text-white/30">Dream Gallery</p>
                      <p className="mt-1 font-mono text-[14px] font-semibold text-white/85">
                        {copy.showcaseLabels.voice}
                      </p>
                    </div>
                    <div className="mic-pulse flex h-10 w-10 items-center justify-center rounded-full bg-[#f0cf9d]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <rect x="5.5" y="1" width="5" height="9" rx="2.5" fill="#1a1308" />
                        <path d="M3 7v1a5 5 0 0 0 10 0V7" stroke="#1a1308" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8 13v2" stroke="#1a1308" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  {/* Dream content */}
                  <div className="rounded-2xl border border-white/[0.05] bg-[#161d2f] p-4">
                    <p className="text-[13px] leading-relaxed text-white/50">{copy.showcaseDreamText}</p>
                    <Image
                      src="/showcase-dream.png"
                      alt=""
                      width={400}
                      height={400}
                      priority
                      className="mt-3 h-36 w-full rounded-xl object-cover"
                    />
                    <div className="mt-3 rounded-xl border border-white/[0.04] bg-black/20 p-3">
                      <p className="font-mono text-[9px] text-white/30">
                        {copy.showcaseLabels.interpretation}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-[1.6] text-white/50">
                        {copy.showcaseInterpretation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 3: FEATURES + PERKS
      ══════════════════════════════════════════ */}
      <section className="relative px-6">
        <div className="mx-auto flex max-w-[1100px] flex-col justify-center py-20 sm:py-24">
          <div className="reveal">
            <div className={`${mono()} text-[12px] text-[#c4a882]`}>{copy.perksTitle}</div>
            <h2 className="mt-3 text-[clamp(1.6rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-white/95">
              {copy.cta}
            </h2>
          </div>

          {/* Pillar cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.pillars.map((pillar, i) => (
              <article
                key={`pillar-${i}`}
                className={`feature-card reveal reveal-delay-${i + 1} border border-[#c4a882]/[0.06] bg-[#1a1a2e]/50 p-7 transition-colors hover:bg-[#1a1a2e]/80`}
              >
                <h3 className="font-mono text-[15px] font-semibold text-white/90">{pillar.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-white/45">{pillar.body}</p>
              </article>
            ))}
          </div>

          {/* Perks - horizontal chips */}
          <div className="reveal mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5">
            {copy.perks.map((perk, i) => (
              <div
                key={`perk-${i}`}
                className="flex flex-1 items-start gap-3 rounded-xl border border-[#c4a882]/[0.06] bg-[#c4a882]/[0.03] px-5 py-5"
              >
                <span className="mt-0.5 shrink-0 text-[11px] text-[#c4a882]/60">✦</span>
                <span className="text-[14px] leading-relaxed text-white/55">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 4: HOW IT WORKS — mini-screen flow
      ══════════════════════════════════════════ */}
      <section className="relative px-6 py-28">
        <div className="mx-auto max-w-[1100px]">
          <div className="reveal text-center">
            <h2 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-semibold tracking-[-0.02em] text-white/90">
              {copy.stepsTitle}
            </h2>
          </div>

          {/* 3-column screen cards */}
          <div className="mt-14 grid items-start gap-6 sm:grid-cols-3 sm:gap-7">
            {copy.steps.map((step, i) => (
              <div key={`step-${i}`} className={`reveal reveal-delay-${i + 1}`}>
                {/* Step number + title */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c4a882]/20 font-mono text-[11px] text-[#c4a882]/60">
                    {i + 1}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white/90">{step.title}</h3>
                </div>
                {/* Screen mockup — fixed height, uniform */}
                <div className="h-[320px] sm:h-[360px]">{stepScreens[i]}</div>
                {/* Description below card */}
                <p className="mt-5 text-[14px] leading-[1.75] text-white/45">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          Section 5: CTA + Footer
      ══════════════════════════════════════════ */}
      <section className="relative px-6">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-center py-32 text-center" style={{ minHeight: '80vh' }}>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c4a882]/20 to-transparent" />
          <h2 className="reveal metro-headline text-[clamp(1.8rem,5vw,3.5rem)] font-semibold tracking-[-0.03em]">
            {copy.headline.split('\n')[0]}
          </h2>
          <p className="reveal mt-4 text-[15px] text-white/40">{copy.trust}</p>
          <button
            type="button"
            onClick={() => {
              document.getElementById('waitlist-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            className="reveal metro-cta-btn mt-8 rounded-xl px-10 py-4 text-[15px] font-bold tracking-wide"
          >
            {copy.submit}
          </button>
        </div>

        {/* Footer */}
        <footer className="mx-auto max-w-[1100px] border-t border-white/[0.06] px-6 py-8 pb-20 text-center sm:pb-8">
          <p className="text-[13px] text-white/25">{copy.socialProof}</p>
        </footer>
      </section>

      {/* ── Mobile bottom bar ── */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[#0b0e15]/90 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[13px] font-semibold text-white/90">{copy.cta}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.getElementById('waitlist-form')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }}
            className="metro-cta-btn shrink-0 rounded-xl px-4 py-2.5 font-mono text-[13px] font-semibold"
          >
            {copy.jumpToForm}
          </button>
        </div>
      </div>
    </main>
  );
}
