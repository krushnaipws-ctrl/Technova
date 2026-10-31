export type ProductCategory =
  | 'smartphones'
  | 'laptops'
  | 'audio'
  | 'gaming'
  | 'smartwatches'
  | 'cameras'
  | 'accessories'
  | 'smart-home'
  | 'deals';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  priceModifier: number; // e.g. 0 for base, +100 for 512GB, etc.
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stockCount: number;
  inStock: boolean;
  sku: string;
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  colors: ProductColor[];
  variants: ProductVariant[];
  images: string[];
  warranty: string;
  shippingInfo: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;
  dealEndsAt?: string;
}

export interface CartItem {
  id: string; // unique item id (productId + variantId + color)
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  selectedColor?: ProductColor;
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
  expiryDate: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  colorName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express' | 'overnight';
  paymentMethod: 'card' | 'paypal' | 'applepay' | 'googlepay';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    completed: boolean;
  }[];
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  helpfulCount: number;
}

export interface FilterState {
  category?: ProductCategory | 'all';
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'best-selling';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  savedAddresses?: ShippingAddress[];
}
