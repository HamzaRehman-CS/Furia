import React, { useState, useRef, useEffect } from 'react';
import { Move, Type, RotateCcw, Plus, Minus, Check, Edit3, Palette } from 'lucide-react';
import { useEditor } from '../context/EditorContext';

export default function DraggableTextBlock({
  id,
  as = 'div',
  defaultText = '',
  style = {},
  className = '',
  multiline = false,
  children,
  ...props
}) {
  const {
    texts,
    updateText,
    positions,
    updatePosition,
    resetPosition,
    isEditMode,
    selectedBlockId,
    setSelectedBlockId,
  } = useEditor();

  const elementRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const elementStartPosRef = useRef({ x: 0, y: 0 });

  const [isEditingInline, setIsEditingInline] = useState(false);
  const [inlineValue, setInlineValue] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const textContent = texts[id] !== undefined ? texts[id] : defaultText;
  const currentPos = positions[id] || { x: 0, y: 0, fontSizeScale: 1, customColor: '' };
  const isSelected = isEditMode && selectedBlockId === id;

  useEffect(() => {
    setInlineValue(textContent);
  }, [textContent]);

  // Pointer drag logic for smooth Canva-like repositioning
  const handlePointerDown = (e) => {
    if (!isEditMode) return;
    if (isEditingInline) return;
    if (e.button !== 0) return; // Only primary mouse button

    // If clicking on toolbar or buttons, do not initiate drag
    if (e.target.closest('.canva-toolbar')) return;

    setSelectedBlockId(id);
    isDraggingRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    elementStartPosRef.current = { x: currentPos.x || 0, y: currentPos.y || 0 };

    e.currentTarget.setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartPosRef.current.x;
    const deltaY = e.clientY - dragStartPosRef.current.y;

    const newX = Math.round(elementStartPosRef.current.x + deltaX);
    const newY = Math.round(elementStartPosRef.current.y + deltaY);

    updatePosition(id, { x: newX, y: newY });
    e.stopPropagation();
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      e.stopPropagation();
    }
  };

  const handleInlineSave = () => {
    updateText(id, inlineValue);
    setIsEditingInline(false);
  };

  const handleFontSizeChange = (delta) => {
    const currentScale = currentPos.fontSizeScale || 1;
    const newScale = Math.max(0.6, Math.min(2.5, +(currentScale + delta).toFixed(2)));
    updatePosition(id, { fontSizeScale: newScale });
  };

  const handleColorChange = (color) => {
    updatePosition(id, { customColor: color });
    setShowColorPicker(false);
  };

  const colorPresets = ['#000000', '#ff5500', '#ffffff', '#252528', '#888892', '#2563eb', '#16a34a'];

  // Combined styles
  const combinedStyle = {
    ...style,
    transform: `translate3d(${currentPos.x || 0}px, ${currentPos.y || 0}px, 0)`,
    color: currentPos.customColor || style.color,
    fontSize: currentPos.fontSizeScale && currentPos.fontSizeScale !== 1
      ? `calc(${style.fontSize || '1rem'} * ${currentPos.fontSizeScale})`
      : style.fontSize,
    transition: isDraggingRef.current ? 'none' : 'transform 0.15s ease-out, box-shadow 0.2s ease',
    position: 'relative',
    cursor: isEditMode ? 'move' : (style.cursor || 'inherit'),
    userSelect: isEditMode && !isEditingInline ? 'none' : 'auto',
    touchAction: isEditMode ? 'none' : 'auto',
  };

  // Render text with line breaks
  const renderFormattedText = () => {
    if (children) return children;
    if (typeof textContent !== 'string') return textContent;
    return textContent.split('\n').map((line, idx, arr) => (
      <React.Fragment key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const Component = as;

  return (
    <Component
      ref={elementRef}
      id={`editable-${id}`}
      className={`${className} ${isEditMode ? 'canva-editable-block' : ''} ${isSelected ? 'canva-selected' : ''}`}
      style={combinedStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          setSelectedBlockId(id);
        }
      }}
      onDoubleClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          setIsEditingInline(true);
        }
      }}
      {...props}
    >
      {/* Inline Editor overlay */}
      {isEditingInline ? (
        <div
          className="inline-edit-overlay"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.98)',
            padding: '0.5rem',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: 1000,
            border: '2px solid var(--accent-orange)',
          }}
        >
          {multiline || (typeof textContent === 'string' && textContent.includes('\n')) ? (
            <textarea
              autoFocus
              value={inlineValue}
              onChange={(e) => setInlineValue(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                minWidth: '220px',
                padding: '0.5rem',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
                resize: 'both',
              }}
            />
          ) : (
            <input
              type="text"
              autoFocus
              value={inlineValue}
              onChange={(e) => setInlineValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleInlineSave();
                if (e.key === 'Escape') setIsEditingInline(false);
              }}
              style={{
                width: '100%',
                minWidth: '200px',
                padding: '0.4rem 0.6rem',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                outline: 'none',
              }}
            />
          )}

          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsEditingInline(false)}
              style={{
                padding: '0.3rem 0.6rem',
                fontSize: '0.75rem',
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleInlineSave}
              style={{
                padding: '0.3rem 0.75rem',
                fontSize: '0.75rem',
                background: 'var(--accent-orange)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
              }}
            >
              <Check size={13} /> Save Text
            </button>
          </div>
        </div>
      ) : (
        renderFormattedText()
      )}

      {/* Floating Canva Mini Toolbar when selected in Edit Mode */}
      {isSelected && !isEditingInline && (
        <div
          className="canva-toolbar"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: '#18181b',
            color: '#ffffff',
            padding: '0.35rem 0.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 999,
            whiteSpace: 'nowrap',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            pointerEvents: 'auto',
          }}
        >
          {/* Move handle icon */}
          <div
            title="Drag anywhere to reposition"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.2rem 0.5rem',
              background: 'rgba(255, 85, 0, 0.2)',
              color: 'var(--accent-orange)',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.7rem',
              cursor: 'grab',
            }}
          >
            <Move size={12} />
            <span>
              {currentPos.x || 0}, {currentPos.y || 0}
            </span>
          </div>

          <div style={{ width: '1px', height: '14px', background: '#3f3f46' }} />

          {/* Edit text button */}
          <button
            onClick={() => setIsEditingInline(true)}
            title="Edit Text"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem 0.4rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Edit3 size={13} />
          </button>

          {/* Font Size Adjusters */}
          <button
            onClick={() => handleFontSizeChange(-0.1)}
            title="Decrease Font Size"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem 0.35rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Minus size={13} />
          </button>

          <span style={{ fontSize: '0.7rem', fontWeight: 600, minWidth: '28px', textAlign: 'center', color: '#a1a1aa' }}>
            {Math.round((currentPos.fontSizeScale || 1) * 100)}%
          </span>

          <button
            onClick={() => handleFontSizeChange(0.1)}
            title="Increase Font Size"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem 0.35rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Plus size={13} />
          </button>

          <div style={{ width: '1px', height: '14px', background: '#3f3f46' }} />

          {/* Color Preset Palette Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Change Text Color"
              style={{
                background: currentPos.customColor || 'transparent',
                border: '1px solid #52525b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem 0.4rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <Palette size={13} />
            </button>

            {showColorPicker && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: '0',
                  display: 'flex',
                  gap: '0.3rem',
                  background: '#27272a',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  zIndex: 1001,
                }}
              >
                {colorPresets.map((c) => (
                  <div
                    key={c}
                    onClick={() => handleColorChange(c)}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={{ width: '1px', height: '14px', background: '#3f3f46' }} />

          {/* Reset position button */}
          <button
            onClick={() => resetPosition(id)}
            title="Reset to Original Layout Position"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem 0.4rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      )}
    </Component>
  );
}
