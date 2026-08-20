import heroAsianModelImg from '../assets/hero_asian_model_exact.jpg';
import heroFashionVideo from '../assets/hero_fashion_model.mp4';
import heroBgImage from '../assets/hero_bg_wide.jpg';
import sweaterImg from '../assets/moments_tan_jacket_exact.jpg';
import bomberDetailImg from '../assets/moments_dagger_jacket_exact.jpg';
import reviewerEmmaImg from '../assets/reviewer_emma_exact.jpg';
import tracksuitImg from '../assets/jacket_category_model_exact.jpg';
import mintJacketImg from '../assets/jacket_card2_1787140785018.jpg';
import orangePufferImg from '../assets/jacket_card1_1787140987543.jpg';
import charcoalTeeImg from '../assets/jacket_card3_1787141190754.jpg';
import colorblockJacketImg from '../assets/jacket_card4_1787141403914.jpg';
import wireframeModelImg from '../assets/model_wireframe_1787141626198.jpg';
import editorialCardImg from '../assets/model_editorial_card_1787141838760.jpg';
import statementThumbImg from '../assets/statement_thumb_1787142062729.jpg';

export const ASSETS = {
  heroModel: heroAsianModelImg,
  heroVideo: heroFashionVideo,
  heroBg: heroBgImage,
  sweater: sweaterImg,
  bomberDetail: bomberDetailImg,
  reviewerEmma: reviewerEmmaImg,
  tracksuit: tracksuitImg,
  mintJacket: mintJacketImg,
  orangePuffer: orangePufferImg,
  charcoalTee: charcoalTeeImg,
  colorblockJacket: colorblockJacketImg,
  wireframeModel: wireframeModelImg,
  editorialCard: editorialCardImg,
  statementThumb: statementThumbImg,
};

export const CATEGORIES_DATA = [
  { id: '01', name: 'Shirt', count: 174, image: ASSETS.charcoalTee, desc: 'Ultra-heavyweight Japanese cotton boxy t-shirts & structured overshirts.' },
  { id: '02', name: 'Jacket', count: 361, image: ASSETS.tracksuit, desc: 'Technical shell windbreakers, modular parkas, and tactical layers.' },
  { id: '03', name: 'Jeans', count: 368, image: ASSETS.sweater, desc: 'Raw Japanese selvedge and relaxed-fit utility washed denim.' },
  { id: '04', name: 'Outer', count: 117, image: ASSETS.orangePuffer, desc: 'Heavy insulated thermal puffers and waterproof storm coats.' },
  { id: '05', name: 'Shoes', count: 78, image: ASSETS.heroModel, desc: 'Chunky architectural runners and utilitarian tactical boots.' },
];

