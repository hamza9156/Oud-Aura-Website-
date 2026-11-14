import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, Grid3X3, LayoutGrid } from 'lucide-react';
import { products, MAX_PRICE } from '../data/products';
import { FilterState, Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import QuickViewModal from '../components/QuickViewModal';

const DEFAULT_FILTERS: FilterState = {
  genders: [],
  brands: [],
  priceRange: [0, MAX_PRICE],
  fragranceFamilies: [],
  concentrations: [],
  minRating: 0,
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'best-selling', label: 'Best Selling' },
];

const PAGE_TITLES: Record<string, string> = {
  men: "Men's Fragrances",
  women: "Women's Fragrances",
  unisex: "Unisex Fragrances",
  'best-sellers': 'Best Sellers',
  'new-arrivals': 'New Arrivals',
  'arabic-oud': 'Arabic & Oud Perfumes',
};

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<4 | 3>(4);
  const [sortOpen, setSortOpen] = useState(false);

  // Sync URL params to filters on mount
  useEffect(() => {
    const gender = searchParams.get('gender');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const discount = searchParams.get('discount');

    const newFilters = { ...DEFAULT_FILTERS };
    if (gender && ['men', 'women', 'unisex'].includes(gender)) {
      newFilters.genders = [gender];
    }
    if (brand) {
      newFilters.brands = [brand];
    }
    setFilters(newFilters);
  }, [searchParams.toString()]);

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const discountParam = searchParams.get('discount') === 'true';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.fragranceFamily.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
      );
    }

    // Category param
    if (categoryParam === 'best-sellers') result = result.filter(p => p.isBestSeller);
    if (categoryParam === 'new-arrivals') result = result.filter(p => p.isNewArrival);
    if (categoryParam === 'arabic-oud') result = result.filter(p => p.category.includes('arabic-oud'));
    if (discountParam) result = result.filter(p => p.discountPercent > 0);

    // Filter: gender
    if (filters.genders.length > 0) {
      result = result.filter(p => filters.genders.includes(p.gender));
    }
    // Filter: brand
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    // Filter: price
    result = result.filter(p => {
      const dp = p.discountPercent > 0 ? Math.round(p.price * (1 - p.discountPercent / 100)) : p.price;
      return dp >= filters.priceRange[0] && dp <= filters.priceRange[1];
    });
    // Filter: fragrance family
    if (filters.fragranceFamilies.length > 0) {
      result = result.filter(p => filters.fragranceFamilies.includes(p.fragranceFamily));
    }
    // Filter: concentration
    if (filters.concentrations.length > 0) {
      result = result.filter(p => filters.concentrations.includes(p.concentration));
    }
    // Filter: rating
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // Sort
    switch (sort) {
      case 'newest':
        result = result.filter(p => p.isNewArrival).concat(result.filter(p => !p.isNewArrival));
        break;
      case 'price-asc':
        result.sort((a, b) => {
          const pa = a.discountPercent > 0 ? Math.round(a.price * (1 - a.discountPercent / 100)) : a.price;
          const pb = b.discountPercent > 0 ? Math.round(b.price * (1 - b.discountPercent / 100)) : b.price;
          return pa - pb;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const pa = a.discountPercent > 0 ? Math.round(a.price * (1 - a.discountPercent / 100)) : a.price;
          const pb = b.discountPercent > 0 ? Math.round(b.price * (1 - b.discountPercent / 100)) : b.price;
          return pb - pa;
        });
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'best-selling':
        result = result.filter(p => p.isBestSeller).concat(result.filter(p => !p.isBestSeller));
        break;
    }

    return result;
  }, [filters, sort, searchQuery, categoryParam, discountParam]);

  const pageTitle = searchQuery
    ? `Results for "${searchQuery}"`
    : categoryParam
      ? PAGE_TITLES[categoryParam] || 'All Fragrances'
      : filters.genders.length === 1
        ? PAGE_TITLES[filters.genders[0]] || 'All Fragrances'
        : 'All Fragrances';

  const clearFilters = () => setFilters(DEFAULT_FILTERS);
  const activeFilterCount = filters.genders.length + filters.brands.length + filters.fragranceFamilies.length + filters.concentrations.length + (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Page Header */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-luxury-gold" />
            <span className="text-luxury-gold text-[9px] tracking-[0.4em] uppercase">OUD & AURA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-luxury-ivory">{pageTitle}</h1>
          <p className="text-luxury-ivory/40 text-sm mt-2">{filteredProducts.length} fragrances found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-luxury-border text-luxury-ivory/60 text-xs tracking-widest uppercase px-4 py-2.5 hover:border-luxury-gold hover:text-luxury-gold transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-luxury-gold text-luxury-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active filter chips */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {filters.genders.map(g => (
                <span key={g} className="flex items-center gap-1.5 border border-luxury-gold/40 text-luxury-gold text-[9px] tracking-wider uppercase px-2.5 py-1">
                  {g}
                  <button onClick={() => setFilters(f => ({ ...f, genders: f.genders.filter(x => x !== g) }))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
              {filters.brands.map(b => (
                <span key={b} className="flex items-center gap-1.5 border border-luxury-gold/40 text-luxury-gold text-[9px] tracking-wider uppercase px-2.5 py-1">
                  {b}
                  <button onClick={() => setFilters(f => ({ ...f, brands: f.brands.filter(x => x !== b) }))}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Grid toggle */}
            <div className="hidden sm:flex items-center border border-luxury-border">
              <button onClick={() => setGridCols(4)} className={`p-2 transition-colors ${gridCols === 4 ? 'bg-luxury-gold text-luxury-black' : 'text-luxury-ivory/40 hover:text-luxury-gold'}`}>
                <Grid3X3 size={14} />
              </button>
              <button onClick={() => setGridCols(3)} className={`p-2 transition-colors ${gridCols === 3 ? 'bg-luxury-gold text-luxury-black' : 'text-luxury-ivory/40 hover:text-luxury-gold'}`}>
                <LayoutGrid size={14} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 border border-luxury-border text-luxury-ivory/60 text-xs tracking-widest uppercase px-4 py-2.5 hover:border-luxury-gold hover:text-luxury-gold transition-colors"
              >
                {SORT_OPTIONS.find(o => o.value === sort)?.label}
                <ChevronDown size={12} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-luxury-dark border border-luxury-border w-52 z-20 shadow-luxury">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-xs tracking-wider uppercase border-b border-luxury-border/50 last:border-0 transition-colors
                        ${sort === opt.value ? 'text-luxury-gold bg-luxury-charcoal' : 'text-luxury-ivory/60 hover:text-luxury-gold hover:bg-luxury-charcoal'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content: Filters + Products */}
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClear={clearFilters}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
            totalResults={filteredProducts.length}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-luxury-gold/20 text-6xl mb-4">✦</div>
                <h3 className="font-serif text-2xl text-luxury-ivory mb-2">No Fragrances Found</h3>
                <p className="text-luxury-ivory/40 text-sm mb-6">Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="btn-outline">Clear All Filters</button>
              </div>
            ) : (
              <div className={`grid gap-4 ${
                gridCols === 4
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewDetails={p => { navigate(`/products/${p.id}`); setQuickViewProduct(null); }}
      />
    </div>
  );
}
