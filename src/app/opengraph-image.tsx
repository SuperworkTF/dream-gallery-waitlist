import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at top left, rgba(123,141,184,0.4), transparent 35%), radial-gradient(circle at bottom right, rgba(196,168,130,0.45), transparent 30%), linear-gradient(135deg, #0b0e15 0%, #111827 55%, #161b26 100%)',
          color: '#f4efe7',
          padding: 54,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 36,
            padding: '42px 44px',
            background: 'rgba(14, 19, 31, 0.66)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 760 }}>
            <div
              style={{
                fontSize: 24,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: '#f0cf9d',
              }}
            >
              Dream Gallery Waitlist
            </div>
            <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700 }}>
              Speak your dream. See the image. Keep the meaning.
            </div>
            <div style={{ fontSize: 28, lineHeight: 1.4, color: 'rgba(244,239,231,0.78)' }}>
              Voice-first dream capture, AI imagery, interpretation, and calendar journaling in one
              mobile flow.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 18 }}>
            {['Voice-first', 'AI dream art', 'Interpretation', 'Calendar archive'].map((item) => (
              <div
                key={item}
                style={{
                  padding: '14px 20px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  fontSize: 22,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
