import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-hover)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div
          style={{
            padding: '1.75rem 2rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--accent-orange)" />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Shopping Bag
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
              }}
            >
              ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-medium)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--text-muted)',
                gap: '1rem',
              }}
            >
              <ShoppingBag size={48} strokeWidth={1} />
              <p style={{ fontSize: '1rem', fontWeight: 500 }}>Your bag is currently empty.</p>
              <button onClick={onClose} className="btn-pill btn-pill-dark" style={{ marginTop: '0.5rem' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                {/* Product Thumbnail */}
                <div
                  style={{
                    width: '84px',
                    height: '96px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f7',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Product Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: '1.3',
                        }}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      <span>Size: <strong>{item.size || 'M'}</strong></span>
                      <span>Color: <strong>Black/Arc</strong></span>
                    </div>
                  </div>

                  {/* Price & Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}
                    >
                      ${item.price * item.quantity}.00
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.2rem 0.5rem',
                      }}
                    >
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer / Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.75rem 2rem',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: '#fafafc',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>${subtotal}.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {shipping === 0 ? 'FREE' : `$${shipping}.00`}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <span>Total</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>${total}.00</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="btn-pill btn-orange"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              PROCEED TO CHECKOUT
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
