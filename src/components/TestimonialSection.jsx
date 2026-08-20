import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/products';
import DraggableTextBlock from './DraggableTextBlock';

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <section
      id="reviews"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="site-container">
        {/* Top Header Bar: 01/8 | [Testimonial] | " */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
          }}
          className="reveal-blur"
        >
          {/* Counter: 01/08 */}
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: '#000000',
                lineHeight: '1',
                letterSpacing: '-0.03em',
              }}
            >
              0{currentIndex + 1}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                color: '#a1a1aa',
                fontWeight: 500,
              }}
            >
              /0{TESTIMONIALS_DATA.length}
            </span>
          </div>

          {/* Center Tag: [Testimonial] */}
          <DraggableTextBlock
            id="testimonial_tag"
            as="div"
            defaultText="[Testimonial]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#18181b',
            }}
          />

          {/* Top Right Quote Badge */}
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f4f4f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#000000',
            }}
          >
            “
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="testimonial-main-grid"
        >
          {/* Left Column: Author Info & Cutout Image Card */}
          <div style={{ maxWidth: '340px' }} className="reveal-blur delay-1">
            <div style={{ marginBottom: '1.5rem' }}>
              <DraggableTextBlock
                id={`testimonial_author_${currentIndex}`}
                as="div"
                key={`author-${currentIndex}`}
                defaultText={`[${current.name}]`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#000000',
                }}
              />
              <DraggableTextBlock
                id={`testimonial_role_${currentIndex}`}
                as="div"
                key={`role-${currentIndex}`}
                defaultText={current.role}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  marginTop: '0.25rem',
                }}
              />
            </div>

            {/* Reviewer Photo with Bottom-Left Diagonal Cutout */}
            <div
              style={{
                width: '100%',
                height: '380px',
                overflow: 'hidden',
                backgroundColor: '#e6e6e8',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 22% 100%, 0 78%)',
                marginBottom: '1.5rem',
              }}
            >
              <img
                key={`img-${current.id}-${currentIndex}`}
                src={current.image}
                alt={current.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  animation: 'fadeIn 0.35s ease',
                }}
              />
            </div>

            {/* Left Nav Arrow */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #d4d4d8',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.backgroundColor = '#f4f4f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d4d4d8';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #d4d4d8',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.backgroundColor = '#f4f4f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d4d4d8';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Bold Display Quote & Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }} className="reveal-blur delay-2">
            <DraggableTextBlock
              id={`testimonial_quote_${currentIndex}`}
              as="blockquote"
              key={`quote-${currentIndex}`}
              multiline
              defaultText={current.quote}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.75rem, 3.4vw, 3rem)',
                fontWeight: 700,
                lineHeight: '1.24',
                letterSpacing: '-0.035em',
                color: '#000000',
              }}
            />

            {/* Rating Stars & Count & Highlight Badge */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#ff7a00" color="#ff7a00" />
                ))}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#18181b',
                }}
              >
                {current.rating.toFixed(1)} ({current.reviewCount} Verified Reviews)
              </span>
              {current.highlight && (
                <span
                  style={{
                    padding: '0.3rem 0.75rem',
                    backgroundColor: '#f4f4f5',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#52525b',
                  }}
                >
                  {current.highlight}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: See What Our Customers Are Saying | ” | Next Arrow */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="reveal-blur"
        >
          <DraggableTextBlock
            id="testimonial_bottom_bar"
            as="div"
            defaultText="See What Our Customers Are Saying"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#3f3f46',
            }}
          />

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '2.2rem',
              lineHeight: '1',
              color: '#000000',
              fontWeight: 800,
            }}
          >
            ”
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              border: '1px solid #d4d4d8',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000000';
              e.currentTarget.style.backgroundColor = '#f4f4f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d4d4d8';
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .testimonial-main-grid {
            grid-template-columns: 340px 1fr !important;
            gap: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
