import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/products';
import DraggableTextBlock from './DraggableTextBlock';
import { useEditor } from '../context/EditorContext';

export default function MomentsSection({ onQuickView, onAddToCart }) {
  const { cutShapes } = useEditor();

  return (
    <section
      id="moments"
      style={{
        paddingTop: '5rem',
        paddingBottom: '6rem',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }} className="reveal-blur">
          <DraggableTextBlock
            id="moments_title"
            as="h2"
            multiline
            defaultText={'All - about\nmoments ©26'}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: '1.02',
              color: '#000000',
              display: 'inline-block',
            }}
          />
        </div>

        {/* 2-Column Magazine Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="moments-grid"
        >
          {/* Left Column: Center Tan Jacket Card & Floating Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }} className="reveal-blur delay-1">
            {/* Top Row: 4-petal flower icon & LEARN MORE */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-orange)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d4d4d8' }} />
                <button
                  onClick={() => {
                    const elem = document.getElementById('categories');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-pill"
                  style={{
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.04em',
                    marginLeft: '0.5rem',
                  }}
                >
                  <DraggableTextBlock
                    id="moments_btn_text"
                    as="span"
                    defaultText="LEARN MORE"
                  />
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Floating Orange 4-Petal Flower */}
              <DraggableTextBlock
                id="moments_flower_icon_element"
                as="div"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  className="flower-spin-hover"
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <circle cx="50" cy="20" r="18" fill="var(--accent-orange)" />
                    <circle cx="50" cy="80" r="18" fill="var(--accent-orange)" />
                    <circle cx="20" cy="50" r="18" fill="var(--accent-orange)" />
                    <circle cx="80" cy="50" r="18" fill="var(--accent-orange)" />
                    <circle cx="50" cy="50" r="12" fill="#ffffff" />
                  </svg>
                </div>
              </DraggableTextBlock>
            </div>

            {/* Main Center Image Card with Custom Split Frame */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
              <div
                className={`cut-shape-${cutShapes.momentsCardLeft || 'chamfer'}`}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '460px',
                  backgroundColor: '#e8e8ea',
                }}
              >
                <img
                  src={ASSETS.sweater}
                  alt="Furia Moments Tan Jacket"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Horizontal architectural split line accent matching Screenshot 3 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '64%',
                    left: 0,
                    right: 0,
                    height: '12px',
                    backgroundColor: '#ffffff',
                    zIndex: 3,
                  }}
                />
              </div>

              {/* Caption Bottom */}
              <div style={{ marginTop: '1rem' }}>
                <DraggableTextBlock
                  id="moments_caption_left"
                  as="span"
                  defaultText="©International - going distance 2026"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#000000',
                    fontWeight: 600,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Top Manifesto & Small Thumbnail + Bottom Dagger Jacket Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }} className="reveal-blur delay-2">
            {/* Top Text & ($120) Card Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr',
                gap: '2rem',
                alignItems: 'flex-start',
                position: 'relative',
              }}
              className="editorial-manifesto-row"
            >
              <div>
                <DraggableTextBlock
                  id="moments_manifesto"
                  as="p"
                  multiline
                  defaultText={'Where Elegance Meets\nSustainability Luxury\nMade Accessible'}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                    fontWeight: 600,
                    lineHeight: '1.45',
                    letterSpacing: '-0.02em',
                    color: '#000000',
                  }}
                />
              </div>

              {/* Small Card Top Right with ($120) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '100px',
                    height: '135px',
                    overflow: 'hidden',
                    backgroundColor: '#e8e8ea',
                  }}
                >
                  <img
                    src={ASSETS.editorialCard}
                    alt="Editorial Card"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <DraggableTextBlock
                  id="moments_card1_price"
                  as="span"
                  defaultText="($120)"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#000000',
                  }}
                />
              </div>
            </div>

            {/* Bottom Card Right: Dagger Jacket Detail with Cut & (45%) on right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem' }}>
                <div
                  className={`cut-shape-${cutShapes.momentsCardVarsity || 'chamfer-deep'}`}
                  style={{
                    flex: 1,
                    maxWidth: '420px',
                    height: '360px',
                    overflow: 'hidden',
                    backgroundColor: '#b5b5b8',
                  }}
                >
                  <img
                    src={ASSETS.bomberDetail}
                    alt="Dagger Graphic Jacket"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                {/* (45%) on the Right Side of the Card */}
                <div style={{ paddingBottom: '2rem' }}>
                  <DraggableTextBlock
                    id="moments_card2_badge"
                    as="span"
                    defaultText="(45%)"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      color: '#000000',
                    }}
                  />
                </div>
              </div>

              {/* Caption Bottom Right */}
              <div>
                <DraggableTextBlock
                  id="moments_caption_right"
                  as="span"
                  defaultText="©International - just do it 2026"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#000000',
                    fontWeight: 600,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .moments-grid {
            grid-template-columns: 1fr 1.15fr !important;
            gap: 4rem !important;
          }
        }
        @media (max-width: 600px) {
          .editorial-manifesto-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
