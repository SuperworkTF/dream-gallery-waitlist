# waitlist-gpt

Standalone Next.js waitlist app for Dream Gallery.

## Run locally

```bash
pnpm install
pnpm dev
```

## Required env

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_APP_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

Without KV env vars, waitlist submissions fall back to in-memory storage for local development only.

## Routes

- `/` - waitlist landing page
- `/api/waitlist` - submission endpoint
- `/opengraph-image` - OG image
- `/twitter-image` - Twitter image
