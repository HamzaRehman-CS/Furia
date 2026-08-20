import React, { useState } from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);

  const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];
  const colors = product.colors || ['#111111', '#a8d5ba', '#ff5500'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-hover)',
          display: 'grid',
          gridTemplateColumns: '1fr',
          position: 'relative',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="quickview-modal-layout"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <X size={18} />
        </button>

        {/* Left: Product Image */}
        <div
          style={{
            backgroundColor: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', height: '100%', maxHeight: '520px', objectFit: 'cover' }}
          />
          {product.badge && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'var(--text-primary)',
                color: '#ffffff',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {product.badge}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                {product.category ? product.category.toUpperCase() : 'EDITORIAL'}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                COLLECTION 2026
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.85rem',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                lineHeight: '1.15',
              }}
            >
              {product.title}
            </h3>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#ff7a00" color="#ff7a00" />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>5.0 (49 Reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                }}
              >
                ${product.price}.00
              </span>
              {product.oldPrice && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through',
                  }}
                >
                  ${product.oldPrice}.00
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
              }}
            >
              {product.description || 'Crafted with intention using high-performance technical textiles, architectural tailoring, and water-repellent Japanese hardware.'}
            </p>

            {/* Size Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>SELECT SIZE</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: selectedSize === s ? 'var(--text-primary)' : 'var(--border-medium)',
                      backgroundColor: selectedSize === s ? 'var(--text-primary)' : '#ffffff',
                      color: selectedSize === s ? '#ffffff' : 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                onAddToCart({ ...product, size: selectedSize });
                onClose();
              }}
              className="btn-pill btn-orange"
              style={{ flex: 1, padding: '0.85rem', fontSize: '0.85rem' }}
            >
              <ShoppingBag size={16} />
              ADD TO BAG
            </button>

            <button
              onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                backgroundColor: isWishlisted ? 'var(--accent-orange-light)' : '#ffffff',
                color: isWishlisted ? 'var(--accent-orange)' : 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={18} fill={isWishlisted ? 'var(--accent-orange)' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (min-width: 768px) {
          .quickview-modal-layout {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
