import React, { useState } from 'react';
import {
  Sliders,
  Move,
  Type,
  Scissors,
  ShoppingBag,
  Database,
  X,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  Grid,
  Layers,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react';
import { useEditor } from '../context/EditorContext';

export default function AdminPortal() {
  const {
    texts,
    updateText,
    positions,
    updatePosition,
    resetPosition,
    resetAllPositions,
    cutShapes,
    updateCutShape,
    categories,
    setCategories,
    momentoProducts,
    setMomentoProducts,
    catalogProducts,
    setCatalogProducts,
    isEditMode,
    setIsEditMode,
    isAdminPortalOpen,
    setIsAdminPortalOpen,
    isAuthenticated,
    setIsAuthenticated,
    showGridGuides,
    setShowGridGuides,
    resetAllContent,
    exportConfigJson,
    importConfigJson,
    saveStatus,
  } = useEditor();

  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'content' | 'cuts' | 'products' | 'backup'
  const [contentSection, setContentSection] = useState('hero');
  const [productCatalogCat, setProductCatalogCat] = useState('All');
  const [importJsonText, setImportJsonText] = useState('');

  const shapeOptions = [
    { id: 'chamfer', label: 'Standard Chamfer (16%)', clip: 'polygon(16% 0%, 100% 0%, 100% 84%, 84% 100%, 0% 100%, 0% 16%)' },
    { id: 'chamfer-deep', label: 'Deep Chamfer (24%)', clip: 'polygon(24% 0%, 100% 0%, 100% 76%, 76% 100%, 0% 100%, 0% 24%)' },
    { id: 'chamfer-diagonal', label: 'Diagonal Slice Cut', clip: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' },
    { id: 'angled-top', label: 'Angled Top Right Cut', clip: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)' },
    { id: 'chamfer-subtle', label: 'Subtle Angular (8%)', clip: 'polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)' },
    { id: 'none', label: 'Rounded Rectangle', clip: 'none' },
  ];

  const movedItemsCount = Object.keys(positions).length;

  return (
    <>
      {isAuthenticated && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          {/* Quick Canvas Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: isEditMode ? 'var(--accent-orange)' : '#18181b',
              color: '#ffffff',
              border: isEditMode ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isEditMode ? 'scale(1.04)' : 'scale(1)',
            }}
            title="Toggle Canva-style drag & drop text movement"
          >
            <Move size={15} />
            <span>{isEditMode ? 'Live Canvas: ON' : 'Move Text'}</span>
            {movedItemsCount > 0 && (
              <span
                style={{
                  backgroundColor: isEditMode ? '#ffffff' : 'var(--accent-orange)',
                  color: isEditMode ? 'var(--accent-orange)' : '#ffffff',
                  borderRadius: '9999px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                }}
              >
                {movedItemsCount}
              </span>
            )}
          </button>

          {/* Full Admin Portal Modal Trigger */}
          <button
            onClick={() => setIsAdminPortalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.1rem',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              border: '1px solid rgba(0,0,0,0.15)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Open complete Admin Portal"
          >
            <Sliders size={16} color="var(--accent-orange)" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}

      {/* Floating Save/Status Alert */}
      {saveStatus && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 10000,
            backgroundColor: '#18181b',
            color: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <CheckCircle2 size={16} color="#4ade80" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Edit Mode Visual Indicator Banner at top of page */}
      {isEditMode && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            backgroundColor: 'var(--accent-orange)',
            color: '#ffffff',
            padding: '0.4rem 1rem',
            zIndex: 9990,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(255, 85, 0, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={15} />
            <span>CANVA EDIT MODE ACTIVE: Click and drag any text block anywhere on the screen! Double-click to edit text.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => resetAllPositions()}
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: 'none',
                color: '#ffffff',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <RotateCcw size={12} /> Reset Layout
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '0.2rem 0.75rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              Exit Edit Mode
            </button>
          </div>
        </div>
      )}

      {/* ADMIN PORTAL DRAWER / MODAL */}
      {isAdminPortalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fadeIn 0.25s ease',
          }}
          onClick={() => setIsAdminPortalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '680px',
              height: '100%',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid #e4e4e7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8f8fa',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', lineHeight: 1.2 }}>
                    Furia Admin & Canvas Suite
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#71717a', margin: 0 }}>
                    Live position control, text customization & window styling
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdminPortalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#71717a',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  borderRadius: '6px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #e4e4e7',
                backgroundColor: '#ffffff',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'canvas', label: 'Live Canvas', icon: Move },
                { id: 'content', label: 'Site Content', icon: Type },
                { id: 'cuts', label: 'Window Cuts', icon: Scissors },
                { id: 'products', label: 'Catalog', icon: ShoppingBag },
                { id: 'backup', label: 'Backup & Data', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.85rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--accent-orange)' : '#71717a',
                      border: 'none',
                      borderBottom: isActive ? '2px solid var(--accent-orange)' : '2px solid transparent',
                      background: isActive ? 'rgba(255, 85, 0, 0.04)' : 'transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
              {/* TAB 1: LIVE CANVAS */}
              {activeTab === 'canvas' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Master Toggle Card */}
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      backgroundColor: isEditMode ? 'rgba(255, 85, 0, 0.08)' : '#f4f4f5',
                      border: isEditMode ? '1px solid var(--accent-orange)' : '1px solid #e4e4e7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#000000', marginBottom: '0.2rem' }}>
                        Canva Free Drag-and-Drop Mode
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: '#52525b', margin: 0 }}>
                        Click, drag and freely move all text blocks, headlines and badges anywhere.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      style={{
                        padding: '0.55rem 1.1rem',
                        borderRadius: '8px',
                        backgroundColor: isEditMode ? 'var(--accent-orange)' : '#18181b',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {isEditMode ? 'Active (ON)' : 'Enable'}
                    </button>
                  </div>

                  {/* Actions & Guidelines */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button
                      onClick={() => resetAllPositions()}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #d4d4d8',
                        color: '#dc2626',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <RotateCcw size={15} /> Reset All Positions
                    </button>

                    <button
                      onClick={() => setShowGridGuides(!showGridGuides)}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '8px',
                        backgroundColor: showGridGuides ? '#18181b' : '#ffffff',
                        border: '1px solid #d4d4d8',
                        color: showGridGuides ? '#ffffff' : '#000000',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Grid size={15} /> {showGridGuides ? 'Hide Gridlines' : 'Show Gridlines'}
                    </button>
                  </div>

                  {/* Homepage Decorative Elements Position Suite */}
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      backgroundColor: '#f8f8fa',
                      border: '1px solid #e4e4e7',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', margin: 0 }}>
                          Homepage Decorative Orange Elements
                        </h4>
                        <p style={{ fontSize: '0.75rem', color: '#71717a', margin: 0 }}>
                          Directly reposition the floating orange elements from here or drag them on the live canvas.
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {[
                        { id: 'hero_avatar_plus_element', label: 'Hero: Avatar Stack + Orange Plus' },
                        { id: 'hero_flower_icon_element', label: 'Hero: Orange 4-Petal Geometric Flower' },
                        { id: 'moments_flower_icon_element', label: 'Moments: Orange 4-Petal Spinning Flower' },
                      ].map((item) => {
                        const pos = positions[item.id] || { x: 0, y: 0 };
                        return (
                          <div
                            key={item.id}
                            style={{
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              backgroundColor: '#ffffff',
                              border: '1px solid #e4e4e7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                            }}
                          >
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#18181b' }}>
                              {item.label}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#71717a' }}>
                                <span>X:</span>
                                <input
                                  type="number"
                                  value={pos.x || 0}
                                  onChange={(e) => updatePosition(item.id, { x: Number(e.target.value) })}
                                  style={{
                                    width: '55px',
                                    padding: '0.2rem 0.4rem',
                                    fontSize: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #d4d4d8',
                                  }}
                                />
                                <span>Y:</span>
                                <input
                                  type="number"
                                  value={pos.y || 0}
                                  onChange={(e) => updatePosition(item.id, { y: Number(e.target.value) })}
                                  style={{
                                    width: '55px',
                                    padding: '0.2rem 0.4rem',
                                    fontSize: '0.75rem',
                                    borderRadius: '4px',
                                    border: '1px solid #d4d4d8',
                                  }}
                                />
                              </div>
                              <button
                                onClick={() => resetPosition(item.id)}
                                title="Reset element position"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  padding: '0.2rem',
                                }}
                              >
                                <RotateCcw size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Moved Elements List */}
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', marginBottom: '0.75rem' }}>
                      Customized Element Coordinates ({movedItemsCount})
                    </h4>

                    {movedItemsCount === 0 ? (
                      <div
                        style={{
                          padding: '1.5rem',
                          textAlign: 'center',
                          borderRadius: '8px',
                          border: '1px dashed #d4d4d8',
                          color: '#71717a',
                          fontSize: '0.85rem',
                        }}
                      >
                        No elements have been moved yet. Turn on Live Canvas to drag text elements around.
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {Object.entries(positions).map(([id, pos]) => (
                          <div
                            key={id}
                            style={{
                              padding: '0.75rem 1rem',
                              borderRadius: '8px',
                              backgroundColor: '#f8f8fa',
                              border: '1px solid #e4e4e7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '0.82rem',
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#000000' }}>
                              {id}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                              <span style={{ color: '#71717a' }}>
                                X: <strong>{pos.x}px</strong>, Y: <strong>{pos.y}px</strong>
                              </span>
                              <button
                                onClick={() => resetPosition(id)}
                                title="Reset this block"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  padding: '0.2rem',
                                }}
                              >
                                <RotateCcw size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SITE CONTENT MANAGER */}
              {activeTab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Section Select Chips */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {[
                      { id: 'hero', label: 'Hero' },
                      { id: 'moments', label: 'Moments ©26' },
                      { id: 'categories', label: 'Categories' },
                      { id: 'catalog', label: 'Catalog Grid' },
                      { id: 'momento', label: 'Momento' },
                      { id: 'testimonials', label: 'Testimonials' },
                      { id: 'accordion', label: 'Accordion' },
                      { id: 'footer', label: 'Footer' },
                    ].map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => setContentSection(sec.id)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          backgroundColor: contentSection === sec.id ? '#000000' : '#f4f4f5',
                          color: contentSection === sec.id ? '#ffffff' : '#52525b',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </div>

                  {/* Section Input Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {contentSection === 'hero' && (
                      <>
                        <InputGroup
                          label="Top Right Label"
                          id="hero_top_label"
                          value={texts.hero_top_label}
                          onChange={(v) => updateText('hero_top_label', v)}
                        />
                        <InputGroup
                          label="Left Headline (where / - style)"
                          id="hero_title_left"
                          value={texts.hero_title_left}
                          onChange={(v) => updateText('hero_title_left', v)}
                          multiline
                        />
                        <InputGroup
                          label="Fashion Tag"
                          id="hero_tag"
                          value={texts.hero_tag}
                          onChange={(v) => updateText('hero_tag', v)}
                        />
                        <InputGroup
                          label="Hero Description"
                          id="hero_desc"
                          value={texts.hero_desc}
                          onChange={(v) => updateText('hero_desc', v)}
                          multiline
                        />
                        <InputGroup
                          label="Bottom Left Collection Tag"
                          id="hero_collection_tag"
                          value={texts.hero_collection_tag}
                          onChange={(v) => updateText('hero_collection_tag', v)}
                          multiline
                        />
                        <InputGroup
                          label="Right Headline (lives / - now)"
                          id="hero_title_right"
                          value={texts.hero_title_right}
                          onChange={(v) => updateText('hero_title_right', v)}
                          multiline
                        />
                        <InputGroup
                          label="Stat Number (280K)"
                          id="hero_stat_num"
                          value={texts.hero_stat_num}
                          onChange={(v) => updateText('hero_stat_num', v)}
                        />
                        <InputGroup
                          label="Stat Label (PEOPLE WE INSPIRE)"
                          id="hero_stat_label"
                          value={texts.hero_stat_label}
                          onChange={(v) => updateText('hero_stat_label', v)}
                        />
                      </>
                    )}

                    {contentSection === 'moments' && (
                      <>
                        <InputGroup
                          label="Moments Title"
                          id="moments_title"
                          value={texts.moments_title}
                          onChange={(v) => updateText('moments_title', v)}
                          multiline
                        />
                        <InputGroup
                          label="Button Label"
                          id="moments_btn_text"
                          value={texts.moments_btn_text}
                          onChange={(v) => updateText('moments_btn_text', v)}
                        />
                        <InputGroup
                          label="Left Card Caption"
                          id="moments_caption_left"
                          value={texts.moments_caption_left}
                          onChange={(v) => updateText('moments_caption_left', v)}
                        />
                        <InputGroup
                          label="Manifesto Text"
                          id="moments_manifesto"
                          value={texts.moments_manifesto}
                          onChange={(v) => updateText('moments_manifesto', v)}
                          multiline
                        />
                        <InputGroup
                          label="Small Card Price Badge"
                          id="moments_card1_price"
                          value={texts.moments_card1_price}
                          onChange={(v) => updateText('moments_card1_price', v)}
                        />
                        <InputGroup
                          label="Varsity Discount Badge"
                          id="moments_card2_badge"
                          value={texts.moments_card2_badge}
                          onChange={(v) => updateText('moments_card2_badge', v)}
                        />
                        <InputGroup
                          label="Right Card Caption"
                          id="moments_caption_right"
                          value={texts.moments_caption_right}
                          onChange={(v) => updateText('moments_caption_right', v)}
                        />
                      </>
                    )}

                    {contentSection === 'categories' && (
                      <>
                        <InputGroup
                          label="Section Intro"
                          id="categories_intro"
                          value={texts.categories_intro}
                          onChange={(v) => updateText('categories_intro', v)}
                          multiline
                        />
                        <InputGroup
                          label="Button Text"
                          id="categories_btn"
                          value={texts.categories_btn}
                          onChange={(v) => updateText('categories_btn', v)}
                        />
                        <InputGroup
                          label="Bottom Tag"
                          id="categories_tag"
                          value={texts.categories_tag}
                          onChange={(v) => updateText('categories_tag', v)}
                        />
                      </>
                    )}

                    {contentSection === 'catalog' && (
                      <>
                        <InputGroup
                          label="Catalog Top Tag"
                          id="catalog_tag"
                          value={texts.catalog_tag}
                          onChange={(v) => updateText('catalog_tag', v)}
                        />
                        <InputGroup
                          label="Catalog Main Headline"
                          id="catalog_title"
                          value={texts.catalog_title}
                          onChange={(v) => updateText('catalog_title', v)}
                        />
                        <InputGroup
                          label="Catalog Description Paragraph"
                          id="catalog_desc"
                          value={texts.catalog_desc}
                          onChange={(v) => updateText('catalog_desc', v)}
                          multiline
                        />
                      </>
                    )}

                    {contentSection === 'momento' && (
                      <>
                        <InputGroup
                          label="Momento Title"
                          id="momento_title"
                          value={texts.momento_title}
                          onChange={(v) => updateText('momento_title', v)}
                          multiline
                        />
                        <InputGroup
                          label="Year Label"
                          id="momento_year"
                          value={texts.momento_year}
                          onChange={(v) => updateText('momento_year', v)}
                        />
                        <InputGroup
                          label="Right Tag"
                          id="momento_tag"
                          value={texts.momento_tag}
                          onChange={(v) => updateText('momento_tag', v)}
                        />
                      </>
                    )}

                    {contentSection === 'testimonials' && (
                      <>
                        <InputGroup
                          label="Section Tag"
                          id="testimonial_tag"
                          value={texts.testimonial_tag}
                          onChange={(v) => updateText('testimonial_tag', v)}
                        />
                        <InputGroup
                          label="Featured Quote"
                          id="testimonial_quote"
                          value={texts.testimonial_quote}
                          onChange={(v) => updateText('testimonial_quote', v)}
                          multiline
                        />
                        <InputGroup
                          label="Author Name"
                          id="testimonial_author"
                          value={texts.testimonial_author}
                          onChange={(v) => updateText('testimonial_author', v)}
                        />
                        <InputGroup
                          label="Author Role"
                          id="testimonial_role"
                          value={texts.testimonial_role}
                          onChange={(v) => updateText('testimonial_role', v)}
                        />
                        <InputGroup
                          label="Bottom Bar Slogan"
                          id="testimonial_bottom_bar"
                          value={texts.testimonial_bottom_bar}
                          onChange={(v) => updateText('testimonial_bottom_bar', v)}
                        />
                      </>
                    )}

                    {contentSection === 'accordion' && (
                      <>
                        <InputGroup
                          label="Left Intro Paragraph"
                          id="accordion_intro"
                          value={texts.accordion_intro}
                          onChange={(v) => updateText('accordion_intro', v)}
                          multiline
                        />
                        <InputGroup
                          label="Bottom Tag"
                          id="accordion_tag"
                          value={texts.accordion_tag}
                          onChange={(v) => updateText('accordion_tag', v)}
                        />
                      </>
                    )}

                    {contentSection === 'footer' && (
                      <>
                        <InputGroup
                          label="Footer Headline 1"
                          id="footer_title_1"
                          value={texts.footer_title_1}
                          onChange={(v) => updateText('footer_title_1', v)}
                        />
                        <InputGroup
                          label="Footer Headline 2"
                          id="footer_title_2"
                          value={texts.footer_title_2}
                          onChange={(v) => updateText('footer_title_2', v)}
                        />
                        <InputGroup
                          label="Location Address"
                          id="footer_address"
                          value={texts.footer_address}
                          onChange={(v) => updateText('footer_address', v)}
                        />
                        <InputGroup
                          label="Phone Number"
                          id="footer_phone"
                          value={texts.footer_phone}
                          onChange={(v) => updateText('footer_phone', v)}
                        />
                        <InputGroup
                          label="Email Address"
                          id="footer_email"
                          value={texts.footer_email}
                          onChange={(v) => updateText('footer_email', v)}
                        />
                        <InputGroup
                          label="Open Hours"
                          id="footer_hours"
                          value={texts.footer_hours}
                          onChange={(v) => updateText('footer_hours', v)}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: WINDOW CUTS & SHAPES */}
              {activeTab === 'cuts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#52525b', margin: 0 }}>
                    Customize the architectural geometric cut designs and polygon frame angles for image windows across the site:
                  </p>

                  <CutShapeSelector
                    title="Moments Section: Fleece Sweater Card"
                    currentValue={cutShapes.momentsCardLeft}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('momentsCardLeft', val)}
                  />

                  <CutShapeSelector
                    title="Moments Section: Small Card ($120)"
                    currentValue={cutShapes.momentsCardSmall}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('momentsCardSmall', val)}
                  />

                  <CutShapeSelector
                    title="Moments Section: Varsity Jacket (45%) Card"
                    currentValue={cutShapes.momentsCardVarsity}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('momentsCardVarsity', val)}
                  />

                  <CutShapeSelector
                    title="Category Showcase: Center Model Card"
                    currentValue={cutShapes.categoryShowcaseCard}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('categoryShowcaseCard', val)}
                  />

                  <CutShapeSelector
                    title="Jacket Momento: Product Carousel Cards"
                    currentValue={cutShapes.momentoCards}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('momentoCards', val)}
                  />

                  <CutShapeSelector
                    title="Collections Accordion: Left Minimalist Model"
                    currentValue={cutShapes.accordionCard}
                    options={shapeOptions}
                    onChange={(val) => updateCutShape('accordionCard', val)}
                  />
                </div>
              )}
              {/* TAB 4: PRODUCT CATALOG & PRICES */}
              {activeTab === 'products' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {/* Category Products Editor */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#000000', margin: 0 }}>
                        Category Catalog Products ({catalogProducts.length})
                      </h4>
                    </div>

                    {/* Category Filter Pills inside Admin */}
                    <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {['All', 'Shirt', 'Jacket', 'Jeans', 'Outer', 'Shoes'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setProductCatalogCat(cat)}
                          style={{
                            padding: '0.3rem 0.65rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: productCatalogCat === cat ? 700 : 500,
                            backgroundColor: productCatalogCat === cat ? '#000000' : '#f4f4f5',
                            color: productCatalogCat === cat ? '#ffffff' : '#52525b',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {catalogProducts
                        .filter(
                          (p) =>
                            productCatalogCat === 'All' ||
                            (p.category && p.category.toLowerCase() === productCatalogCat.toLowerCase())
                        )
                        .map((prod) => (
                          <div
                            key={prod.id}
                            style={{
                              padding: '0.9rem',
                              borderRadius: '8px',
                              backgroundColor: '#f8f8fa',
                              border: '1px solid #e4e4e7',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.6rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                              <img
                                src={prod.image}
                                alt=""
                                style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                              />
                              <div style={{ flex: 1 }}>
                                <input
                                  type="text"
                                  value={prod.title}
                                  onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setCatalogProducts((prev) =>
                                      prev.map((p) => (p.id === prod.id ? { ...p, title: newTitle } : p))
                                    );
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.35rem 0.5rem',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    border: '1px solid #d4d4d8',
                                    borderRadius: '4px',
                                  }}
                                />
                              </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                              <div>
                                <label style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginBottom: '0.15rem' }}>
                                  Category
                                </label>
                                <input
                                  type="text"
                                  value={prod.category}
                                  onChange={(e) => {
                                    const newCat = e.target.value;
                                    setCatalogProducts((prev) =>
                                      prev.map((p) => (p.id === prod.id ? { ...p, category: newCat } : p))
                                    );
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.3rem 0.45rem',
                                    fontSize: '0.8rem',
                                    border: '1px solid #d4d4d8',
                                    borderRadius: '4px',
                                  }}
                                />
                              </div>

                              <div>
                                <label style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginBottom: '0.15rem' }}>
                                  Price ($)
                                </label>
                                <input
                                  type="number"
                                  value={prod.price}
                                  onChange={(e) => {
                                    const newPrice = Number(e.target.value);
                                    setCatalogProducts((prev) =>
                                      prev.map((p) => (p.id === prod.id ? { ...p, price: newPrice } : p))
                                    );
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.3rem 0.45rem',
                                    fontSize: '0.8rem',
                                    border: '1px solid #d4d4d8',
                                    borderRadius: '4px',
                                  }}
                                />
                              </div>

                              <div>
                                <label style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginBottom: '0.15rem' }}>
                                  Badge
                                </label>
                                <input
                                  type="text"
                                  value={prod.badge || ''}
                                  onChange={(e) => {
                                    const newBadge = e.target.value;
                                    setCatalogProducts((prev) =>
                                      prev.map((p) => (p.id === prod.id ? { ...p, badge: newBadge } : p))
                                    );
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.3rem 0.45rem',
                                    fontSize: '0.8rem',
                                    border: '1px solid #d4d4d8',
                                    borderRadius: '4px',
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div style={{ height: '1px', backgroundColor: '#e4e4e7' }} />

                  {/* Jacket Momento Carousel Section */}
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#000000', marginBottom: '0.75rem' }}>
                      Jacket Momento Carousel Products
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {momentoProducts.map((prod) => (
                        <div
                          key={prod.id}
                          style={{
                            padding: '0.9rem',
                            borderRadius: '8px',
                            backgroundColor: '#f8f8fa',
                            border: '1px solid #e4e4e7',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <img
                              src={prod.image}
                              alt=""
                              style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                value={prod.title}
                                onChange={(e) => {
                                  const newTitle = e.target.value;
                                  setMomentoProducts((prev) =>
                                    prev.map((p) => (p.id === prod.id ? { ...p, title: newTitle } : p))
                                  );
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.35rem 0.5rem',
                                  fontSize: '0.82rem',
                                  fontWeight: 700,
                                  border: '1px solid #d4d4d8',
                                  borderRadius: '4px',
                                }}
                              />
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div>
                              <label style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginBottom: '0.15rem' }}>
                                Price ($)
                              </label>
                              <input
                                type="number"
                                value={prod.price}
                                onChange={(e) => {
                                  const newPrice = Number(e.target.value);
                                  setMomentoProducts((prev) =>
                                    prev.map((p) => (p.id === prod.id ? { ...p, price: newPrice } : p))
                                  );
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.3rem 0.45rem',
                                  fontSize: '0.8rem',
                                  border: '1px solid #d4d4d8',
                                  borderRadius: '4px',
                                }}
                              />
                            </div>

                            <div>
                              <label style={{ fontSize: '0.7rem', color: '#71717a', display: 'block', marginBottom: '0.15rem' }}>
                                Tag / Badge
                              </label>
                              <input
                                type="text"
                                value={prod.tag}
                                onChange={(e) => {
                                  const newTag = e.target.value;
                                  setMomentoProducts((prev) =>
                                    prev.map((p) => (p.id === prod.id ? { ...p, tag: newTag } : p))
                                  );
                                }}
                                style={{
                                  width: '100%',
                                  padding: '0.3rem 0.45rem',
                                  fontSize: '0.8rem',
                                  border: '1px solid #d4d4d8',
                                  borderRadius: '4px',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BACKUP & DATA */}
              {activeTab === 'backup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Export / Download */}
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8f8fa',
                      border: '1px solid #e4e4e7',
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', marginBottom: '0.3rem' }}>
                      Export Site Configuration
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#71717a', marginBottom: '1rem' }}>
                      Download all your custom text, drag coordinates, cut designs and products as a JSON backup.
                    </p>
                    <button
                      onClick={exportConfigJson}
                      style={{
                        padding: '0.6rem 1.1rem',
                        backgroundColor: '#18181b',
                        color: '#ffffff',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Download size={14} /> Export JSON File
                    </button>
                  </div>

                  {/* Import / Restore */}
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8f8fa',
                      border: '1px solid #e4e4e7',
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#000000', marginBottom: '0.3rem' }}>
                      Import Configuration JSON
                    </h4>
                    <textarea
                      placeholder="Paste JSON configuration content here..."
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        borderRadius: '6px',
                        border: '1px solid #d4d4d8',
                        marginBottom: '0.75rem',
                      }}
                    />
                    <button
                      onClick={() => {
                        if (importJsonText.trim()) {
                          importConfigJson(importJsonText);
                          setImportJsonText('');
                        }
                      }}
                      style={{
                        padding: '0.6rem 1.1rem',
                        backgroundColor: 'var(--accent-orange)',
                        color: '#ffffff',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Upload size={14} /> Apply Imported Configuration
                    </button>
                  </div>

                  {/* Factory Reset */}
                  <div
                    style={{
                      padding: '1.25rem',
                      borderRadius: '8px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.3rem' }}>
                      Factory Reset
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#b91c1c', marginBottom: '1rem' }}>
                      Reset all texts, drag positions, and cuts back to initial pristine design settings.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to reset all modifications to default?')) {
                          resetAllContent();
                        }
                      }}
                      style={{
                        padding: '0.6rem 1.1rem',
                        backgroundColor: '#dc2626',
                        color: '#ffffff',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Reset Everything to Default
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InputGroup({ label, id, value, onChange, multiline = false }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#3f3f46',
          marginBottom: '0.35rem',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '0.85rem',
            borderRadius: '6px',
            border: '1px solid #d4d4d8',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '0.85rem',
            borderRadius: '6px',
            border: '1px solid #d4d4d8',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      )}
    </div>
  );
}

function CutShapeSelector({ title, currentValue, options, onChange }) {
  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f8f8fa',
        border: '1px solid #e4e4e7',
      }}
    >
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#000000', marginBottom: '0.6rem' }}>
        {title}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
        {options.map((opt) => {
          const isSelected = currentValue === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onChange(opt.id)}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: isSelected ? '2px solid var(--accent-orange)' : '1px solid #d4d4d8',
                backgroundColor: isSelected ? '#ffffff' : '#f4f4f5',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: isSelected ? 700 : 500,
                color: isSelected ? 'var(--accent-orange)' : '#52525b',
                transition: 'all 0.15s ease',
              }}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
