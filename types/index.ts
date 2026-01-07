// ===== PSYCHOLOGIST TYPES =====

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

// ===== USER TYPES =====

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// ===== AUTH CONTEXT TYPES =====

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: string[];
  isAuthenticated: boolean;
  updateFavorites: (favorites: string[]) => void;
}

// ===== FILTER TYPES =====

export type FilterValue =
  | 'default'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc';

export interface FilterOption {
  value: FilterValue;
  label: string;
}

// ===== FORM TYPES =====

export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  time: string;
  comment: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
