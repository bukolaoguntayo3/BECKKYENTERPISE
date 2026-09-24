export type ProductCategory =
  | 'Gold & Jewelry'
  | "Men's Wear"
  | "Ladies' Tops & Jeans"
  | "Unisex 'Up & Down' Sets"
  | 'Luxury Bags & Shoes'
  | 'Supplements (body glow & anti-aging)';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  categoryId?: string;
  price: number; // in base currency (NGN)
  discountPrice?: number;
  originalPrice?: number;
  description: string;
  details: string[];
  specifications?: Record<string, string>;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  stock: number;
  lowStockThreshold: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;
  active: boolean;
  variants?: string[]; // e.g. sizes, lengths, shades
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: ProductCategory;
  description: string;
  image: string;
  active: boolean;
  itemCount?: number;
}

export interface CartItem {
  id: string; // product id + variant
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Address {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  street: string;
  address?: string; // alias for street
  city: string;
  state: string;
  postalCode: string;
  country: string;
  label: 'Home' | 'Office' | 'Other';
  isDefault?: boolean;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface RefundRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  reason: string;
  comments: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  date: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountAmount?: number;
  appliedCoupon?: string;
  deliveryFee: number;
  shippingFee: number; // alias for deliveryFee
  total: number;
  status: OrderStatus;
  orderStatus: OrderStatus;
  paymentStatus: 'Pending' | 'Successful' | 'Failed' | 'Refunded';
  shippingAddress: Address;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  refundRequest?: RefundRequest;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt?: string;
  loyaltyPoints?: number;
  referralCode?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AED';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Conversion rate from base (NGN = 1.0)
  name: string;
}

export interface NotificationPreferences {
  orderUpdatesEmail: boolean;
  orderUpdatesSms: boolean;
  promotions: boolean;
  restockAlerts: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  discountType: 'percentage' | 'fixed';
  value: number;
  minimumOrder: number;
  minSpend?: number;
  maximumDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  active: boolean;
  description: string;
}

export interface CustomerSummary {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  totalOrders: number;
  totalSpend: number;
  loyaltyTier: 'Gold VIP' | 'Diamond Sovereign' | 'Elite Member';
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  rewardPoints?: number;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  transactionReference: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  status: 'Pending' | 'Successful' | 'Failed' | 'Refunded';
  provider: string;
  createdAt: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  description: string;
  fee: number;
  estimatedTime: string;
  active: boolean;
}

export interface BusinessSettings {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  tiktok: string;
  instagram: string;
  facebook: string;
  address: string;
  businessHours: string;
  currency: CurrencyCode;
  currencySymbol: string;
  taxRate: number;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  expressDeliveryFee: number;
}
