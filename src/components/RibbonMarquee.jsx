import React from 'react';

export default function RibbonMarquee({ reverse = false, text }) {
  const items = text || [
    'STYLING',
    'CRAFTED STORIES',
    'PREMIUM MATERIALS',
    'PREMIUM FABRICS',
    'TIMELESS CUTS',
    'URBAN INFLUENCE',
    'SMART STYLING',
    'ARCHITECTURAL FIT',
  ];

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#fafafc',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        padding: '1.2rem 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: reverse ? 'marquee-reverse 30s linear infinite' : 'marquee 30s linear infinite',
        }}
      >
        {/* First Loop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem' }}>
          {items.map((item, idx) => (
            <div
              key={`ribbon-1-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'var(--accent-orange)', fontSize: '1.1rem', fontWeight: 900 }}>+</span>
            </div>
          ))}
        </div>

        {/* Second Loop for Infinite Continuous Animation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', paddingRight: '2.5rem' }}>
          {items.map((item, idx) => (
            <div
              key={`ribbon-2-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'var(--accent-orange)', fontSize: '1.1rem', fontWeight: 900 }}>+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
