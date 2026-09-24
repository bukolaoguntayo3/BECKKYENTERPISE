import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Address,
  Order,
  User,
  ToastMessage,
  OrderStatus,
  CurrencyCode,
  Coupon,
  CustomerSummary,
  NotificationPreferences,
  Review,
  BusinessSettings,
  DeliveryZone,
  PaymentRecord
} from '../types';
import { INITIAL_PRODUCTS, CATEGORIES_DATA } from '../data/mockProducts';
import {
  VALID_COUPONS,
  INITIAL_CUSTOMERS,
  INITIAL_REVIEWS,
  DEFAULT_BUSINESS_SETTINGS,
  INITIAL_DELIVERY_ZONES,
  INITIAL_PAYMENTS
} from '../data/mockData';
import { formatPrice as formatPriceUtil } from '../utils/currency';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

interface ShopContextType {
  // Business Settings
  businessSettings: BusinessSettings;
  updateBusinessSettings: (settings: Partial<BusinessSettings>) => void;

  // Products
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, rating: number, comment: string, authorName: string) => void;
  bulkImportProducts: (csvText: string) => { added: number; errors: string[] };

  // Categories
  categories: Category[];
  addCategory: (categoryData: Omit<Category, 'id' | 'itemCount'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => { success: boolean; message?: string };

  // Recently Viewed
  recentlyViewedIds: string[];
  recordProductView: (productId: string) => void;

  // Cart & Discounts
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => boolean;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  finalCartTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & Profile
  currentUser: User | null;
  registeredUsers: User[];
  login: (email: string, password?: string, rememberMe?: boolean) => boolean;
  signUp: (fullName: string, email: string, phone: string, password?: string) => boolean;
  logout: () => void;
  updateProfile: (fullName: string, email: string, phone?: string) => void;
  toggleAdminRole: () => void;
  loyaltyPoints: number;
  referralCode: string;
  requestPasswordReset: (email: string) => boolean;
  resetPassword: (emailOrToken: string, newPassword: string) => boolean;

  // Notification Preferences
  notificationPreferences: NotificationPreferences;
  updateNotificationPreferences: (prefs: Partial<NotificationPreferences>) => void;

  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (
    deliveryAddress: Address,
    paymentMethod: string,
    deliveryFee: number,
    deliveryInstructions?: string
  ) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  requestOrderRefund: (orderId: string, reason: string, comments: string) => void;
  resolveRefundRequest: (orderId: string, decision: 'Approved' | 'Declined') => void;

  // Admin & Operations
  customers: CustomerSummary[];
  promotions: Coupon[];
  addPromotion: (promo: Omit<Coupon, 'id' | 'usageCount'>) => void;
  updatePromotion: (id: string, updates: Partial<Coupon>) => void;
  deletePromotion: (id: string) => void;
  deliveryZones: DeliveryZone[];
  updateDeliveryZone: (id: string, updates: Partial<DeliveryZone>) => void;
  payments: PaymentRecord[];

  // Currency
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInNGN: number) => string;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning', title?: string) => void;
  dismissToast: (id: string) => void;

  // Live Concierge Chat Widget
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;

  // UI helpers
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileDrawerOpen: boolean;
  setIsMobileDrawerOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Bukola Oguntayo',
    phone: '08061281910',
    street: 'Plot 14B, Admiralty Way, Lekki Phase 1',
    address: 'Plot 14B, Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos State',
    postalCode: '105102',
    country: 'Nigeria',
    label: 'Home',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Bukola Oguntayo (Office)',
    phone: '08061281910',
    street: 'Suite 302, Victoria Mall Plaza, Victoria Island',
    address: 'Suite 302, Victoria Mall Plaza, Victoria Island',
    city: 'Lagos',
    state: 'Lagos State',
    postalCode: '101241',
    country: 'Nigeria',
    label: 'Office',
    isDefault: false
  }
];

