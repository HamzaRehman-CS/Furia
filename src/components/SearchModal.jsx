import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { MOMENTO_PRODUCTS, CATEGORIES_DATA } from '../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return MOMENTO_PRODUCTS;
    return MOMENTO_PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-hover)',
          animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            SEARCH FURIA ARCHIVE
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '2px solid var(--text-primary)',
            borderRadius: 'var(--radius-full)',
            padding: '0.85rem 1.4rem',
            marginBottom: '2rem',
          }}
        >
          <Search size={20} color="var(--text-primary)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jackets, shirts, hoodies, accessories..."
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-primary)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Categories Tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', alignSelf: 'center', marginRight: '0.5rem' }}>
            Popular:
          </span>
          {['Puffer', 'Jacket', 'Tee', 'Drop 01', 'Windbreaker'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-medium)',
                background: '#f7f7f9',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#fafafc',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f4')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fafafc')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    {p.category} • ${p.price}.00
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="var(--accent-orange)" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
