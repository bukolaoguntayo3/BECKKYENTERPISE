import { Coupon, CustomerSummary, Review, BusinessSettings, DeliveryZone, PaymentRecord } from '../types';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  name: 'BECKKYENTERPRISE',
  email: 'bukolaoguntayo3@gmail.com',
  phone: '08061281910',
  whatsapp: '08061281910',
  tiktok: 'amblessed_246',
  instagram: 'bukolanifemi2000.54',
  facebook: '', // Configurable until official link is provided
  address: 'Victoria Island, Lagos, Nigeria', // Central configurable business address
  businessHours: 'Monday – Saturday: 8:00 AM – 8:00 PM (West Africa Time)',
  currency: 'NGN',
  currencySymbol: '₦',
  taxRate: 0,
  freeDeliveryThreshold: 50000, // Free delivery over ₦50,000
  standardDeliveryFee: 3500,
  expressDeliveryFee: 7000
};

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-lagos-std',
    name: 'Lagos Mainland & Island Standard Delivery',
    description: 'Direct courier delivery across all Lagos districts.',
    fee: 3500,
    estimatedTime: '24–48 Hours',
    active: true
  },
  {
    id: 'zone-lagos-express',
    name: 'Lagos VIP Same-Day Priority Dispatch',
    description: 'Instant dispatch via dedicated motorcycle concierge.',
    fee: 7000,
    estimatedTime: 'Same Day (Within 6 Hours)',
    active: true
  },
  {
    id: 'zone-nationwide',
    name: 'Nationwide Courier (All Nigerian States)',
    description: 'Door-to-door insured interstate shipping via GIG Logistics / DHL.',
    fee: 6500,
    estimatedTime: '2–4 Business Days',
    active: true
  },
  {
    id: 'zone-international',
    name: 'International Air Express (UK, US, Canada, UAE)',
    description: 'Tracked worldwide express air freight with customs handling.',
    fee: 35000,
    estimatedTime: '3–5 Business Days',
    active: true
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'BECKKY10',
    type: 'percentage',
    discountType: 'percentage',
    value: 10,
    minimumOrder: 20000,
    minSpend: 20000,
    maximumDiscount: 50000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    usageLimit: 500,
    usageCount: 42,
    active: true,
    description: '10% off luxury orders over ₦20,000'
  },
  {
    id: 'coup-2',
    code: 'WELCOMEVIP',
    type: 'percentage',
    discountType: 'percentage',
    value: 15,
    minimumOrder: 30000,
    minSpend: 30000,
    maximumDiscount: 75000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    usageLimit: 300,
    usageCount: 88,
    active: true,
    description: '15% off for newly registered patrons'
  },
  {
    id: 'coup-3',
    code: 'GOLD5000',
    type: 'fixed',
    discountType: 'fixed',
    value: 5000,
    minimumOrder: 50000,
    minSpend: 50000,
    maximumDiscount: 5000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    usageLimit: 200,
    usageCount: 15,
    active: true,
    description: '₦5,000 instant discount on orders above ₦50,000'
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'prod-gold-1': [
    {
      id: 'rev-1',
      productId: 'prod-gold-1',
      author: 'Adekunle B.',
      rating: 5,
      date: '2026-08-14',
      comment: 'The weight of the 18K gold chain is incredible. The hallmark stamp was certified upon arrival. Exquisite craftsmanship and secure double clasp.',
      verifiedPurchase: true
    },
    {
      id: 'rev-2',
      productId: 'prod-gold-1',
      author: 'Marcus Vance',
      rating: 5,
      date: '2026-09-02',
      comment: 'Worth every single Naira. Looks breathtaking under natural sunlight and the velvet box was regal. Arrived in 2 business days.',
      verifiedPurchase: true
    }
  ],
  'prod-unisex-1': [
    {
      id: 'rev-3',
      productId: 'prod-unisex-1',
      author: 'Chidinma O.',
      rating: 5,
      date: '2026-08-28',
      comment: 'The velour fabric is so heavy and soft. The gold zipper accents give it that runway feel. Both my partner and I wear this set constantly.',
      verifiedPurchase: true
    }
  ],
  'prod-supp-1': [
    {
      id: 'rev-4',
      productId: 'prod-supp-1',
      author: 'Elena Rostova',
      rating: 5,
      date: '2026-08-19',
      comment: 'My skin has that glass glow after only 3 weeks of taking the Marine Collagen & Glutathione. Noticeable reduction in fine lines and dark spots.',
      verifiedPurchase: true
    }
  ]
};

