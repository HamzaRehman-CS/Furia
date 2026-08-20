import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CATEGORIES_DATA as INITIAL_CATEGORIES,
  MOMENTO_PRODUCTS as INITIAL_MOMENTO,
  ALL_CATALOG_PRODUCTS as INITIAL_CATALOG,
  TESTIMONIALS_DATA as INITIAL_TESTIMONIALS,
  ACCORDION_COLLECTIONS as INITIAL_COLLECTIONS
} from '../data/products';

const STORAGE_KEY = 'furia_site_editor_config_v4';

// Helper to sanitize any legacy 'Velour' text from cached states
const sanitizeBrandText = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const cleaned = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      cleaned[k] = v
        .replace(/VELOUR/g, 'FURIA')
        .replace(/Velour/g, 'Furia')
        .replace(/velour/g, 'furia');
    } else {
      cleaned[k] = v;
    }
  }
  return cleaned;
};

export const DEFAULT_TEXTS = {
  // Hero Section
  hero_top_label: '//STYLED FOR LIFE.',
  hero_title_left: 'where\n- style',
  hero_tag: '//FASHION',
  hero_desc: 'Explore curated collections:\nexclusive drops and everyday\nessentials all thoughtfully\ndesigned in one stylish\nshopping destination.',
  hero_collection_tag: '/ New\nCollection 2026',
  hero_title_right: 'lives\n- now',
  hero_stat_num: '280K',
  hero_stat_label: 'PEOPLE WE INSPIRE',

  // Moments Section
  moments_title: 'All - about\nmoments ©26',
  moments_btn_text: 'LEARN MORE',
  moments_caption_left: '©International - going distance 2026',
  moments_manifesto: 'Where Elegance Meets\nSustainability Luxury\nMade Accessible',
  moments_card1_price: '($120)',
  moments_card2_badge: '(45%)',
  moments_caption_right: '©International - just do it 2026',

  // Categories Section
  categories_intro: "Every piece carries rhythm beyond clothing; it's motion and meaning where street energy meets",
  categories_btn: 'SEE PRODUCT',
  categories_tag: '[CATEGORIES]',

  // Catalog Section
  catalog_tag: '// CURATED COLLECTION 2026',
  catalog_title: 'Explore By Category',
  catalog_desc: 'Filter precision-engineered garments by silhouette, Japanese selvedge denim, insulated technical outer layers, and footwear.',

  // Momento Carousel
  momento_title: '©furia -\njacket momento',
  momento_year: '2026',
  momento_tag: '[Other]',

  // Testimonials
  testimonial_tag: '[Testimonial]',
  testimonial_quote: 'Everything is absolutely spot on. From the heavyweight drape of the cotton to the weatherproof shell on the outerwear, every garment feels bespoke. It is rare to find modern luxury streetwear with this level of tailoring discipline.',
  testimonial_author: '[Emma Williams]',
  testimonial_role: 'Fashion Stylist & Visual Consultant, London',
  testimonial_bottom_bar: 'See What Our Customers Are Saying',

  // Accordion
  accordion_intro: 'From enduring classics to daring statement pieces, our collections are crafted with intention.',
  accordion_tag: 'Being Part Of Our journey',

  // Footer
  footer_tag: 'CONTACT US',
  footer_title_1: 'Fast Selling Urban',
  footer_title_2: '___Fashion Collection',
  footer_address: '5567 Washington Ave, America, 32289',
  footer_phone: '+016 76234396',
  footer_email: 'hello@orbix.studio',
  footer_hours: '08:00 - 11:00 pm',
  footer_copyright: '© 2026 Furia. All Rights Reserved.',
};

export const DEFAULT_CUT_SHAPES = {
  momentsCardLeft: 'chamfer', // fleece sweater
  momentsCardSmall: 'angled-top', // ($120) card
  momentsCardVarsity: 'chamfer-deep', // varsity (45%) card
  categoryShowcaseCard: 'chamfer-diagonal', // categories model
  accordionCard: 'chamfer-subtle', // collections left model
  momentoCards: 'chamfer', // jacket carousel cards
};

