import { Product, ProductCategory, Category } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Gold & Jewelry
  {
    id: 'prod-gold-1',
    sku: 'BEK-GLD-001',
    name: '18K Solid Gold Cuban Link Chain (8mm)',
    category: 'Gold & Jewelry',
    price: 950000,
    discountPrice: 850000,
    originalPrice: 950000,
    description: 'Masterfully forged in pure 18-karat yellow gold with high-polish beveled links and secure double-locking clasp. Certified purity hallmark stamped for discerning collectors.',
    details: [
      'Purity: 18 Karat Yellow Gold (750 hallmark stamped)',
      'Link Width: 8.0 mm solid profile',
      'Clasp: Custom heavy-duty double safety box lock',
      'Weight: Approx. 48.5 grams certified gold weight',
      'Accompanied by serialized Certificate of Authenticity'
    ],
    specifications: {
      'Metal Purity': '18K Yellow Gold (750)',
      'Total Weight': '48.5g',
      'Link Profile': 'Beveled Miami Cuban',
      'Hallmark': 'Official 750 Assay Stamped',
      'Packaging': 'Signature Velvet Presentation Case'
    },
    image: '/src/assets/images/cat_gold_jewelry_1790167575219.jpg',
    images: [
      '/src/assets/images/cat_gold_jewelry_1790167575219.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_gold_jewelry_1790167575219.jpg'
    ],
    inStock: true,
    stockCount: 8,
    stock: 8,
    lowStockThreshold: 3,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    active: true,
    variants: ['18 Inches (45cm)', '20 Inches (50cm)', '24 Inches (60cm)'],
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-gold-2',
    sku: 'BEK-GLD-002',
    name: 'Heritage Diamond-Accented Sovereign Signet Ring',
    category: 'Gold & Jewelry',
    price: 480000,
    discountPrice: 420000,
    originalPrice: 480000,
    description: 'An enduring symbol of prestige. Hand-carved solid gold face bordered with brilliant-cut micro-pavé laboratory-certified VVS diamonds and comfort-fit shank.',
    details: [
      'Purity: 18 Karat Solid Gold with mirror finish',
      'Diamonds: 0.35 ctw Round Brilliant (Color F, Clarity VVS1)',
      'Band Width: 14mm face tapering to 5mm comfort-fit shank',
      'Complimentary ring sizing certificate and jewelry insurance appraisal'
    ],
    specifications: {
      'Material': '18K Solid Yellow Gold',
      'Stone Type': 'VVS Natural Diamonds (0.35 ctw)',
      'Setting': 'Hand Micro-Pavé Prong',
      'Face Size': '14mm x 12mm Oval Signet',
      'Origin': 'Handcrafted Italian Fine Jewelry Workshop'
    },
    image: '/src/assets/images/cat_gold_jewelry_1790167575219.jpg',
    images: [
      '/src/assets/images/cat_gold_jewelry_1790167575219.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 12,
    stock: 12,
    lowStockThreshold: 4,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    active: true,
    variants: ['Size US 8 (Nigerian Size P)', 'Size US 9 (Nigerian Size R)', 'Size US 10 (Nigerian Size T)', 'Size US 11 (Nigerian Size V)'],
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2026-09-01'
  },
  {
    id: 'prod-gold-3',
    sku: 'BEK-GLD-003',
    name: 'Princess Tennis Bracelet in 14K Gold',
    category: 'Gold & Jewelry',
    price: 650000,
    discountPrice: 580000,
    originalPrice: 650000,
    description: 'Endless scintillation with a continuous line of prong-set simulated diamonds set in a supple 14k gold chain that drapes effortlessly across the wrist.',
    details: [
      'Metal: 14K Yellow Gold Finish with Solid Core',
      'Length: 7 inches (18cm standard fit)',
      'Closure: Invisible safety box tongue clasp',
      'Hypoallergenic, nickel-free, and tarnish-resistant'
    ],
    specifications: {
      'Gold Purity': '14K Gold Finish',
      'Closure': 'Dual Safety Latch Box Clasp',
      'Stone Setting': 'Four-Prong Brilliant Mount',
      'Length': '7.0 inches (18 cm)'
    },
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    images: [
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_gold_jewelry_1790167575219.jpg'
    ],
    inStock: true,
    stockCount: 15,
    stock: 15,
    lowStockThreshold: 5,
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
    active: true,
    variants: ['6.5 Inches (Petite)', '7.0 Inches (Standard)', '7.5 Inches (Relaxed)'],
    rating: 5.0,
    reviewCount: 42,
    createdAt: '2026-07-15'
  },

  // 2. Unisex "Up & Down" Sets
  {
    id: 'prod-unisex-1',
    sku: 'BEK-UNI-001',
    name: 'Executive Velour Lounge "Up & Down" Two-Piece',
    category: "Unisex 'Up & Down' Sets",
    price: 65000,
    discountPrice: 55000,
    originalPrice: 65000,
    description: 'The pinnacle of luxury casualwear. Plush heavyweight cotton-velour zip jacket paired with tapered drawstring joggers finished with custom gold-toned BECKKY hardware.',
    details: [
      'Material: 420 GSM Heavyweight Cotton-Poly Velour blend',
      'Hardware: Custom gilded BECKKY metal zip pull and aglets',
      'Fit: Relaxed tailored unisex silhouette for men and women',
      'Pockets: Deep zip side pockets on both jacket and trouser'
    ],
    specifications: {
      'Fabric Weight': '420 GSM Velour Fleece',
      'Composition': '80% Premium Cotton, 20% Polyester',
      'Hardware': 'Brushed Brass Electroplated Gold',
      'Care': 'Machine wash cold on gentle cycle or dry clean'
    },
    image: '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
    images: [
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 22,
    stock: 22,
    lowStockThreshold: 5,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    active: true,
    variants: ['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)', '2XL'],
    rating: 4.9,
    reviewCount: 67,
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-unisex-2',
    sku: 'BEK-UNI-002',
    name: 'Bespoke Waffle-Knit "Up & Down" Resort Set',
    category: "Unisex 'Up & Down' Sets",
    price: 52000,
    discountPrice: 45000,
    originalPrice: 52000,
    description: 'Breathable geometric thermal weave crafted from organic combed Aegean cotton. Includes an open camp-collar overshirt and matching drawstring lounge shorts.',
    details: [
      'Material: 100% Pre-shrunk Organic Aegean Cotton waffle weave',
      'Buttons: Carved horn-effect signature buttons',
      'Cut: Boxy drop-shoulder short-sleeve shirt with elasticated shorts',
      'Ideal for warm climates, tropical travel, and relaxed weekends'
    ],
    specifications: {
      'Weave Type': '3D Honeycomb Thermal Waffle',
      'Fiber': '100% Combed Aegean Long-Staple Cotton',
      'Closure': 'Camp-collar with horn buttons',
      'Wash Care': 'Hand or machine wash cold, lay flat to dry'
    },
    image: '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
    images: [
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 18,
    stock: 18,
    lowStockThreshold: 4,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    active: true,
    variants: ['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)'],
    rating: 4.7,
    reviewCount: 19,
    createdAt: '2026-09-05'
  },

  // 3. Supplements
  {
    id: 'prod-supp-1',
    sku: 'BEK-SUP-001',
    name: 'Marine Collagen Peptides & Pure Pearl Glow Elixir',
    category: 'Supplements (body glow & anti-aging)',
    price: 32000,
    discountPrice: 28000,
    originalPrice: 32000,
    description: 'Hydrolyzed wild deep-sea marine collagen type I & III infused with freshwater pearl powder, hyaluronic acid, and organic acerola cherry Vitamin C for luminous skin hydration.',
    details: [
      'Serving: 10,000mg Bioactive Peptides per scoop',
      'Skin Benefits: Enhances dermis elasticity, cellular firmness, and natural radiance',
      'Formulation: Unflavored ultra-fine solubility, zero fishy odor or artificial sweeteners',
      'Tested: Third-party tested for purity, heavy metals, and microbiological safety'
    ],
    specifications: {
      'Form': 'Water-soluble fine bioactive peptide powder',
      'Net Weight': '300g (30-day supply)',
      'Dosage': '1 scoop daily in water, tea, or juice',
      'Certifications': 'cGMP, Non-GMO, Halal Certified'
    },
    image: '/src/assets/images/cat_glow_supplements_1790167599584.jpg',
    images: [
      '/src/assets/images/cat_glow_supplements_1790167599584.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 40,
    stock: 40,
    lowStockThreshold: 8,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    active: true,
    variants: ['Standard 300g Jar', 'Twin-Pack (600g Total)', 'Quarterly Glow Bundle (3 Jars)'],
    rating: 5.0,
    reviewCount: 92,
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-supp-2',
    sku: 'BEK-SUP-002',
    name: 'Glutathione 2000mg + Liposomal Vitamin C Complex',
    category: 'Supplements (body glow & anti-aging)',
    price: 38000,
    discountPrice: 34000,
    originalPrice: 38000,
    description: 'Gold-standard antioxidant formula combining Setria L-Glutathione with phospholipid liposomal delivery for maximum cellular bioavailability and hyperpigmentation reduction.',
    details: [
      'Active Ingredients: 2000mg Reduced Glutathione + 1000mg Liposomal Vitamin C',
      'Co-Factors: Alpha-Lipoic Acid, Milk Thistle Extract, and Zinc Glycinate',
      'Target: Fights oxidative stress, evens out complexion tone, and supports liver detoxification',
      'Capsule: 100% plant-based vegetarian pullulan capsules'
    ],
    specifications: {
      'Serving Size': '2 vegetable capsules daily',
      'Count': '60 capsules per bottle',
      'Bioavailability': 'Liposomal phospholipid shield',
      'Storage': 'Store in cool dry place away from sunlight'
    },
    image: '/src/assets/images/cat_glow_supplements_1790167599584.jpg',
    images: [
      '/src/assets/images/cat_glow_supplements_1790167599584.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 35,
    stock: 35,
    lowStockThreshold: 6,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    active: true,
    variants: ['Single Bottle (60 Count)', 'Double Bottle Pack (120 Count)'],
    rating: 4.8,
    reviewCount: 51,
    createdAt: '2026-08-15'
  },

  // 4. Men's Wear
  {
    id: 'prod-mens-1',
    sku: 'BEK-MEN-001',
    name: 'Double-Breasted Italian Linen Sartorial Blazer',
    category: "Men's Wear",
    price: 110000,
    discountPrice: 95000,
    originalPrice: 110000,
    description: 'Tailored with crisp Italian delavé linen featuring a timeless six-on-two button stance, peak lapels, genuine horn buttons, and breathable half-canvas interior construction.',
    details: [
      'Fabric: 100% Delavé Flax Linen milled in Biella, Italy',
      'Construction: Half-canvas chest piece with hand-rolled lapels',
      'Vents: Dual side rear vents for effortless movement',
      'Buttons: Genuine smoky horn buttons with hand-stitched shanks'
    ],
    specifications: {
      'Fit': 'Modern Tailored Classic',
      'Lining': 'Cupro Bemberg butterfly half lining',
      'Shoulder': 'Neapolitan soft spalla camicia shoulder',
      'Care': 'Specialist dry clean only'
    },
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    images: [
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg'
    ],
    inStock: true,
    stockCount: 10,
    stock: 10,
    lowStockThreshold: 3,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    active: true,
    variants: ['38 Regular (S)', '40 Regular (M)', '42 Regular (L)', '44 Regular (XL)', '46 Long (2XL)'],
    rating: 4.9,
    reviewCount: 31,
    createdAt: '2026-08-22'
  },

  // 5. Ladies' Tops & Jeans
  {
    id: 'prod-ladies-1',
    sku: 'BEK-LAD-001',
    name: 'Silk Georgette Asymmetric Draped Evening Blouse',
    category: "Ladies' Tops & Jeans",
    price: 42000,
    discountPrice: 38000,
    originalPrice: 42000,
    description: 'Sculptural elegance in pure mulberry silk. A dramatic high scarf neckline cascades into an asymmetric waterfall drape that catches movement gracefully.',
    details: [
      'Fabric: 100% 19-Momme Grade 6A Mulberry Silk',
      'Neckline: High-standing drape scarf with mother-of-pearl back buttons',
      'Sleeve: Relaxed bishop sleeve with elongated French cuffs',
      'Dry clean only'
    ],
    specifications: {
      'Silk Weight': '19 Momme Heavy Georgette',
      'Buttons': 'Genuine iridescent Mother-of-Pearl',
      'Drape': 'Bias-cut fluid silhouette'
    },
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    images: [
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg'
    ],
    inStock: true,
    stockCount: 16,
    stock: 16,
    lowStockThreshold: 4,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
    active: true,
    variants: ['US 2 (XS)', 'US 4 (S)', 'US 6 (M)', 'US 8 (L)'],
    rating: 4.9,
    reviewCount: 28,
    createdAt: '2026-08-25'
  },
  {
    id: 'prod-ladies-2',
    sku: 'BEK-LAD-002',
    name: 'Sculpt High-Rise Wide-Leg Raw Indigo Denim Jeans',
    category: "Ladies' Tops & Jeans",
    price: 35000,
    discountPrice: 29500,
    originalPrice: 35000,
    description: 'Crafted with premium comfort-stretch Japanese denim that sculpts and elongates. Deep raw indigo wash with tobacco contrast stitching and polished brass rivets.',
    details: [
      'Fabric: 98% Premium Organic Cotton, 2% Elastane',
      'Rise: 11.5 inches high rise waist support',
      'Inseam: 32 inches full-length wide leg floor graze',
      'Custom gold-embossed BECKKY leather waistband patch'
    ],
    specifications: {
      'Denim Weight': '12.5 oz Japanese Ring-Spun Twill',
      'Hardware': 'Solid Antique Brass Rivets & Fly Buttons',
      'Stitching': 'Heavy-duty 4-ply contrast thread'
    },
    image: '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
    images: [
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
    ],
    inStock: true,
    stockCount: 20,
    stock: 20,
    lowStockThreshold: 5,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
    active: true,
    variants: ['Waist 26 (UK 8)', 'Waist 28 (UK 10)', 'Waist 30 (UK 12)', 'Waist 32 (UK 14)', 'Waist 34 (UK 16)'],
    rating: 4.8,
    reviewCount: 45,
    createdAt: '2026-09-02'
  },

  // 6. Luxury Bags & Shoes
  {
    id: 'prod-bags-1',
    sku: 'BEK-BAG-001',
    name: 'Handcrafted Italian Calfskin Structured Top-Handle Bag',
    category: 'Luxury Bags & Shoes',
    price: 175000,
    discountPrice: 150000,
    originalPrice: 175000,
    description: 'Architectural silhouette rendered in full-grain palmellato calfskin leather with hand-painted edge sealant, suede interior lining, and lockable turn-clasp hardware.',
    details: [
      'Leather: 100% Full-Grain Italian Palmellato Calf Leather',
      'Lining: Butter-soft micro-suede interior with dual compartment zip pockets',
      'Strap: Detachable and adjustable crossbody strap (48cm - 56cm drop)',
      'Feet: Four protective base gold studs'
    ],
    specifications: {
      'Dimensions': '28cm W x 20cm H x 12cm D',
      'Hardware': '24K Gold PVD-plated Solid Brass',
      'Closure': 'Rotational Turn-Lock Mechanism with Key Clochette'
    },
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    images: [
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_gold_jewelry_1790167575219.jpg'
    ],
    inStock: true,
    stockCount: 7,
    stock: 7,
    lowStockThreshold: 2,
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
    active: true,
    variants: ['Midnight Onyx', 'Cognac Tan', 'Forest Emerald', 'Burgundy Wine'],
    rating: 5.0,
    reviewCount: 54,
    createdAt: '2026-08-05'
  },
  {
    id: 'prod-shoes-1',
    sku: 'BEK-SHOE-001',
    name: 'Goodyear-Welted Burnished Calfskin Penny Loafers',
    category: 'Luxury Bags & Shoes',
    price: 85000,
    discountPrice: 75000,
    originalPrice: 85000,
    description: 'Bench-crafted by generational cobblers using Goodyear welt construction that can be re-soled for decades of service. Hand-burnished French calfskin with stacked leather heels.',
    details: [
      'Upper: Full-Grain French Box Calfskin hand-patinated',
      'Construction: Genuine 360-degree Goodyear Welt',
      'Sole: Oak-bark tanned channeled leather sole with brass nail reinforcement',
      'Includes pair of cedar shoe trees and cotton travel bags'
    ],
    specifications: {
      'Last Profile': 'Round-Toe Almond Classic',
      'Sole Thickness': '8mm Oak-Bark Leather with Rubber Heel Inset',
      'Insole': 'Vegetable-Tanned Arch Cushioning'
    },
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    images: [
      '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
      '/src/assets/images/cat_unisex_sets_1790167586547.jpg'
    ],
    inStock: true,
    stockCount: 11,
    stock: 11,
    lowStockThreshold: 3,
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
    active: true,
    variants: ['EU 40 (US 7.5)', 'EU 41 (US 8.5)', 'EU 42 (US 9.5)', 'EU 43 (US 10.5)', 'EU 44 (US 11.5)'],
    rating: 4.7,
    reviewCount: 18,
    createdAt: '2026-09-08'
  }
];

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'cat-gold',
    name: 'Gold & Jewelry',
    description: 'Certified 18K/14K solid gold chains, sovereign signet rings, and diamond pieces.',
    image: '/src/assets/images/cat_gold_jewelry_1790167575219.jpg',
    active: true,
    itemCount: 3
  },
  {
    id: 'cat-unisex',
    name: "Unisex 'Up & Down' Sets",
    description: 'Tailored velour and waffle 2-piece sets crafted for effortless prestige.',
    image: '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
    active: true,
    itemCount: 2
  },
  {
    id: 'cat-supplements',
    name: 'Supplements (body glow & anti-aging)',
    description: 'Marine collagen, glutathione elixirs, and cellular longevity complexes.',
    image: '/src/assets/images/cat_glow_supplements_1790167599584.jpg',
    active: true,
    itemCount: 2
  },
  {
    id: 'cat-mens',
    name: "Men's Wear",
    description: 'Italian linen blazers, mercerized knits, and bespoke formal wear.',
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    active: true,
    itemCount: 1
  },
  {
    id: 'cat-ladies',
    name: "Ladies' Tops & Jeans",
    description: 'Silk georgette blouses, draped tunics, and sculpting raw denim.',
    image: '/src/assets/images/cat_unisex_sets_1790167586547.jpg',
    active: true,
    itemCount: 2
  },
  {
    id: 'cat-bags-shoes',
    name: 'Luxury Bags & Shoes',
    description: 'Handcrafted Italian calfskin satchels, totes, and burnished loafers.',
    image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
    active: true,
    itemCount: 2
  }
];
