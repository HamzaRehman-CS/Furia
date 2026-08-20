import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import DraggableTextBlock from './DraggableTextBlock';
import { useEditor } from '../context/EditorContext';

export default function CategoryShowcase({ onQuickView, onAddToCart }) {
  const { cutShapes, categories, setActiveCatalogCategory } = useEditor();
  const [activeCatIndex, setActiveCatIndex] = useState(1);
  const activeCategory = categories[activeCatIndex] || categories[0];
  const sectionRef = useRef(null);

  useEffect(() => {
    let isInView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleKeyDown = (e) => {
      if (!isInView) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveCatIndex((prev) => Math.min(prev + 1, categories.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveCatIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [categories.length]);

  const handleSeeProduct = () => {
    const elem = document.getElementById('momento');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        borderTop: '1px solid var(--border-light)',
        outline: 'none', // hide focus ring
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="category-showcase-grid"
        >
          {/* Left Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '360px',
            }}
            className="reveal-blur delay-1"
          >
            <DraggableTextBlock
              id="categories_intro"
              as="p"
              multiline
              defaultText={"Every piece carries rhythm beyond clothing; it's motion and meaning where street energy meets"}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                marginBottom: '2.5rem',
              }}
            />

            <button
              onClick={handleSeeProduct}
              className="btn-pill"
              style={{
                alignSelf: 'flex-start',
                padding: '0.75rem 1.6rem',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
              }}
            >
              <DraggableTextBlock
                id="categories_btn"
                as="span"
                defaultText="SEE PRODUCT"
              />
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Center Column: Model with Custom Angular Polygon Window Cut (Clean without background rotated box) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '480px',
            }}
            className="reveal-blur"
          >
            {/* Model Card Window with Dynamic Polygon Cut */}
            <div
              className={`cut-shape-${cutShapes.categoryShowcaseCard || 'chamfer-diagonal'}`}
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '340px',
                height: '460px',
                backgroundColor: '#e6e6e8',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <img
                key={activeCategory.id}
                src={activeCategory.image}
                alt={activeCategory.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  animation: 'fadeIn 0.35s ease-out',
                }}
              />
            </div>
          </div>

          {/* Right Column: Categories List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="reveal-blur delay-2"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              {categories.map((cat, idx) => {
                const isActive = activeCatIndex === idx;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setActiveCatIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isActive ? 'translateX(12px)' : 'translateX(0)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                        minWidth: '36px',
                      }}
                    >
                      [{cat.id}]
                    </span>

                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: isActive ? 'clamp(2.2rem, 3.8vw, 3.4rem)' : 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: isActive ? 800 : 500,
                        letterSpacing: '-0.035em',
                        color: isActive ? '#000000' : '#888892',
                        lineHeight: '1.1',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.6rem',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <span>{cat.name}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: isActive ? '1.2rem' : '0.95rem',
                          fontWeight: 500,
                          color: isActive ? 'var(--text-secondary)' : 'var(--text-muted)',
                        }}
                      >
                        ({cat.count})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <DraggableTextBlock
              id="categories_tag"
              as="div"
              defaultText="[CATEGORIES]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .category-showcase-grid {
            grid-template-columns: 1fr 1fr 1.2fr !important;
          }
        }
      `}</style>
    </section>
  );
}
