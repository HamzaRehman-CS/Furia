import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, Youtube, Check } from 'lucide-react';
import DraggableTextBlock from './DraggableTextBlock';

export default function Footer({ onSubscribeToast }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (onSubscribeToast) onSubscribeToast(email);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#0d0d0f',
        color: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Main Footer Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4.5rem',
            marginBottom: '5rem',
          }}
          className="footer-main-grid"
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="reveal-blur delay-1">
            <DraggableTextBlock
              id="footer_tag"
              as="span"
              defaultText="CONTACT US"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.08em',
                display: 'inline-block',
              }}
            />

            <div style={{ maxWidth: '480px' }}>
              <DraggableTextBlock
                id="footer_title_1"
                as="h2"
                defaultText="Fast Selling Urban"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: '1.05',
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                }}
              />
              <DraggableTextBlock
                id="footer_title_2"
                as="h2"
                defaultText="___Fashion Collection"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  lineHeight: '1.05',
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                  marginTop: '0.2rem',
                }}
              />
            </div>

            {/* Newsletter Input */}
            <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '420px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '0.4rem 0.5rem 0.4rem 1.4rem',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Send email to us"
                  required
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    width: '100%',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: subscribed ? 'var(--accent-orange)' : '#ffffff',
                    color: subscribed ? '#ffffff' : '#0d0d0f',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {subscribed ? <Check size={18} strokeWidth={3} /> : <ArrowRight size={18} />}
                </button>
              </div>
            </form>

            {/* Follow Us & Social Icons */}
            <div style={{ marginTop: '1rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '1rem',
                }}
              >
                Follow Us
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { icon: <Facebook size={18} />, label: 'Facebook', href: '#' },
                  { icon: <Instagram size={18} />, label: 'Instagram', href: '#' },
                  { icon: <Twitter size={18} />, label: 'X', href: '#' },
                  { icon: <Youtube size={18} />, label: 'YouTube', href: '#' },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    aria-label={s.label}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.color = '#0d0d0f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Information & Nav Columns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }} className="reveal-blur delay-2">
            {/* Contact Details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '2rem',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
                  LOCATION
                </div>
                <DraggableTextBlock
                  id="footer_address"
                  as="div"
                  multiline
                  defaultText="5567 Washington Ave, America, 32289"
                  style={{ fontSize: '0.95rem', color: '#e0e0e6', lineHeight: '1.5', fontWeight: 500 }}
                />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
                  CALL US
                </div>
                <DraggableTextBlock
                  id="footer_phone"
                  as="div"
                  defaultText="+016 78234396"
                  style={{ fontSize: '0.95rem', color: '#e0e0e6', fontWeight: 500 }}
                />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
                  EMAIL
                </div>
                <DraggableTextBlock
                  id="footer_email"
                  as="div"
                  defaultText="hello@orbix.studio"
                  style={{ fontSize: '0.95rem', color: '#e0e0e6', fontWeight: 500 }}
                />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
                  OPEN TIME
                </div>
                <DraggableTextBlock
                  id="footer_hours"
                  as="div"
                  defaultText="08:00 - 11:00 pm"
                  style={{ fontSize: '0.95rem', color: '#e0e0e6', fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Nav Columns: MENU | SHOP | CART */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {/* MENU */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
                  MENU
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['About', 'Industries', 'Product', 'Categories'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SHOP */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
                  SHOP
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Jacket', 'Totebag', 'Hat', 'Blouse'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CART */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
                  CART
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Blog', 'Contact', 'Terms', 'Tutorials'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-orange)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
          className="reveal-blur"
        >
          <div>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginRight: '1rem' }}>Terms & Conditions</a>
            <span>|</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none', marginLeft: '1rem' }}>Privacy Policy</a>
          </div>

          <div>
            <DraggableTextBlock
              id="footer_copyright"
              as="span"
              defaultText="© 2026 Furia. All Rights Reserved."
              style={{ color: 'inherit' }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
