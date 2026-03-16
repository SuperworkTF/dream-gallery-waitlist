import { kv } from '@vercel/kv';

export type WaitlistEntry = {
  email: string;
  locale: string;
  source: string;
  createdAt: string;
  referrer: string | null;
  userAgent: string | null;
};

declare global {
  var dreamGalleryWaitlistStore: Map<string, WaitlistEntry> | undefined;
}

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function getMemoryStore() {
  if (!globalThis.dreamGalleryWaitlistStore) {
    globalThis.dreamGalleryWaitlistStore = new Map<string, WaitlistEntry>();
  }

  return globalThis.dreamGalleryWaitlistStore;
}

let hasWarnedNoKv = false;

export async function createWaitlistEntry(entry: WaitlistEntry) {
  if (hasKvConfig()) {
    const wasSet = await kv.set(`waitlist:${entry.email}`, entry, { nx: true });
    if (!wasSet) {
      throw new Error('Email already exists');
    }

    return;
  }

  if (!hasWarnedNoKv) {
    hasWarnedNoKv = true;
    console.warn(
      '[waitlist] KV_REST_API_URL / KV_REST_API_TOKEN not set — using in-memory storage. Data will be lost on restart.'
    );
  }

  const store = getMemoryStore();
  if (store.has(entry.email)) {
    throw new Error('Email already exists');
  }

  store.set(entry.email, entry);
}
