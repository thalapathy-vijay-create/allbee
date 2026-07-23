import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Food = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  calories: number;
  ingredients: string[] | null;
  image_url: string | null;
  gallery: string[] | null;
  is_veg: boolean;
  is_best_seller: boolean;
  is_special: boolean;
  is_available: boolean;
  rating: number;
  prep_time: number;
};

export type Order = {
  id: string;
  user_id: string;
  status: string;
  total: number;
  subtotal: number;
  tax: number;
  delivery_charge: number;
  discount: number;
  order_type: string;
  address: { label?: string; full_address?: string; city?: string; phone?: string } | null;
  payment_method: string | null;
  payment_status: string;
  coupon_code: string | null;
  notes: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  food_id: string | null;
  name: string;
  quantity: number;
  price: number;
  image_url: string | null;
};

export type Reservation = {
  id: string;
  user_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  table_type: string;
  special_request: string | null;
  status: string;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string | null;
  food_id: string | null;
  name: string;
  rating: number;
  comment: string | null;
  photo_url: string | null;
  is_approved: boolean;
  created_at: string;
};

export type Coupon = {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string;
  author: string;
  is_published: boolean;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  image_url: string;
  category: string;
  sort_order: number;
};

export type EventItem = {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  image_url: string | null;
  price: number;
  capacity: number;
  event_date: string | null;
  is_active: boolean;
};

export type Career = {
  id: string;
  title: string;
  department: string | null;
  description: string | null;
  requirements: string | null;
  location: string;
  job_type: string;
  salary_range: string | null;
  is_active: boolean;
};

export type Address = {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  city: string | null;
  state: string | null;
  pincode: string | null;
  phone: string | null;
  is_default: boolean;
};

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  loyalty_tier: string;
  loyalty_points: number;
  preferred_language: string;
  is_admin: boolean;
};
