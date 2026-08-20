import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

import { useEditor } from '../context/EditorContext';

export default function Navbar({ onOpenSearch, onOpenCart, cartCount, wishlistCount, onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsAuthenticated, setIsAdminPortalOpen } = useEditor();

  const handleLogoClick = (e) => {
    e.preventDefault();
    const pass = window.prompt("Enter Admin Password:");
    if (pass === "12345") {
      setIsAuthenticated(true);
      setIsAdminPortalOpen(true);
    } else if (pass !== null) {
      alert("Incorrect password.");
    }
  };

  return (
    <>
      <header
        style={{
          width: '100%',
          backgroundColor: '#ebebed',
          borderBottom: '1px dashed rgba(0, 0, 0, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 60,
        }}
      >
        <div
          className="site-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px',
            position: 'relative',
          }}
        >
          {/* Far Left: Menu Pill Button */}
          <div>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.25rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#18181b',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000000';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e4e4e7';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Menu size={16} strokeWidth={2.5} />
              MENU
            </button>
          </div>

          {/* Center: FURIA Logo */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <a
              href="#"
              onClick={handleLogoClick}
              title="Click to access Admin Portal"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                letterSpacing: '0.04em',
                color: '#18181b',
                textDecoration: 'none',
                lineHeight: 1,
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              FURIA
            </a>
          </div>

          {/* Far Right: 3 Round Icon Buttons (Search, Wishlist, Bag) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Search size={16} color="#000000" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onScrollToSection('momento')}
              aria-label="Wishlist"
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Heart size={16} color="#000000" />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: 'var(--accent-orange)',
                    color: '#fff',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <ShoppingBag size={16} color="#000000" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: '#000000',
                    color: '#fff',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Slide-down Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#ebebed',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '1.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {[
              { name: 'Collections 2026', id: 'moments' },
              { name: 'Categories', id: 'categories' },
              { name: 'Jacket Momento', id: 'momento' },
              { name: 'Customer Stories', id: 'reviews' },
              { name: 'Contact & Studio', id: 'footer' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  onScrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#000000',
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
