import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ASSETS } from '../data/products';
import DraggableTextBlock from './DraggableTextBlock';
import { useEditor } from '../context/EditorContext';

export default function Hero({ onQuickView, onAddToCart, onScrollToSection }) {
  const { showGridGuides } = useEditor();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '92vh',
        backgroundColor: '#ebebed',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '1.25rem',
        paddingBottom: '2.5rem',
      }}
    >
      {/* Background Architectural Dashed Vertical Lines */}
      <div className="grid-bg-overlay" style={{ opacity: showGridGuides ? 1 : 0.45, zIndex: 1 }}>
        <div className="grid-bg-col" style={{ borderColor: showGridGuides ? 'rgba(255, 85, 0, 0.25)' : undefined }} />
        <div className="grid-bg-col" style={{ borderColor: showGridGuides ? 'rgba(255, 85, 0, 0.25)' : undefined }} />
        <div className="grid-bg-col" style={{ borderColor: showGridGuides ? 'rgba(255, 85, 0, 0.25)' : undefined }} />
        <div className="grid-bg-col" />
      </div>

      {/* FULL-BLEED STATIC IMAGE BACKGROUND */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
          <img
            src={ASSETS.heroBg || ASSETS.heroModel}
            alt="Hero Background"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              userSelect: 'none',
            }}
          />
        </div>

      {/* MAIN HERO OVERLAY CONTAINER */}
      <div
        className="site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
        }}
      >
        {/* Top Right Label: //STYLED FOR LIFE. */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '0.5rem',
          }}
          className="reveal-blur"
        >
          <DraggableTextBlock
            id="hero_top_label"
            as="span"
            defaultText="//STYLED FOR LIFE."
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#3a3a40',
              display: 'inline-block',
            }}
          />
        </div>

        {/* Hero Flanking Content Overlaid directly ON the video background */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'stretch',
            position: 'relative',
            minHeight: '580px',
          }}
          className="hero-overlay-grid"
        >
          {/* Left Overlay Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              zIndex: 15,
            }}
            className="reveal-blur delay-1"
          >
            {/* Top Left Headline: where / - style */}
            <div>
              <DraggableTextBlock
                id="hero_title_left"
                as="h1"
                multiline
                defaultText={'where\n- style'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(4.2rem, 7.5vw, 7.5rem)',
                  fontWeight: 800,
                  lineHeight: '0.92',
                  letterSpacing: '-0.045em',
                  color: '#000000',
                  marginBottom: '2.5rem',
                  display: 'inline-block',
                  textShadow: '0 0 1px rgba(255,255,255,0.4)',
                }}
              />

              {/* Tag & Description */}
              <div style={{ maxWidth: '300px' }}>
                <DraggableTextBlock
                  id="hero_tag"
                  as="span"
                  defaultText="//FASHION"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#3a3a40',
                    letterSpacing: '0.04em',
                    display: 'block',
                    marginBottom: '1.5rem',
                  }}
                />

                <DraggableTextBlock
                  id="hero_desc"
                  as="p"
                  multiline
                  defaultText={'Explore curated collections\nexclusive drops and everyday\nessentials all thoughtfully\ndesigned in one stylish\nshopping destination.'}
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: '#2a2a30',
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>

            {/* Bottom Left Collection Info */}
            <div style={{ marginTop: '2.5rem' }}>
              <DraggableTextBlock
                id="hero_collection_tag"
                as="div"
                multiline
                defaultText={'/ New\nCollection 2026'}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: '#2a2a30',
                  lineHeight: '1.4',
                  fontWeight: 600,
                }}
              />
            </div>
          </div>

          {/* Right Overlay Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: '100%',
              zIndex: 15,
              textAlign: 'right',
            }}
            className="reveal-blur delay-2"
          >
            {/* Top Right Headline: lives / - now */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <DraggableTextBlock
                id="hero_title_right"
                as="h1"
                multiline
                defaultText={'lives\n- now'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(4.2rem, 7.5vw, 7.5rem)',
                  fontWeight: 800,
                  lineHeight: '0.92',
                  letterSpacing: '-0.045em',
                  color: '#000000',
                  marginBottom: '1.5rem',
                  display: 'inline-block',
                  textAlign: 'left',
                  textShadow: '0 0 1px rgba(255,255,255,0.4)',
                }}
              />
            </div>

            {/* Mid-Right: Draggable Avatar Stack + Orange Plus & Draggable Orange Flower Icon */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2.2rem',
                margin: 'auto 0',
                paddingRight: '1rem',
              }}
            >
              {/* Draggable Avatars Stack + Orange Plus */}
              <DraggableTextBlock
                id="hero_avatar_plus_element"
                as="div"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={ASSETS.reviewerEmma}
                      alt="avatar 1"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ebebed',
                      }}
                    />
                    <img
                      src={ASSETS.wireframeModel}
                      alt="avatar 2"
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ebebed',
                        marginLeft: '-12px',
                      }}
                    />
                    <div
                      onClick={() => onScrollToSection && onScrollToSection('reviews')}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-orange)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        cursor: 'pointer',
                        border: '2px solid #ebebed',
                        marginLeft: '-12px',
                        boxShadow: '0 4px 14px rgba(255, 85, 0, 0.35)',
                      }}
                      title="View customer stories"
                    >
                      +
                    </div>
                  </div>
                </div>
              </DraggableTextBlock>

              {/* Draggable Orange 4-Petal Geometric Flower Icon */}
              <DraggableTextBlock
                id="hero_flower_icon_element"
                as="div"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    cursor: 'pointer',
                  }}
                  className="flower-spin-hover"
                >
                  <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="18" r="16" fill="var(--accent-orange)" />
                    <circle cx="50" cy="82" r="16" fill="var(--accent-orange)" />
                    <circle cx="18" cy="50" r="16" fill="var(--accent-orange)" />
                    <circle cx="82" cy="50" r="16" fill="var(--accent-orange)" />
                    <circle cx="50" cy="50" r="10" fill="#ebebed" />
                  </svg>
                </div>
              </DraggableTextBlock>
            </div>

            {/* Bottom Right: 280K / PEOPLE WE INSPIRE */}
            <div style={{ marginTop: 'auto', textAlign: 'right' }}>
              <DraggableTextBlock
                id="hero_stat_num"
                as="div"
                defaultText="280K"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.6rem, 3.8vw, 3.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#000000',
                  lineHeight: '1',
                }}
              />
              <DraggableTextBlock
                id="hero_stat_label"
                as="div"
                defaultText="PEOPLE WE INSPIRE"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#3a3a40',
                  marginTop: '0.35rem',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-overlay-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