// Attach initial reviews to initial products
const HYDRATED_PRODUCTS: Product[] = INITIAL_PRODUCTS.map((prod) => ({
  ...prod,
  reviews: INITIAL_REVIEWS[prod.id] || [
    {
      id: `rev-${prod.id}-1`,
      productId: prod.id,
      author: 'Verified Patron',
      rating: Math.min(5, Math.floor(prod.rating)),
      date: '2026-08-25',
      comment: `The finish and presentation of ${prod.name} is top tier. Beautiful packaging and swift delivery.`,
      verifiedPurchase: true
    }
  ]
}));

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BEK-20260920-0001',
    userId: 'usr-1',
    customerName: 'Bukola Oguntayo',
    customerEmail: 'bukolaoguntayo3@gmail.com',
    customerPhone: '08061281910',
    date: '2026-09-20',
    createdAt: '2026-09-20T14:20:00Z',
    items: [
      {
        id: 'ord-item-1',
        product: HYDRATED_PRODUCTS[0], // Gold Cuban chain
        quantity: 1,
        selectedVariant: '20 Inches (50cm)'
      }
    ],
    subtotal: 850000,
    discount: 0,
    deliveryFee: 3500,
    shippingFee: 3500,
    total: 853500,
    status: 'Delivered',
    orderStatus: 'Delivered',
    paymentStatus: 'Successful',
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'Debit Card (Paystack/Flutterwave)',
    trackingNumber: 'GIG-NG-892410-LAG',
    estimatedDelivery: 'September 21, 2026 (Delivered)'
  },
  {
    id: 'ord-1002',
    orderNumber: 'BEK-20260922-0002',
    userId: 'usr-1',
    customerName: 'Bukola Oguntayo',
    customerEmail: 'bukolaoguntayo3@gmail.com',
    customerPhone: '08061281910',
    date: '2026-09-22',
    createdAt: '2026-09-22T09:15:00Z',
    items: [
      {
        id: 'ord-item-2',
        product: HYDRATED_PRODUCTS[3], // Velour Up & Down set
        quantity: 1,
        selectedVariant: 'Medium (M)'
      },
      {
        id: 'ord-item-3',
        product: HYDRATED_PRODUCTS[5], // Marine collagen
        quantity: 2
      }
    ],
    subtotal: 111000,
    discount: 11100,
    discountAmount: 11100,
    appliedCoupon: 'BECKKY10',
    deliveryFee: 0,
    shippingFee: 0,
    total: 99900,
    status: 'Processing',
    orderStatus: 'Processing',
    paymentStatus: 'Successful',
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryAddress: INITIAL_ADDRESSES[0],
    deliveryInstructions: 'Kindly call before arrival. Gate code is 409.',
    paymentMethod: 'Instant Bank Transfer',
    trackingNumber: 'DHL-EX-551982-NG',
    estimatedDelivery: 'Tomorrow by 2:00 PM'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Business Settings
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem('beckky_business_settings');
      return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_SETTINGS;
    } catch {
      return DEFAULT_BUSINESS_SETTINGS;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((p) => p && typeof p === 'object' && p.id && p.name)
            .map((p, idx) => ({
              ...p,
              image: p.image || HYDRATED_PRODUCTS[idx]?.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
              images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'],
              category: p.category || "Men's Wear",
              details: Array.isArray(p.details) ? p.details : [],
              stockCount: typeof p.stockCount === 'number' ? p.stockCount : (p.stock || 10),
              stock: typeof p.stock === 'number' ? p.stock : (p.stockCount || 10),
              inStock: p.inStock ?? true,
              active: p.active ?? true,
              price: typeof p.price === 'number' ? p.price : 10000
            }));
        }
      }
      return HYDRATED_PRODUCTS;
    } catch {
      return HYDRATED_PRODUCTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((c) => c && typeof c === 'object' && c.name)
            .map((c, idx) => ({
              ...c,
              image: c.image || CATEGORIES_DATA[idx]?.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
              active: c.active ?? true
            }));
        }
      }
      return CATEGORIES_DATA;
    } catch {
      return CATEGORIES_DATA;
    }
  });

  // Recently Viewed Product IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_recently_viewed');
      return saved ? JSON.parse(saved) : ['prod-gold-1', 'prod-unisex-1'];
    } catch {
      return ['prod-gold-1', 'prod-unisex-1'];
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed
            .filter((item) => item && typeof item === 'object')
            .map((item) => {
              const product = item.product || HYDRATED_PRODUCTS.find((p) => p.id === (item.productId || item.id)) || HYDRATED_PRODUCTS[0];
              return {
                ...item,
                product: {
                  ...product,
                  image: product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
                },
                quantity: item.quantity > 0 ? item.quantity : 1
              };
            });
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('beckky_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_wishlist');
      return saved ? JSON.parse(saved) : ['prod-gold-2', 'prod-bags-1'];
    } catch {
      return ['prod-gold-2', 'prod-bags-1'];
    }
  });

  // Registered Users list
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_users');
      return saved ? JSON.parse(saved) : [
        {
          id: 'usr-1',
          fullName: 'Bukola Oguntayo',
          email: 'bukolaoguntayo3@gmail.com',
          phone: '08061281910',
          role: 'customer',
          createdAt: '2026-06-15',
          loyaltyPoints: 675,
          referralCode: 'BECKKY-VIP-BUKOLA'
        },
        {
          id: 'usr-admin',
          fullName: 'BECKKYENTERPRISE Admin',
          email: 'admin@beckkyenterprise.com',
          phone: '08061281910',
          role: 'admin',
          createdAt: '2026-01-01',
          loyaltyPoints: 9999,
          referralCode: 'BECKKY-ADMIN'
        }
      ];
    } catch {
      return [];
    }
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('beckky_current_user');
      return saved
        ? JSON.parse(saved)
        : {
            id: 'usr-1',
            fullName: 'Bukola Oguntayo',
            email: 'bukolaoguntayo3@gmail.com',
            phone: '08061281910',
            role: 'customer',
            createdAt: '2026-06-15',
            loyaltyPoints: 675,
            referralCode: 'BECKKY-VIP-BUKOLA'
          };
    } catch {
      return null;
    }
  });

  // Loyalty & Referrals
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('beckky_points');
      return saved ? Number(saved) : 675;
    } catch {
      return 675;
    }
  });

  const referralCode = currentUser?.referralCode || 'BECKKY-VIP-BUKOLA';

  // Notification Preferences
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem('beckky_notif_prefs');
      return saved
        ? JSON.parse(saved)
        : {
            orderUpdatesEmail: true,
            orderUpdatesSms: true,
            promotions: true,
            restockAlerts: true
          };
    } catch {
      return {
        orderUpdatesEmail: true,
        orderUpdatesSms: true,
        promotions: true,
        restockAlerts: true
      };
    }
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_addresses');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
            .filter((ord) => ord && typeof ord === 'object' && ord.id)
            .map((ord) => ({
              ...ord,
              items: (ord.items || [])
                .filter((item: any) => item && typeof item === 'object')
                .map((item: any) => {
                  const product =
                    item.product ||
                    HYDRATED_PRODUCTS.find((p) => p.id === (item.productId || item.id)) ||
                    HYDRATED_PRODUCTS[0];
                  return {
                    ...item,
                    product: {
                      ...product,
                      image: product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
                    },
                    quantity: item.quantity > 0 ? item.quantity : 1
                  };
                })
            }));
        }
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Customers (for Admin)
  const [customers, setCustomers] = useState<CustomerSummary[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // Promotions / Coupons (for Admin)
  const [promotions, setPromotions] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_promotions');
      return saved ? JSON.parse(saved) : VALID_COUPONS;
    } catch {
      return VALID_COUPONS;
    }
  });

  // Delivery Zones (for Admin)
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_delivery_zones');
      return saved ? JSON.parse(saved) : INITIAL_DELIVERY_ZONES;
    } catch {
      return INITIAL_DELIVERY_ZONES;
    }
  });

  // Payments log (for Admin)
  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('beckky_payments');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
    } catch {
      return INITIAL_PAYMENTS;
    }
  });

  // Currency (default NGN)
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('beckky_currency');
      return (saved as CurrencyCode) || 'NGN';
    } catch {
      return 'NGN';
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Concierge Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'agent',
      text: 'Hello, welcome to BECKKYENTERPRISE Concierge. How may I assist your luxury selection today?',
      time: 'Just now'
    }
  ]);

  // Search & Navigation drawer
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('beckky_business_settings', JSON.stringify(businessSettings));
  }, [businessSettings]);

  useEffect(() => {
    localStorage.setItem('beckky_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('beckky_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('beckky_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('beckky_applied_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('beckky_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('beckky_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('beckky_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('beckky_points', String(loyaltyPoints));
  }, [loyaltyPoints]);

  useEffect(() => {
    localStorage.setItem('beckky_notif_prefs', JSON.stringify(notificationPreferences));
  }, [notificationPreferences]);

  useEffect(() => {
    localStorage.setItem('beckky_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('beckky_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('beckky_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('beckky_promotions', JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem('beckky_delivery_zones', JSON.stringify(deliveryZones));
  }, [deliveryZones]);

  useEffect(() => {
    localStorage.setItem('beckky_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('beckky_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('beckky_recently_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  // Toast dispatch
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency helper
  const formatPrice = (amountInNGN: number) => formatPriceUtil(amountInNGN, currency);

  // Settings update
  const updateBusinessSettings = (settings: Partial<BusinessSettings>) => {
    setBusinessSettings((prev) => ({ ...prev, ...settings }));
    showToast('Store business settings updated successfully.', 'success');
  };

  // Recently Viewed tracker
  const recordProductView = (productId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, variant?: string): boolean => {
    // Inventory check
    if (!product.inStock || product.stockCount <= 0) {
      showToast(`Sorry, "${product.name}" is currently out of stock.`, 'warning');
      return false;
    }

    const itemKey = `${product.id}-${variant || 'default'}`;
    const existing = cart.find((item) => item.id === itemKey);
    const existingQty = existing ? existing.quantity : 0;

    if (existingQty + quantity > product.stockCount) {
      showToast(
        `Only ${product.stockCount} available in stock. Cannot add ${existingQty + quantity}.`,
        'warning'
      );
      return false;
    }

    setCart((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          quantity,
          selectedVariant: variant
        }
      ];
    });

    showToast(`Added "${product.name}" to your cart.`, 'success');
    return true;
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const item = cart.find((i) => i.id === itemId);
    if (item && newQuantity > item.product.stockCount) {
      showToast(`Only ${item.product.stockCount} units available in inventory.`, 'warning');
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  const cartTotal = cart.reduce((sum, item) => {
    if (!item?.product) return sum;
    const activePrice = item.product.discountPrice ?? item.product.price ?? 0;
    return sum + activePrice * (item.quantity || 1);
  }, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.minSpend && cartTotal < appliedCoupon.minSpend) {
      // Below min spend
      discountAmount = 0;
    } else if (appliedCoupon.discountType === 'percentage' || appliedCoupon.type === 'percentage') {
      const calculated = (cartTotal * appliedCoupon.value) / 100;
      discountAmount = appliedCoupon.maximumDiscount
        ? Math.min(calculated, appliedCoupon.maximumDiscount)
        : calculated;
    } else {
      discountAmount = Math.min(appliedCoupon.value, cartTotal);
    }
  }

  const finalCartTotal = Math.max(0, cartTotal - discountAmount);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const found = promotions.find((c) => c.code.toUpperCase() === clean && c.active);

    if (!found) {
      showToast('Invalid or expired promotional code.', 'error');
      return false;
    }

    if (found.minSpend && cartTotal < found.minSpend) {
      showToast(
        `Coupon requires a minimum order of ${formatPrice(found.minSpend)}.`,
        'warning'
      );
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Promo code "${found.code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Item removed from your wishlist.', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Item saved to your wishlist.', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth Operations
  const login = (email: string, password?: string, rememberMe: boolean = true): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const found = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return false;
    }

    if (!password || password.trim().length < 6) {
      return false;
    }

    setCurrentUser(found);
    if (rememberMe) {
      localStorage.setItem('beckky_current_user', JSON.stringify(found));
      sessionStorage.removeItem('beckky_current_user');
    } else {
      sessionStorage.setItem('beckky_current_user', JSON.stringify(found));
      localStorage.removeItem('beckky_current_user');
    }

    showToast('Welcome back! You have signed in successfully.', 'success');
    return true;
  };

  const signUp = (fullName: string, email: string, phone: string, _password?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      showToast('An account with this email already exists. Please sign in.', 'error');
      return false;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      loyaltyPoints: 150, // Welcome bonus points
      referralCode: `BECKKY-VIP-${fullName.split(' ')[0].toUpperCase()}`
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    // Also register into customer directory
    const newCustomerSummary: CustomerSummary = {
      id: `cust-${Date.now()}`,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone || '',
      country: 'Nigeria',
      totalOrders: 0,
      totalSpend: 0,
      loyaltyTier: 'Gold VIP',
      lastOrderDate: 'New Member',
      status: 'Active',
      createdAt: newUser.createdAt || '2026-09-23',
      rewardPoints: 150
    };
    setCustomers((prev) => [newCustomerSummary, ...prev]);

    showToast('Your account has been created successfully. Welcome to BECKKYENTERPRISE!', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out safely.', 'info');
  };

  const updateProfile = (fullName: string, email: string, phone?: string) => {
    if (!currentUser) return;
    const updated: User = {
      ...currentUser,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim()
    };
    setCurrentUser(updated);
    setRegisteredUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Your profile has been updated successfully.', 'success');
  };

  const toggleAdminRole = () => {
    if (!currentUser) {
      login('admin@beckkyenterprise.com');
      return;
    }
    const newRole = currentUser.role === 'admin' ? 'customer' : 'admin';
    const updated: User = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    setRegisteredUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast(`Switched mode to: ${newRole.toUpperCase()}.`, 'info');
  };

  const requestPasswordReset = (email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const user = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      showToast('If an account exists with that email, a password reset link has been dispatched.', 'info');
      return true;
    }
    showToast(`Password reset code dispatched to ${cleanEmail}. Check your inbox.`, 'success');
    return true;
  };

  const resetPassword = (_emailOrToken: string, newPassword: string): boolean => {
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return false;
    }
    showToast('Your password has been reset successfully. Please sign in.', 'success');
    return true;
  };

  // Notification Preferences
  const updateNotificationPreferences = (prefs: Partial<NotificationPreferences>) => {
    setNotificationPreferences((prev) => ({ ...prev, ...prefs }));
    showToast('Notification settings saved.', 'success');
  };

  // Addresses
  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addressData,
      address: addressData.address || addressData.street,
      id: `addr-${Date.now()}`
    };
    setAddresses((prev) => {
      if (newAddr.isDefault) {
        return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
      }
      return [...prev, newAddr];
    });
    showToast('New delivery address saved.', 'success');
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) {
          return { ...addr, ...updates, address: updates.address || updates.street || addr.street };
        }
        if (updates.isDefault) {
          return { ...addr, isDefault: false };
        }
        return addr;
      })
    );
    showToast('Delivery address updated.', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
    showToast('Default delivery address updated.', 'success');
  };

  // Order Management (format: BEK-20260923-0001)
  const createOrder = (
    deliveryAddress: Address,
    paymentMethod: string,
    deliveryFee: number,
    deliveryInstructions?: string
  ): Order => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, ''); // 20260923
    const orderIndex = String(orders.length + 1).padStart(4, '0');
    const orderNumber = `BEK-${dateStr}-${orderIndex}`;
    const trackingCode = `GIG-NG-${Math.floor(100000 + Math.random() * 900000)}`;

    const totalPaid = finalCartTotal + deliveryFee;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: currentUser?.id || 'guest',
      customerName: deliveryAddress.fullName || currentUser?.fullName || 'Valued Patron',
      customerEmail: currentUser?.email || 'customer@beckkyenterprise.com',
      customerPhone: deliveryAddress.phone || currentUser?.phone || '08061281910',
      date: now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      createdAt: now.toISOString(),
      items: cart
        .filter((item) => item?.product)
        .map((item) => ({
          ...item,
          product: {
            ...item.product,
            image: item.product.image || '/src/assets/images/hero_luxury_showcase_1790167560610.jpg'
          }
        })),
      subtotal: cartTotal,
      discount: discountAmount,
      discountAmount,
      appliedCoupon: appliedCoupon?.code,
      deliveryFee,
      shippingFee: deliveryFee,
      total: totalPaid,
      status: 'Confirmed',
      orderStatus: 'Confirmed',
      paymentStatus: 'Successful',
      shippingAddress: deliveryAddress,
      deliveryAddress,
      deliveryInstructions,
      paymentMethod,
      trackingNumber: trackingCode,
      estimatedDelivery: '24–48 Hours (Insured Courier Dispatch)'
    };

    // 1. Automatically update inventory (Section 24)
    // Reduce stock counts and mark out-of-stock when stock reaches 0
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const matchingCartItems = cart.filter((item) => item.product.id === p.id);
        if (matchingCartItems.length === 0) return p;

        const totalDeduction = matchingCartItems.reduce((sum, item) => sum + item.quantity, 0);
        const newStock = Math.max(0, p.stockCount - totalDeduction);

        return {
          ...p,
          stockCount: newStock,
          stock: newStock,
          inStock: newStock > 0
        };
      })
    );

    // 2. Record transaction in payment ledger
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      transactionReference: `TRX-${orderNumber}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      amount: totalPaid,
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      status: 'Successful',
      provider: paymentMethod.includes('Bank') ? 'Direct Bank Transfer' : 'Secure Card Gateway',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPayments((prev) => [newPayment, ...prev]);

    // 3. Save order
    setOrders((prev) => [newOrder, ...prev]);

    // 4. Award points: 1 point per ₦1,000 spent
    const earnedPoints = Math.max(10, Math.round(totalPaid / 1000));
    setLoyaltyPoints((prev) => prev + earnedPoints);

    // 5. Update customer summary spend
    setCustomers((prev) =>
      prev.map((c) => {
        if (currentUser && c.email.toLowerCase() === currentUser.email.toLowerCase()) {
          return {
            ...c,
            totalOrders: c.totalOrders + 1,
            totalSpend: c.totalSpend + totalPaid,
            lastOrderDate: newOrder.date,
            rewardPoints: (c.rewardPoints || 0) + earnedPoints
          };
        }
        return c;
      })
    );

    clearCart();
    showToast(`Order #${newOrder.orderNumber} confirmed! +${earnedPoints} reward points earned.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              orderStatus: newStatus
            }
          : o
      )
    );
    showToast(`Order status updated to "${newStatus}".`, 'info');
  };

  const cancelOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    if (target.status === 'Delivered' || target.status === 'Shipped') {
      showToast('Cannot cancel an order that has already shipped or been delivered.', 'error');
      return;
    }

    // Restore stock
    setProducts((prev) =>
      prev.map((p) => {
        const item = target.items?.find((i) => i?.product?.id === p.id);
        if (!item) return p;
        const restored = p.stockCount + item.quantity;
        return {
          ...p,
          stockCount: restored,
          stock: restored,
          inStock: true
        };
      })
    );

    updateOrderStatus(orderId, 'Cancelled');
    showToast(`Order #${target.orderNumber} cancelled. Inventory returned.`, 'info');
  };

  const requestOrderRefund = (orderId: string, reason: string, comments: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            refundRequest: {
              id: `ref-${Date.now()}`,
              orderId: ord.id,
              orderNumber: ord.orderNumber,
              reason,
              comments,
              status: 'Pending Review',
              date: new Date().toLocaleDateString('en-GB')
            }
          };
        }
        return ord;
      })
    );
    showToast('Return & refund request submitted. A concierge will review within 24 hours.', 'success');
  };

  const resolveRefundRequest = (orderId: string, decision: 'Approved' | 'Declined') => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId && ord.refundRequest) {
          return {
            ...ord,
            refundRequest: {
              ...ord.refundRequest,
              status: decision === 'Approved' ? 'Approved' : 'Rejected'
            }
          };
        }
        return ord;
      })
    );
    showToast(`Refund request for order marked as ${decision}.`, 'info');
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      stock: productData.stockCount,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          author: 'BECKKY Quality Control',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Inspected for hallmark, fabric purity, and seal integrity.',
          verifiedPurchase: true
        }
      ]
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added to inventory.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = updates.stockCount !== undefined ? updates.stockCount : p.stockCount;
          return {
            ...p,
            ...updates,
            stockCount: newStock,
            stock: newStock,
            inStock: newStock > 0
          };
        }
        return p;
      })
    );
    showToast('Product specifications updated.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const addReview = (productId: string, rating: number, comment: string, authorName: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author: authorName.trim() || 'Verified Patron',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      verifiedPurchase: true
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentReviews = p.reviews || [];
          const updatedReviews = [newReview, ...currentReviews];
          const avgRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            rating: avgRating,
            reviewCount: updatedReviews.length,
            reviews: updatedReviews
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your review has been published.', 'success');
  };

  const bulkImportProducts = (csvText: string) => {
    const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      return { added: 0, errors: ['CSV file appears empty or lacks rows.'] };
    }
    let addedCount = 0;
    const errors: string[] = [];
    const newItems: Product[] = [];

    // Header row skip
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p) => p.trim());
      if (parts.length >= 3) {
        const name = parts[0];
        const category = (parts[1] as any) || 'Gold & Jewelry';
        const price = parseFloat(parts[2]);
        const stockCount = parts[3] ? parseInt(parts[3], 10) : 10;
        const sku = parts[4] || `BEK-IMP-${Date.now().toString().slice(-4)}`;

        if (name && !isNaN(price)) {
          newItems.push({
            id: `prod-bulk-${Date.now()}-${i}`,
            sku,
            name,
            category,
            price,
            stockCount,
            stock: stockCount,
            lowStockThreshold: 3,
            description: `Imported piece: ${name}`,
            details: ['Certified authentic goods', 'Imported via CSV batch'],
            image: '/src/assets/images/hero_luxury_showcase_1790167560610.jpg',
            images: ['/src/assets/images/hero_luxury_showcase_1790167560610.jpg'],
            inStock: stockCount > 0,
            isFeatured: false,
            isNewArrival: true,
            active: true,
            rating: 5.0,
            reviewCount: 0,
            createdAt: new Date().toISOString().split('T')[0]
          });
          addedCount++;
        } else {
          errors.push(`Row ${i + 1}: Invalid name or price`);
        }
      }
    }

    if (newItems.length > 0) {
      setProducts((prev) => [...newItems, ...prev]);
      showToast(`Successfully imported ${newItems.length} products.`, 'success');
    }
    return { added: addedCount, errors };
  };

  // Category Management
  const addCategory = (categoryData: Omit<Category, 'id' | 'itemCount'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      itemCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" created.`, 'success');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated.', 'success');
  };

  const deleteCategory = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return { success: false, message: 'Category not found.' };

    const hasProducts = products.some((p) => p.category === cat.name);
    if (hasProducts) {
      showToast(`Cannot delete "${cat.name}" because it still contains active products. Reassign them first.`, 'warning');
      return { success: false, message: 'Category contains active products.' };
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(`Category "${cat.name}" removed.`, 'info');
    return { success: true };
  };

  // Promotions Management
  const addPromotion = (promoData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newPromo: Coupon = {
      ...promoData,
      id: `promo-${Date.now()}`,
      usageCount: 0
    };
    setPromotions((prev) => [newPromo, ...prev]);
    showToast(`Promo code "${newPromo.code}" activated.`, 'success');
  };

  const updatePromotion = (id: string, updates: Partial<Coupon>) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Promotion settings saved.', 'success');
  };

  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
    showToast('Promotion removed.', 'info');
  };

  // Delivery Zones Management
  const updateDeliveryZone = (id: string, updates: Partial<DeliveryZone>) => {
    setDeliveryZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, ...updates } : z))
    );
    showToast('Delivery zone rates updated.', 'success');
  };

  // Concierge Chat Message send
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let reply = "Thank you for reaching out to BECKKYENTERPRISE. A luxury concierge will assist you immediately. You can also reach our direct WhatsApp hotline on 08061281910.";
      const lower = text.toLowerCase();
      if (lower.includes('gold') || lower.includes('chain') || lower.includes('purity')) {
        reply = "All BECKKYENTERPRISE gold jewelry is certified solid gold with official 750 / 585 hallmarks and laboratory assay documentation.";
      } else if (lower.includes('delivery') || lower.includes('ship') || lower.includes('lagos')) {
        reply = "We offer same-day and 24-hour delivery within Lagos, plus nationwide express courier across all Nigerian states in 2–4 business days.";
      } else if (lower.includes('whatsapp')) {
        reply = "You can chat with our founder Bukola directly on WhatsApp at 08061281910. We'd be glad to send real-time photos and sizing guidance.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `chat-${Date.now()}-reply`,
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <ShopContext.Provider
      value={{
        businessSettings,
        updateBusinessSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        bulkImportProducts,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        recentlyViewedIds,
        recordProductView,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalCartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        registeredUsers,
        login,
        signUp,
        logout,
        updateProfile,
        toggleAdminRole,
        loyaltyPoints,
        referralCode,
        requestPasswordReset,
        resetPassword,
        notificationPreferences,
        updateNotificationPreferences,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        requestOrderRefund,
        resolveRefundRequest,
        customers,
        promotions,
        addPromotion,
        updatePromotion,
        deletePromotion,
        deliveryZones,
        updateDeliveryZone,
        payments,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        showToast,
        dismissToast,
        isChatOpen,
        setIsChatOpen,
        chatMessages,
        sendChatMessage,
        searchQuery,
        setSearchQuery,
        isMobileDrawerOpen,
        setIsMobileDrawerOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
