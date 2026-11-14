import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-luxury-black">
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={18} className="text-luxury-gold" />
            <div className="h-px w-6 bg-luxury-gold" />
            <span className="text-luxury-gold text-[9px] tracking-[0.4em] uppercase">Saved</span>
          </div>
          <h1 className="font-serif text-3xl text-luxury-ivory">My Wishlist</h1>
          <p className="text-luxury-ivory/40 text-sm mt-1">{wishlistedProducts.length} fragrance{wishlistedProducts.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={48} className="text-luxury-gold/20 mx-auto mb-5" />
            <h3 className="font-serif text-2xl text-luxury-ivory mb-2">Your Wishlist is Empty</h3>
            <p className="text-luxury-ivory/40 text-sm mb-8">Save your favourite fragrances to find them easily later</p>
            <button onClick={() => navigate('/products')} className="btn-primary">Explore Fragrances</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistedProducts.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewDetails={p => { navigate(`/products/${p.id}`); setQuickViewProduct(null); }}
      />
    </div>
  );
}
