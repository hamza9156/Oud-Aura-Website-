// ============================================================
// OUD & AURA — TypeScript Interfaces
// ============================================================

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string[];          // e.g. ['men', 'luxury', 'best-sellers']
  gender: 'men' | 'women' | 'unisex';
  description: string;
  price: number;               // PKR original price
  discountPercent: number;     // 0 means no discount
  rating: number;              // 1-5
  reviewCount: number;
  fragranceFamily: string;     // e.g. 'Oriental', 'Floral', etc.
  fragranceNotes: FragranceNotes;
  concentration: 'EDP' | 'EDT' | 'Parfum' | 'EDC';
  sizes: string[];             // e.g. ['30ml','50ml','100ml']
  images: string[];
  isBestSeller: boolean;
  isNewArrival: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface FilterState {
  genders: string[];
  brands: string[];
  priceRange: [number, number];
  fragranceFamilies: string[];
  concentrations: string[];
  minRating: number;
}

export interface SortOption {
  value: string;
  label: string;
}
