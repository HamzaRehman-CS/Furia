import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ACCORDION_COLLECTIONS, ASSETS } from '../data/products';
import DraggableTextBlock from './DraggableTextBlock';
import { useEditor } from '../context/EditorContext';

export default function CollectionsAccordion({ onQuickView, onAddToCart }) {
  const { cutShapes } = useEditor();
  const [expandedId, setExpandedId] = useState('col-1');

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="collections"
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="collections-layout-grid"
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="reveal-blur delay-1">
            <DraggableTextBlock
              id="accordion_intro"
              as="p"
              multiline
              defaultText="From enduring classics to daring statement pieces, our collections are crafted with intention."
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                maxWidth: '380px',
              }}
            />

            {/* Model Card with Custom Cut Shape Frame */}
            <div
              className="editorial-card"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                backgroundColor: '#f5f5f7',
                maxWidth: '420px',
              }}
            >
              <div
                className={`cut-shape-${cutShapes.accordionCard || 'chamfer-subtle'}`}
                style={{ height: '440px', overflow: 'hidden', backgroundColor: '#e5e5e8' }}
              >
                <img
                  src={ASSETS.wireframeModel}
                  alt="Furia Journey Minimalist Model"
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
            </div>

            {/* Bottom Tag: Being Part Of Our journey */}
            <DraggableTextBlock
              id="accordion_tag"
              as="div"
              defaultText="Being Part Of Our journey"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            />
          </div>

          {/* Right Column: Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }} className="reveal-blur delay-2">
            {ACCORDION_COLLECTIONS.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid',
                    borderColor: isExpanded ? 'rgba(0, 0, 0, 0.2)' : 'var(--border-light)',
                    backgroundColor: isExpanded ? '#fafafc' : '#ffffff',
                    padding: isExpanded ? '2rem' : '1.5rem 2rem',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isExpanded ? 'var(--shadow-md)' : 'none',
                  }}
                >
                  {/* Row */}
                  <div
                    onClick={() => toggleAccordion(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: isExpanded ? 'clamp(1.5rem, 2.5vw, 2.2rem)' : 'clamp(1.25rem, 2vw, 1.6rem)',
                        fontWeight: isExpanded ? 800 : 600,
                        letterSpacing: '-0.03em',
                        color: '#000000',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Arrow */}
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        border: '1px solid rgba(0, 0, 0, 0.25)',
                        backgroundColor: isExpanded ? '#000000' : 'transparent',
                        color: isExpanded ? '#ffffff' : '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Body Content */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '1.75rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '1.5rem',
                        alignItems: 'center',
                      }}
                      className="accordion-body-grid"
                    >
                      <div>
                        <p
                          style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)',
                            marginBottom: '1.75rem',
                            maxWidth: '360px',
                          }}
                        >
                          {item.description}
                        </p>

                        <button
                          onClick={() => {
                            const elem = document.getElementById('momento');
                            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="btn-pill btn-pill-dark"
                          style={{
                            padding: '0.75rem 1.6rem',
                            fontSize: '0.8rem',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {item.cta}
                          <ArrowRight size={15} />
                        </button>
                      </div>

                      {/* Thumbnail Preview */}
                      <div
                        style={{
                          width: '120px',
                          height: '140px',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          backgroundColor: '#f0f0f2',
                          border: '1px solid var(--border-light)',
                          justifySelf: 'end',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .collections-layout-grid {
            grid-template-columns: 1fr 1.3fr !important;
          }
          .accordion-body-grid {
            grid-template-columns: 1fr auto !important;
          }
        }
      `}</style>
    </section>
  );
}
