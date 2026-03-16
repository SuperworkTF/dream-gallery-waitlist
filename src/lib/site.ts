export function getSiteUrl() {
  const explicitUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.APP_URL ??
    process.env.SITE_URL;

  if (explicitUrl) {
    return explicitUrl.startsWith('http') ? explicitUrl : `https://${explicitUrl}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}