const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  // Load saved configuration or fall back to defaults
  const [texts, setTexts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_texts`);
      if (saved) {
        return sanitizeBrandText({ ...DEFAULT_TEXTS, ...JSON.parse(saved) });
      }
      return DEFAULT_TEXTS;
    } catch (e) {
      return DEFAULT_TEXTS;
    }
  });

  const [positions, setPositions] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_positions`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [cutShapes, setCutShapes] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_cut_shapes`);
      return saved ? { ...DEFAULT_CUT_SHAPES, ...JSON.parse(saved) } : DEFAULT_CUT_SHAPES;
    } catch (e) {
      return DEFAULT_CUT_SHAPES;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  });

  const [momentoProducts, setMomentoProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_momento_products`);
      return saved ? JSON.parse(saved) : INITIAL_MOMENTO;
    } catch (e) {
      return INITIAL_MOMENTO;
    }
  });

  const [catalogProducts, setCatalogProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_catalog_products`);
      return saved ? JSON.parse(saved) : INITIAL_CATALOG;
    } catch (e) {
      return INITIAL_CATALOG;
    }
  });

  const [activeCatalogCategory, setActiveCatalogCategory] = useState('All');

  // Admin and Live Canvas state - always unlocked and available
  const [isEditMode, setIsEditMode] = useState(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_edit_mode`) === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [showGridGuides, setShowGridGuides] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_texts`, JSON.stringify(texts));
    } catch (e) {
      console.error('Failed to save texts to localStorage', e);
    }
  }, [texts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_positions`, JSON.stringify(positions));
    } catch (e) {
      console.error('Failed to save positions to localStorage', e);
    }
  }, [positions]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cut_shapes`, JSON.stringify(cutShapes));
    } catch (e) {
      console.error('Failed to save cut shapes to localStorage', e);
    }
  }, [cutShapes]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_momento_products`, JSON.stringify(momentoProducts));
    } catch (e) {
      console.error('Failed to save momento products', e);
    }
  }, [momentoProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_catalog_products`, JSON.stringify(catalogProducts));
    } catch (e) {
      console.error('Failed to save catalog products', e);
    }
  }, [catalogProducts]);

  // Actions
  const updateText = (id, newText) => {
    setTexts((prev) => ({ ...prev, [id]: newText }));
  };

  const updatePosition = (id, offsetUpdates) => {
    setPositions((prev) => {
      const current = prev[id] || { x: 0, y: 0, fontSizeScale: 1, customColor: '' };
      return {
        ...prev,
        [id]: {
          ...current,
          ...offsetUpdates,
        },
      };
    });
    showSaveStatus();
  };

  const resetPosition = (id) => {
    setPositions((prev) => {
      const newPos = { ...prev };
      delete newPos[id];
      return newPos;
    });
    showSaveStatus();
  };

  const resetAllPositions = () => {
    setPositions({});
    showSaveStatus();
  };

  const updateCutShape = (id, shapeId) => {
    setCutShapes((prev) => ({ ...prev, [id]: shapeId }));
    showSaveStatus();
  };

  const resetAllContent = () => {
    setTexts(DEFAULT_TEXTS);
    setPositions({});
    setCutShapes(DEFAULT_CUT_SHAPES);
    setCategories(INITIAL_CATEGORIES);
    setMomentoProducts(INITIAL_MOMENTO);
    setCatalogProducts(INITIAL_CATALOG);
    localStorage.removeItem(`${STORAGE_KEY}_texts`);
    localStorage.removeItem(`${STORAGE_KEY}_positions`);
    localStorage.removeItem(`${STORAGE_KEY}_cuts`);
    setSaveStatus('All content & layouts reset to original design.');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const showSaveStatus = () => {
    setSaveStatus('Changes saved automatically.');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const exportConfigJson = () => {
    const config = {
      texts,
      positions,
      cutShapes,
      categories,
      momentoProducts,
      catalogProducts,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `furia-site-configuration-${Date.now()}.json`;
    a.click();
  };

  const importConfigJson = (jsonString) => {
    try {
      const config = JSON.parse(jsonString);
      if (config.texts) setTexts(config.texts);
      if (config.positions) setPositions(config.positions);
      if (config.cutShapes) setCutShapes(config.cutShapes);
      if (config.categories) setCategories(config.categories);
      if (config.momentoProducts) setMomentoProducts(config.momentoProducts);
      if (config.catalogProducts) setCatalogProducts(config.catalogProducts);
      setSaveStatus('Configuration imported successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
      return true;
    } catch (err) {
      alert('Invalid JSON configuration file.');
      return false;
    }
  };

  return (
    <EditorContext.Provider
      value={{
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
        activeCatalogCategory,
        setActiveCatalogCategory,
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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