export const CUSTOMER_TESTIMONIALS = [
  {
    id: 'test-1',
    author: 'Kelechi Amadi',
    location: 'Victoria Island, Lagos',
    role: 'Verified Sovereign Patron',
    avatar: 'K',
    rating: 5,
    quote: 'BECKKYENTERPRISE is in a league of its own. The solid 18K gold Cuban link chain came with authentic assay documentation and arrived safely in Lagos within 24 hours. Pure luxury from start to finish.',
    productMention: '18K Solid Gold Cuban Link Chain'
  },
  {
    id: 'test-2',
    author: 'Victoria Sterling',
    location: 'Abuja, FCT',
    role: 'VIP Member',
    avatar: 'V',
    rating: 5,
    quote: 'The velour unisex set has become my staple travel outfit. Heavyweight fabric, pristine tailoring, and the gold hardware does not tarnish. Customer support on WhatsApp answered in minutes.',
    productMention: 'Velour Lounge "Up & Down" Set'
  },
  {
    id: 'test-3',
    author: 'Dr. Tariq Al-Mansoor',
    location: 'Port Harcourt, Rivers State',
    role: 'Private Client',
    avatar: 'T',
    rating: 5,
    quote: 'The Marine Collagen and Glutathione complexes are pharmaceutical grade. Outstanding purity, cellular energy, and measurable radiance. BECKKY is my primary source.',
    productMention: 'Luminous Glow Marine Collagen'
  }
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'Gold & Fine Jewelry',
    question: 'Are all gold pieces genuine solid gold and hallmarked?',
    answer: 'Yes, absolutely. Every piece in our Gold & Jewelry collection is forged in genuine certified solid gold (750 hallmark for 18-karat and 585 for 14-karat). Each order is accompanied by a serialized Certificate of Authenticity and an independent laboratory assay report.'
  },
  {
    id: 'faq-2',
    category: 'Logistics & Delivery',
    question: 'How fast is nationwide and worldwide delivery?',
    answer: 'Orders within Lagos are delivered within 24 to 48 hours (with same-day priority available). Interstate delivery across Nigeria takes 2 to 4 business days. International express takes 3 to 5 business days. You receive real-time SMS and email tracking links upon dispatch.'
  },
  {
    id: 'faq-3',
    category: 'Unisex Sizing & Tailoring',
    question: 'How do the Unisex "Up & Down" sets fit?',
    answer: 'Our unisex sets feature a tailored relaxed silhouette designed to drape impeccably on both men and women. We recommend men choose their standard size for a fitted look or one size up for oversized streetwear, while women can select their normal size for a chic relaxed boyfriend fit.'
  },
  {
    id: 'faq-4',
    category: 'Supplements & Safety',
    question: 'Are the body glow and anti-aging supplements clinically tested?',
    answer: 'Yes. All BECKKYENTERPRISE supplements are formulated in an FDA-registered, cGMP-certified facility. Every batch undergoes laboratory testing for active potency and safety.'
  },
  {
    id: 'faq-5',
    category: 'Returns & Exchanges',
    question: 'What is your return policy if an item does not suit me?',
    answer: 'We offer a 14-day return and exchange window from the date of recorded courier delivery. Items must be in unworn, pristine condition with all original security seals, boxes, and tags attached. You can initiate a return directly from your user dashboard with one click.'
  },
  {
    id: 'faq-6',
    category: 'Payment Methods',
    question: 'What payment options do you support?',
    answer: 'We support Nigerian Naira (₦) payments via secure Debit/Credit Cards (Mastercard, Visa, Verve), Direct Bank Transfer, Pay on Delivery within Lagos, and international cards.'
  }
];

