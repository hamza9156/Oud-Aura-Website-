import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Truck, Shield } from 'lucide-react';
import { products, testimonials, collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types';
import StarRating from '../components/ui/StarRating';

export default function HomePage() {
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const features = [
    { icon: Shield, title: '100% Authentic', desc: 'Every fragrance guaranteed genuine from authorized distributors' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for orders placed before 2 PM' },
    { icon: Award, title: 'Premium Selection', desc: 'Curated collection of world\'s finest luxury perfumes' },
    { icon: Sparkles, title: 'Expert Guidance', desc: 'Free fragrance consultation to find your perfect scent' },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-luxury-black">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-luxury-gold" />
              <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase font-semibold">New Collection 2026</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-luxury-ivory leading-tight mb-6">
              The Art of
              <span className="block gold-gradient-text italic">Luxury Scent</span>
            </h1>
            <p className="text-luxury-ivory/60 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
              Discover Pakistan's most exquisite collection of authentic luxury perfumes. From iconic houses to rare Arabic ouds—your signature awaits.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/products')} className="btn-primary flex items-center gap-2 group">
                Shop the Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/products?category=best-sellers')} className="btn-outline flex items-center gap-2">
                Best Sellers
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10 bg-luxury-gold animate-pulse" />
          <span className="text-luxury-gold text-[9px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-luxury-charcoal border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="w-10 h-10 border border-luxury-gold/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-luxury-gold" />
                </div>
                <div>
                  <div className="text-luxury-ivory text-sm font-semibold">{title}</div>
                  <div className="text-luxury-ivory/40 text-xs mt-0.5 leading-snug hidden sm:block">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY COLLECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="gold-divider max-w-24" />
            <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Discover</span>
            <div className="gold-divider max-w-24" />
          </div>
          <h2 className="section-title">Shop by Collection</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => navigate(`/products?gender=${col.slug}`)}
              className="relative overflow-hidden group cursor-pointer"
              style={{ paddingBottom: '130%' }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-center">
                <span className="text-luxury-gold text-[9px] tracking-widest uppercase mb-1">{col.count} Fragrances</span>
                <h3 className="font-serif text-lg text-luxury-ivory">{col.name}</h3>
                <span className="text-luxury-gold/70 text-[9px] tracking-widest uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </div>
              <div className="absolute inset-0 border border-luxury-border group-hover:border-luxury-gold/40 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-20 bg-luxury-charcoal border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-luxury-gold" />
                <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Top Picks</span>
              </div>
              <h2 className="section-title">Best Selling Perfumes</h2>
            </div>
            <button onClick={() => navigate('/products?category=best-sellers')} className="hidden sm:flex items-center gap-2 text-luxury-gold text-[10px] tracking-widest uppercase hover:text-luxury-gold-light transition-colors">
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <button onClick={() => navigate('/products?category=best-sellers')} className="btn-outline">
              View All Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543364195-bfe6e4932397?w=1200&q=80)' }} />
        <div className="absolute inset-0 bg-luxury-black/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-block border border-luxury-gold/30 px-4 py-1.5 text-luxury-gold text-[9px] tracking-[0.4em] uppercase mb-6">
            Limited Time Offer
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-luxury-ivory mb-4">
            Up to <span className="gold-gradient-text">25% Off</span>
          </h2>
          <p className="text-luxury-ivory/60 max-w-md mx-auto text-base mb-8">
            On selected designer fragrances. Free delivery on all orders above ₨10,000.
          </p>
          <button onClick={() => navigate('/products?discount=true')} className="btn-primary">
            Shop the Sale
          </button>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-luxury-gold" />
              <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Just In</span>
            </div>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <button onClick={() => navigate('/products?category=new-arrivals')} className="hidden sm:flex items-center gap-2 text-luxury-gold text-[10px] tracking-widest uppercase hover:text-luxury-gold-light transition-colors">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newArrivals.map(p => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-luxury-charcoal border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-divider max-w-24" />
              <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Reviews</span>
              <div className="gold-divider max-w-24" />
            </div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="text-luxury-ivory/40 text-sm mt-2">Sample reviews from our valued customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <div key={t.id} className="bg-luxury-dark border border-luxury-border p-6 flex flex-col gap-4">
                <StarRating rating={t.rating} size={14} />
                <p className="text-luxury-ivory/70 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-9 h-9 bg-luxury-gold/20 border border-luxury-border rounded-full flex items-center justify-center text-luxury-gold text-xs font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-luxury-ivory text-sm font-medium">{t.name}</div>
                    <div className="text-luxury-ivory/40 text-xs">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border border-luxury-border p-10 md:p-16 text-center bg-luxury-dark">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="gold-divider max-w-16" />
            <Sparkles size={16} className="text-luxury-gold" />
            <div className="gold-divider max-w-16" />
          </div>
          <h2 className="font-serif text-3xl text-luxury-ivory mb-3">Join the OUD & AURA World</h2>
          <p className="text-luxury-ivory/50 text-sm mb-8 max-w-md mx-auto">
            Subscribe for exclusive launches, early access to sales, fragrance guides, and PKR 500 off your first order.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-luxury-black border border-luxury-border text-luxury-ivory text-sm px-4 py-3 outline-none focus:border-luxury-gold placeholder:text-luxury-ivory/30 transition-colors"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-luxury-ivory/25 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewDetails={p => { navigate(`/products/${p.id}`); setQuickViewProduct(null); }}
      />
    </main>
  );
}
