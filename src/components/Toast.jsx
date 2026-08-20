import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 150,
        backgroundColor: '#0e0e11',
        color: '#ffffff',
        padding: '1rem 1.4rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '380px',
      }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-orange)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ShoppingBag size={18} color="#ffffff" />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>
          {toast.title || 'Action Successful'}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginTop: '0.15rem' }}>
          {toast.message}
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          cursor: 'pointer',
          padding: '0.25rem',
        }}
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