export const INITIAL_CUSTOMERS: CustomerSummary[] = [
  {
    id: 'cust-1',
    fullName: 'Bukola Oguntayo',
    email: 'bukolaoguntayo3@gmail.com',
    phone: '08061281910',
    country: 'Nigeria',
    totalOrders: 3,
    totalSpend: 1350000,
    loyaltyTier: 'Diamond Sovereign',
    lastOrderDate: '2026-09-21',
    status: 'Active',
    createdAt: '2026-06-15',
    rewardPoints: 675
  },
  {
    id: 'cust-2',
    fullName: 'Sir Richard Sterling',
    email: 'richard.sterling@mayfairluxury.co.uk',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    totalOrders: 5,
    totalSpend: 4200000,
    loyaltyTier: 'Diamond Sovereign',
    lastOrderDate: '2026-09-18',
    status: 'Active',
    createdAt: '2026-05-10',
    rewardPoints: 2100
  },
  {
    id: 'cust-3',
    fullName: 'Amina Bello',
    email: 'amina.bello@lagosholdings.ng',
    phone: '+234 803 123 4567',
    country: 'Nigeria',
    totalOrders: 2,
    totalSpend: 285000,
    loyaltyTier: 'Gold VIP',
    lastOrderDate: '2026-09-14',
    status: 'Active',
    createdAt: '2026-07-22',
    rewardPoints: 142
  },
  {
    id: 'cust-4',
    fullName: 'Jean-Luc Moreau',
    email: 'jl.moreau@atelierparis.fr',
    phone: '+33 1 42 68 55 00',
    country: 'France',
    totalOrders: 4,
    totalSpend: 1850000,
    loyaltyTier: 'Gold VIP',
    lastOrderDate: '2026-09-08',
    status: 'Active',
    createdAt: '2026-06-01',
    rewardPoints: 925
  },
  {
    id: 'cust-5',
    fullName: 'Fatima Al-Hassan',
    email: 'fatima.alhassan@emiratescapital.ae',
    phone: '+971 4 301 8888',
    country: 'United Arab Emirates',
    totalOrders: 6,
    totalSpend: 5400000,
    loyaltyTier: 'Diamond Sovereign',
    lastOrderDate: '2026-09-22',
    status: 'Active',
    createdAt: '2026-04-18',
    rewardPoints: 2700
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-101',
    orderId: 'ord-1',
    orderNumber: 'BEK-20260920-0012',
    transactionReference: 'TRX-BKY-892410-NG',
    amount: 853500,
    customerName: 'Bukola Oguntayo',
    customerEmail: 'bukolaoguntayo3@gmail.com',
    status: 'Successful',
    provider: 'Secure Paystack / Flutterwave Gateway',
    createdAt: '2026-09-20'
  },
  {
    id: 'pay-102',
    orderId: 'ord-2',
    orderNumber: 'BEK-20260918-0009',
    transactionReference: 'TRX-BKY-782194-NG',
    amount: 110000,
    customerName: 'Sir Richard Sterling',
    customerEmail: 'richard.sterling@mayfairluxury.co.uk',
    status: 'Successful',
    provider: 'International Card Processing',
    createdAt: '2026-09-18'
  },
  {
    id: 'pay-103',
    orderId: 'ord-3',
    orderNumber: 'BEK-20260914-0004',
    transactionReference: 'TRX-BKY-665120-NG',
    amount: 65000,
    customerName: 'Amina Bello',
    customerEmail: 'amina.bello@lagosholdings.ng',
    status: 'Successful',
    provider: 'Instant Bank Transfer',
    createdAt: '2026-09-14'
  }
];
