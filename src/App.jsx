import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandMarquee from './components/BrandMarquee';
import MomentsSection from './components/MomentsSection';
import CategoryShowcase from './components/CategoryShowcase';
import RibbonMarquee from './components/RibbonMarquee';
import TestimonialSection from './components/TestimonialSection';
import JacketMomentoCarousel from './components/JacketMomentoCarousel';
import CollectionsAccordion from './components/CollectionsAccordion';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import AdminPortal from './components/AdminPortal';
import { EditorProvider } from './context/EditorContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { MOMENTO_PRODUCTS, ASSETS } from './data/products';

export default function App() {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
}

function AppContent() {
  // Activate scroll-driven blur reveal animation system
  useScrollReveal();

  const [cart, setCart] = useState([
    {
      id: 'prod-2',
      title: 'Synthetix Mint Shell 02',
      price: 280,
      image: ASSETS.mintJacket,
      quantity: 1,
      size: 'M',
    },
  ]);

  const [wishlist, setWishlist] = useState(['prod-1']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id && item.size === (product.size || 'M'));
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === (product.size || 'M')
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, size: product.size || 'M' }];
    });

    showToast('Added to Bag', `${product.title} (Size ${product.size || 'M'}) added.`);
  };

  const handleUpdateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    showToast('Item Removed', 'Item removed from your shopping bag.');
  };

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Wishlist Updated', 'Item removed from your saved list.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to Wishlist', 'Item saved to your favorites.');
        return [...prev, id];
      }
    });
  };

  const handleCheckout = () => {
    showToast('Order Initialized', 'Redirecting to secure express checkout...');
    setTimeout(() => {
      setIsCartOpen(false);
    }, 1500);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f6f6f7', color: 'var(--text-primary)' }}>
      {/* 1. Top Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartTotalItems}
        wishlistCount={wishlist.length}
        onScrollToSection={scrollToSection}
      />

      {/* 2. Hero Section (Screenshot 1 exact design) */}
      <Hero
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
        onScrollToSection={scrollToSection}
      />

      {/* 3. Obsidian Brand Partner Marquee */}
      <BrandMarquee />

      {/* 4. Section: All - about moments ©26 */}
      <MomentsSection
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 5. Section: Category Showcase ([01] Shirt ... [05] Shoes) */}
      <CategoryShowcase
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Scrolling Ribbon Banner */}
      <RibbonMarquee />

      {/* 7. Section: Testimonials (01 / 8 [Testimonial]) */}
      <TestimonialSection />

      {/* 8. Section: ©furia - jacket momento 2026 Product Carousel (Screenshot 2 chamfer cards) */}
      <JacketMomentoCarousel
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 9. Second Scrolling Ribbon Banner */}
      <RibbonMarquee
        reverse={true}
        text={[
          'CRAFTED STORIES',
          'PREMIUM MATERIALS',
          'PREMIUM FABRICS',
          'TIMELESS CUTS',
          'URBAN INFLUENCE',
          'SMART STYLING',
          'COLLECTION 2026',
        ]}
      />

      {/* 10. Section: Collections & Storytelling Accordion */}
      <CollectionsAccordion
        onQuickView={setQuickViewProduct}
        onAddToCart={handleAddToCart}
      />

      {/* 11. Luxury Dark Footer */}
      <Footer
        onSubscribeToast={(email) =>
          showToast('Subscribed!', `Thank you for joining Furia VIP list (${email}).`)
        }
      />

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct && wishlist.includes(quickViewProduct.id)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setQuickViewProduct(p);
          setIsSearchOpen(false);
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Admin Portal & Canva Mode Controls */}
      <AdminPortal />
    </div>
  );
}
