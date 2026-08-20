import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import DraggableTextBlock from './DraggableTextBlock';
import { useEditor } from '../context/EditorContext';

export default function JacketMomentoCarousel({ onQuickView, onAddToCart }) {
  const { cutShapes, momentoProducts } = useEditor();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
    setActiveIndex((prev) => Math.min(momentoProducts.length - 1, prev + 1));
  };

  return (
    <section
      id="momento"
      style={{
        paddingTop: '6rem',
        paddingBottom: '5rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container">
        {/* Section Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '3.5rem',
          }}
          className="reveal-blur"
        >
          {/* Left Title */}
          <div>
            <DraggableTextBlock
              id="momento_title"
              as="h2"
              multiline
              defaultText={'©furia -\njacket momento'}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: '1.05',
                color: '#000000',
                display: 'inline-block',
              }}
            />
          </div>

          {/* Center Year: 2026 */}
          <div className="momento-year-label">
            <DraggableTextBlock
              id="momento_year"
              as="span"
              defaultText="2026"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#44444c',
              }}
            />
          </div>

          {/* Right Navigation Controls: [Other] & Arrow Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <DraggableTextBlock
              id="momento_tag"
              as="span"
              defaultText="[Other]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#333338',
              }}
            />

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                onClick={handleScrollLeft}
                aria-label="Previous"
                style={{
                  width: '44px',
                  height: '34px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={handleScrollRight}
                aria-label="Next"
                style={{
                  width: '44px',
                  height: '34px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Chamfer Cards Slider */}
        <div
          ref={containerRef}
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'clamp(280px, 28vw, 360px)',
            gap: '2rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            paddingBottom: '2.5rem',
            alignItems: 'start',
          }}
          className="momento-cards-grid reveal-blur delay-1"
        >
          {momentoProducts.map((prod) => (
            <div
              key={prod.id}
              style={{
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => onQuickView(prod)}
            >
              {/* Chamfered Polygonal Card Window */}
              <div
                className={`cut-shape-${cutShapes.momentoCards || 'chamfer'}`}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '460px',
                  backgroundColor: '#e6e6e8',
                  overflow: 'hidden',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Quick Add floating icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart({ ...prod, size: 'M' });
                  }}
                  title="Add to bag"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                    zIndex: 5,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  <ShoppingBag size={15} />
                </button>
              </div>

              {/* Caption Underneath the Chamfer Card */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                {prod.tag === '[Wear the Moment]' ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#000000',
                      letterSpacing: '0.02em',
                    }}
                  >
                    [Wear the Moment]
                  </span>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#000000' }}>
                      {prod.title}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                      ${prod.price}.00
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal Slider Progress Bar Indicator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1.5rem',
          }}
          className="reveal-blur"
        >
          <div
            style={{
              width: '120px',
              height: '4px',
              backgroundColor: '#e0e0e4',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '100%',
                backgroundColor: '#000000',
                borderRadius: '2px',
                transform: `translateX(${activeIndex * 28}px)`,
                transition: 'transform 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .momento-cards-grid::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .momento-year-label {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