export const MOMENTO_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Voltaic Arc Shell Puffer',
    category: 'Outer',
    price: 340,
    oldPrice: 420,
    tag: 'Drop 01',
    image: ASSETS.orangePuffer,
    badge: 'Limited',
    colors: ['#ff5500', '#111111', '#4a5568'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'High-density insulated puffer jacket engineered for harsh climates with dual-tone industrial contrast panels and technical nylon webbing.'
  },
  {
    id: 'prod-2',
    title: 'Synthetix Mint Shell 02',
    category: 'Jacket',
    price: 280,
    oldPrice: 320,
    tag: 'Essential',
    image: ASSETS.mintJacket,
    badge: 'Popular',
    colors: ['#a8d5ba', '#2d3748', '#ffffff'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Pastel mint weatherproof technical shell jacket with waterproof taped seams, tactical utility cargo pockets, and modular storm hood.'
  },
  {
    id: 'prod-3',
    title: 'Heavyweight Boxy Tee',
    category: 'Shirt',
    price: 95,
    tag: '[Wear the Moment]',
    image: ASSETS.charcoalTee,
    badge: 'Core',
    colors: ['#374151', '#111827', '#f3f4f6'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: '320GSM custom combed organic cotton t-shirt with dropped shoulder silhouette, raw hem accents, and durable vintage mineral wash.'
  },
  {
    id: 'prod-4',
    title: 'Aethel Sport Windbreaker',
    category: 'Jacket',
    price: 240,
    oldPrice: 290,
    tag: 'Collection 2026',
    image: ASSETS.colorblockJacket,
    badge: 'New',
    colors: ['#8ba888', '#1e293b', '#ffffff'],
    sizes: ['S', 'M', 'L'],
    description: 'Tri-color paneled technical windbreaker featuring reflective piping, breathable mesh underarm vents, and adjustable bungee hem.'
  }
];

export const ALL_CATALOG_PRODUCTS = [
  // Shirt Category
  {
    id: 'cat-prod-1',
    title: 'Heavyweight Mineral Boxy Tee',
    category: 'Shirt',
    price: 95,
    oldPrice: 110,
    tag: 'Core Essential',
    image: ASSETS.charcoalTee,
    badge: 'Best Seller',
    colors: ['#374151', '#111827', '#ffffff'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '320GSM heavy Japanese combed cotton t-shirt featuring relaxed drop shoulders and reinforced ribbed collar.'
  },
  {
    id: 'cat-prod-2',
    title: 'Oversized Minimalist Poplin Shirt',
    category: 'Shirt',
    price: 145,
    oldPrice: 175,
    tag: 'New 2026',
    image: ASSETS.editorialCard,
    badge: 'New',
    colors: ['#ffffff', '#000000', '#c4c4c8'],
    sizes: ['M', 'L', 'XL'],
    description: 'Crisp structured poplin button-down with hidden placket, architectural sleeve folds, and relaxed drape.'
  },
  {
    id: 'cat-prod-3',
    title: 'Tactical Utility Pocket Overshirt',
    category: 'Shirt',
    price: 165,
    tag: 'Drop 01',
    image: ASSETS.bomberDetail,
    badge: 'Popular',
    colors: ['#2b2b30', '#6366f1', '#ff5500'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Heavy cotton twill overshirt with dual 3D pleated cargo chest pockets and matte snap fasteners.'
  },

  // Jacket Category
  {
    id: 'cat-prod-4',
    title: 'Synthetix Mint Shell Jacket 02',
    category: 'Jacket',
    price: 280,
    oldPrice: 320,
    tag: 'Drop 01',
    image: ASSETS.mintJacket,
    badge: 'Popular',
    colors: ['#a8d5ba', '#2d3748', '#ffffff'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: '3-layer microporous waterproof membrane shell with water-resistant YKK Aquaguard zips and storm hood.'
  },
  {
    id: 'cat-prod-5',
    title: 'Aethel Sport Colorblock Windbreaker',
    category: 'Jacket',
    price: 240,
    oldPrice: 280,
    tag: 'Collection 2026',
    image: ASSETS.colorblockJacket,
    badge: 'New',
    colors: ['#8ba888', '#1e293b', '#ffffff'],
    sizes: ['S', 'M', 'L'],
    description: 'Lightweight ripstop windbreaker with ergonomic sleeve articulation and reflective accent piping.'
  },
  {
    id: 'cat-prod-6',
    title: 'Monochrome Tracksuit Bomber',
    category: 'Jacket',
    price: 260,
    tag: 'Essential',
    image: ASSETS.tracksuit,
    badge: 'Core',
    colors: ['#18181b', '#3f3f46'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Silky smooth technical jersey bomber with ribbed varsity cuffs and signature gunmetal hardware.'
  },

  // Jeans Category
  {
    id: 'cat-prod-7',
    title: 'Utility Washed Selvedge Denim',
    category: 'Jeans',
    price: 185,
    oldPrice: 220,
    tag: 'Japanese Denim',
    image: ASSETS.sweater,
    badge: 'Essential',
    colors: ['#3b82f6', '#1e3a8a', '#18181b'],
    sizes: ['28', '30', '32', '34', '36'],
    description: '14oz red-line Japanese shuttle-loom selvedge denim with relaxed wide leg silhouette and vintage fade.'
  },
  {
    id: 'cat-prod-8',
    title: 'Relaxed Double-Knee Carpenter Jean',
    category: 'Jeans',
    price: 160,
    tag: 'New 2026',
    image: ASSETS.wireframeModel,
    badge: 'New',
    colors: ['#475569', '#1e293b', '#e2e8f0'],
    sizes: ['30', '32', '34', '36'],
    description: 'Reinforced dual-layer knee panels, hammer loop details, and durable triple-stitched seams.'
  },
  {
    id: 'cat-prod-9',
    title: 'Raw Kuroki Jet Black Tapered Denim',
    category: 'Jeans',
    price: 210,
    oldPrice: 250,
    tag: 'Limited',
    image: ASSETS.statementThumb,
    badge: 'Limited',
    colors: ['#09090b', '#27272a'],
    sizes: ['29', '31', '33', '35'],
    description: 'Sulfur black dyed raw selvedge with custom engraved metal hardware and leather waist patch.'
  },

  // Outer Category
  {
    id: 'cat-prod-10',
    title: 'Voltaic Arc Shell Puffer',
    category: 'Outer',
    price: 340,
    oldPrice: 420,
    tag: 'Drop 01',
    image: ASSETS.orangePuffer,
    badge: 'Limited',
    colors: ['#ff5500', '#111111', '#4a5568'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '750-fill power responsibly sourced down puffer with high-abrasion ballistic nylon shoulder yokes.'
  },
  {
    id: 'cat-prod-11',
    title: 'Expedition Thermal Storm Parka',
    category: 'Outer',
    price: 390,
    oldPrice: 450,
    tag: 'Winter 2026',
    image: ASSETS.editorialCard,
    badge: 'Premium',
    colors: ['#0f172a', '#334155', '#ea580c'],
    sizes: ['M', 'L', 'XL'],
    description: 'Sub-zero insulated parka with detachable storm hood, magnetic storm flap, and fleece-lined hand warmers.'
  },
  {
    id: 'cat-prod-12',
    title: 'Modular Technical Down Gilet',
    category: 'Outer',
    price: 220,
    tag: 'Core',
    image: ASSETS.bomberDetail,
    badge: 'Essential',
    colors: ['#1c1917', '#78716c'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Lightweight packable down vest engineered for seamless mid-layering with water-resistant shell.'
  },

  // Shoes Category
  {
    id: 'cat-prod-13',
    title: 'Chunky Architectural Runner 01',
    category: 'Shoes',
    price: 260,
    oldPrice: 310,
    tag: 'Footwear Drop',
    image: ASSETS.heroModel,
    badge: 'Best Seller',
    colors: ['#f4f4f5', '#18181b', '#ff5500'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    description: 'Multi-density sculpted Vibram midsole with technical mesh, premium suede overlays, and speed lacing.'
  },
  {
    id: 'cat-prod-14',
    title: 'Cyber All-Weather Tactical Boot',
    category: 'Shoes',
    price: 320,
    oldPrice: 380,
    tag: 'Limited',
    image: ASSETS.wireframeModel,
    badge: 'Limited',
    colors: ['#0a0a0c', '#52525b'],
    sizes: ['41', '42', '43', '44', '45'],
    description: 'Cordura ballistic nylon and waterproof leather tactical boot with FIDLOCK magnetic buckle system.'
  },
  {
    id: 'cat-prod-15',
    title: 'Minimalist Monochrome Low-Top',
    category: 'Shoes',
    price: 195,
    tag: 'Core',
    image: ASSETS.tracksuit,
    badge: 'Popular',
    colors: ['#ffffff', '#000000'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    description: 'Handcrafted Italian nappa leather low-top sneaker with cushioned leather footbed and stitched cupsole.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Emma Williams',
    role: 'Fashion Stylist',
    image: ASSETS.reviewerEmma,
    rating: 5.0,
    reviewCount: 49,
    quote: 'Everything is absolutely perfect! From the fabric quality to the flawless fit every piece feels premium. This brand has completely transformed my wardrobe.',
    highlight: 'Flawless Fit & Premium Materials'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Creative Director, Tokyo',
    image: ASSETS.wireframeModel,
    rating: 5.0,
    reviewCount: 64,
    quote: 'The architectural silhouettes and tactical accents are unmatched. You can feel the intention and precision in every single stitch and seam.',
    highlight: 'Architectural Silhouettes'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Senior Art Curator',
    image: ASSETS.editorialCard,
    rating: 4.9,
    reviewCount: 38,
    quote: 'Furia strikes the elusive balance between avant-garde editorial runway presence and effortless everyday wearability. Truly visionary.',
    highlight: 'Effortless Wearability'
  }
];

export const ACCORDION_COLLECTIONS = [
  {
    id: 'col-1',
    title: 'Statement Pieces 2025',
    tag: 'Active',
    description: 'Your go-to wardrobe staples, crafted for comfort and effortless style with technical water-repellent finishing.',
    cta: 'GET STARTED',
    image: ASSETS.statementThumb,
    itemsCount: '18 Products'
  },
  {
    id: 'col-2',
    title: 'Everyday Essentials 2026',
    tag: 'Upcoming',
    description: 'Modular layering foundations designed to seamlessly transition across urban climates and dynamic routines.',
    cta: 'EXPLORE DROP',
    image: ASSETS.charcoalTee,
    itemsCount: '24 Products'
  },
  {
    id: 'col-3',
    title: 'Timeless Classics 2026',
    tag: 'Archived',
    description: 'Heritage tailoring reinterpreted through modern technical silhouettes and enduring Japanese textiles.',
    cta: 'VIEW CATALOG',
    image: ASSETS.bomberDetail,
    itemsCount: '12 Products'
  },
  {
    id: 'col-4',
    title: 'Seasonal Collections 2025',
    tag: 'Limited',
    description: 'Expedition-grade outerwear built with recycled thermal insulation and architectural storm collars.',
    cta: 'DISCOVER MORE',
    image: ASSETS.orangePuffer,
    itemsCount: '15 Products'
  }
];
