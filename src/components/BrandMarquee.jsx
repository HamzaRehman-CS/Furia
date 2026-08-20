import React from 'react';

const BRANDS = [
  { name: 'slack', symbol: '✦' },
  { name: 'Dropbox', symbol: '❖' },
  { name: 'Webflow', symbol: '✦' },
  { name: 'Spotify', symbol: '●' },
  { name: 'Dropbox', symbol: '❖' },
  { name: 'Remessa', symbol: '✦' },
  { name: 'ARCHIVE', symbol: '▲' },
  { name: 'MODULAR', symbol: '✦' },
];

export default function BrandMarquee() {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0c0c0e',
        color: '#ffffff',
        padding: '1.25rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 22s linear infinite',
        }}
      >
        {/* First Loop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem', paddingRight: '3.5rem' }}>
          {BRANDS.map((b, idx) => (
            <div
              key={`b1-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#e6e6ea',
                opacity: 0.9,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = '#e6e6ea';
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>{b.symbol}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>

        {/* Second Loop for Seamless Ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem', paddingRight: '3.5rem' }}>
          {BRANDS.map((b, idx) => (
            <div
              key={`b2-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#e6e6ea',
                opacity: 0.9,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.color = '#e6e6ea';
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>{b.symbol}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
