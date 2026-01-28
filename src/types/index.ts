// Product Types
export interface ProductSize {
  size: string;
  price: number;
  originalPrice?: number;
  stock: number;
}

export interface FragranceNote {
  name: string;
  description?: string;
}

export interface FragrancePyramid {
  top: FragranceNote[];
  heart: FragranceNote[];
  base: FragranceNote[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  images: string[];
  sizes: ProductSize[];
  fragranceFamily: FragranceFamily;
  gender: Gender;
  occasion: Occasion[];
  fragrancePyramid: FragrancePyramid;
  longevity: number; // 1-10 scale
  sillage: number; // 1-10 scale
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  createdAt: string;
}

export type FragranceFamily = 'floral' | 'woody' | 'oriental' | 'fresh' | 'citrus' | 'oud';
export type Gender = 'men' | 'women' | 'unisex';
export type Occasion = 'day' | 'night' | 'office' | 'party' | 'casual' | 'special';

// Cart Types
export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

// Wishlist Types
export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'card';
export type DeliveryOption = 'standard' | 'express';

export interface OrderItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryOption: DeliveryOption;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimeline[];
}

export interface OrderTimeline {
  status: OrderStatus;
  date: string;
  note?: string;
}

// Filter Types
export interface ProductFilters {
  gender: Gender[];
  fragranceFamily: FragranceFamily[];
  priceRange: [number, number];
  sizes: string[];
  occasion: Occasion[];
  search: string;
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  image?: string;
  productName?: string;
}
