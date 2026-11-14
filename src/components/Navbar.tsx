import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { Product } from '../types';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Perfumes', to: '/products' },
  { label: 'Men', to: '/products?gender=men' },
  { label: 'Women', to: '/products?gender=women' },
  { label: 'Unisex', to: '/products?gender=unisex' },
  { label: 'Best Sellers', to: '/products?category=best-sellers' },
  { label: 'New Arrivals', to: '/products?category=new-arrivals' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { dispatch, totalItems } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      const results = products.filter((p: Product) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.fragranceFamily.toLowerCase().includes(q) ||
        p.gender.toLowerCase().includes(q)
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-luxury-gold text-luxury-black text-center text-[11px] tracking-widest uppercase font-semibold py-2 px-4">
        ✦ Free Delivery on Orders Over ₨10,000 · 100% Authentic Fragrances · Secure Checkout ✦
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-luxury-black/95 backdrop-blur-md border-b border-luxury-border' : 'bg-luxury-black border-b border-luxury-border/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center leading-none">
              <span className="font-cinzel text-luxury-gold text-lg font-bold tracking-[0.2em]">OUD</span>
              <span className="text-luxury-ivory/30 text-[8px] tracking-[0.4em] uppercase">& AURA</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link key={link.to} to={link.to} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-luxury-ivory/60 hover:text-luxury-gold transition-colors p-2"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {searchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-luxury-dark border border-luxury-border shadow-luxury z-50">
                    <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-luxury-border">
                      <Search size={14} className="text-luxury-gold/50 ml-3" />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search perfumes, brands..."
                        className="flex-1 bg-transparent text-luxury-ivory text-sm px-3 py-3 outline-none placeholder:text-luxury-ivory/30"
                      />
                    </form>
                    {searchResults.length > 0 && (
                      <div>
                        {searchResults.map(product => (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-luxury-charcoal transition-colors border-b border-luxury-border/50 last:border-0"
                          >
                            <img src={product.images[0]} alt={product.name} className="w-10 h-12 object-cover" />
                            <div>
                              <div className="text-luxury-gold/60 text-[9px] tracking-wider uppercase">{product.brand}</div>
                              <div className="text-luxury-ivory text-xs">{product.name}</div>
                              <div className="text-luxury-gold text-xs font-semibold mt-0.5">
                                ₨ {product.discountPercent > 0 ? Math.round(product.price * (1 - product.discountPercent / 100)).toLocaleString() : product.price.toLocaleString()}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={`/products?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="block text-center text-luxury-gold text-[10px] tracking-widest uppercase py-3 hover:bg-luxury-charcoal transition-colors"
                        >
                          View All Results
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative text-luxury-ivory/60 hover:text-luxury-gold transition-colors p-2" aria-label="Wishlist">
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-luxury-gold text-luxury-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => dispatch({ type: 'OPEN_CART' })}
                className="relative text-luxury-ivory/60 hover:text-luxury-gold transition-colors p-2"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-luxury-gold text-luxury-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-luxury-ivory/60 hover:text-luxury-gold transition-colors p-2"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-luxury-dark border-t border-luxury-border">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-luxury-ivory/70 hover:text-luxury-gold hover:bg-luxury-charcoal border-b border-luxury-border/50 text-xs tracking-widest uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
