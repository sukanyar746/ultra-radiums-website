/* ===== Core Database Types ===== */

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  preferred_language: 'en' | 'kn';
  location_lat: number | null;
  location_lng: number | null;
  role: 'user' | 'admin' | 'moderator';
  reward_points: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  name_kn: string;
  slug: string;
  icon: string;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  name_kn: string;
  brand: string;
  category_id: string;
  category?: Category;
  unit: string;
  base_quantity: number;
  image_url: string;
  barcode: string | null;
  description: string | null;
  description_kn: string | null;
  is_popular: boolean;
  created_at: string;
}

export type StoreType = 'kirana' | 'reliance' | 'dmart' | 'more' | 'spar' | 'metro' | 'bigbasket' | 'other';

export interface Store {
  id: string;
  name: string;
  type: StoreType;
  address: string;
  area: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  total_ratings: number;
  image_url: string | null;
  logo_url: string | null;
  phone: string | null;
  hours: string;
  is_active: boolean;
  distance?: number; // computed client-side
}

export interface StorePrice {
  id: string;
  store_id: string;
  product_id: string;
  price: number;
  mrp: number;
  discount_pct: number;
  in_stock: boolean;
  updated_at: string;
  store?: Store;
  product?: Product;
}

export interface PriceHistory {
  id: string;
  store_id: string;
  product_id: string;
  price: number;
  recorded_at: string;
  store?: Store;
}

export interface Offer {
  id: string;
  store_id: string;
  store?: Store;
  title: string;
  title_kn: string | null;
  description: string;
  description_kn: string | null;
  discount_type: 'percentage' | 'flat' | 'bogo' | 'combo';
  discount_value: number;
  min_purchase: number | null;
  valid_from: string;
  valid_until: string;
  image_url: string | null;
  coupon_code: string | null;
  category_id: string | null;
  is_featured: boolean;
}

export interface ShoppingList {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  items?: ShoppingListItem[];
}

export interface ShoppingListItem {
  id: string;
  list_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  checked: boolean;
  best_price?: number;
  best_store?: string;
}

export interface PriceAlert {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  target_price: number;
  alert_type: 'email' | 'sms' | 'push';
  is_active: boolean;
  triggered_at: string | null;
  created_at: string;
}

export interface CommunitySubmission {
  id: string;
  user_id: string;
  store_id: string;
  product_id: string;
  submitted_price: number;
  photo_url: string | null;
  status: 'pending' | 'verified' | 'rejected';
  verified_by: string | null;
  reward_points: number;
  notes: string | null;
  created_at: string;
  store?: Store;
  product?: Product;
  profile?: Profile;
}

export interface UserReward {
  id: string;
  user_id: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  total_submissions: number;
  verified_submissions: number;
}

/* ===== UI & App Types ===== */

export interface SearchFilters {
  query: string;
  category: string | null;
  priceMin: number | null;
  priceMax: number | null;
  brand: string | null;
  store: string | null;
  storeType: StoreType | null;
  sortBy: 'price_asc' | 'price_desc' | 'name' | 'popularity' | 'distance';
  inStock: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
  area?: string;
}

export interface PricePrediction {
  product_id: string;
  predicted_price: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  predicted_date: string;
}

export interface BasketOptimization {
  total_cost: number;
  savings: number;
  stores: {
    store: Store;
    items: { product: Product; price: number; quantity: number }[];
    subtotal: number;
  }[];
}

export interface AdminStats {
  total_users: number;
  total_products: number;
  total_stores: number;
  total_submissions: number;
  pending_submissions: number;
  active_alerts: number;
  avg_savings: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'kn';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
