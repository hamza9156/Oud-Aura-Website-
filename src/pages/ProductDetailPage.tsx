import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight, Star, ArrowLeft, Zap } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/ui/StarRating';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[product.sizes.length - 1]);
      setQuantity(1);
      setImgIdx(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl text-luxury-ivory mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">Back to All Perfumes</button>
      </div>
    );
  }

  const discountedPrice = product.discountPercent > 0
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Related products
  const related = products.filter(p =>
    p.id !== product.id &&
    (p.gender === product.gender || p.fragranceFamily === product.fragranceFamily)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Breadcrumb */}
      <div className="bg-luxury-dark border-b border-luxury-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3 text-xs text-luxury-ivory/40 tracking-wider">
          <button onClick={() => navigate('/')} className="hover:text-luxury-gold transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-luxury-gold transition-colors">All Perfumes</button>
          <span>/</span>
          <span className="text-luxury-ivory/70">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-luxury-ivory/40 hover:text-luxury-gold transition-colors text-xs tracking-wider uppercase mb-8">
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative overflow-hidden bg-luxury-charcoal" style={{ paddingBottom: '125%' }}>
              <img
                src={product.images[imgIdx]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-black/70 border border-luxury-border flex items-center justify-center hover:border-luxury-gold transition-colors">
                    <ChevronLeft size={18} className="text-luxury-ivory" />
                  </button>
                  <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-black/70 border border-luxury-border flex items-center justify-center hover:border-luxury-gold transition-colors">
                    <ChevronRight size={18} className="text-luxury-ivory" />
                  </button>
                </>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPercent > 0 && <Badge variant="red">-{product.discountPercent}%</Badge>}
                {product.isNewArrival && <Badge variant="gold">New</Badge>}
                {product.isBestSeller && <Badge variant="dark">Best Seller</Badge>}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-20 h-24 overflow-hidden border-2 transition-colors flex-shrink-0
                    ${i === imgIdx ? 'border-luxury-gold' : 'border-luxury-border hover:border-luxury-gold/50'}`}>
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <div className="text-luxury-gold/60 text-[10px] tracking-[0.4em] uppercase font-semibold mb-2">{product.brand}</div>
              <h1 className="font-serif text-4xl text-luxury-ivory leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <StarRating rating={product.rating} size={15} showCount count={product.reviewCount} />
                <span className="text-luxury-gold/40 text-xs">|</span>
                <span className="text-luxury-ivory/50 text-xs uppercase tracking-wider">{product.concentration}</span>
                <span className="text-luxury-gold/40 text-xs">|</span>
                <span className="text-luxury-ivory/50 text-xs capitalize">{product.gender}</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-y border-luxury-border py-5">
              <div className="flex items-baseline gap-4">
                <span className="text-luxury-gold text-3xl font-semibold">₨ {discountedPrice.toLocaleString()}</span>
                {product.discountPercent > 0 && (
                  <>
                    <span className="text-luxury-ivory/30 text-lg line-through">₨ {product.price.toLocaleString()}</span>
                    <Badge variant="red">Save {product.discountPercent}%</Badge>
                  </>
                )}
              </div>
              <p className="text-luxury-ivory/30 text-xs mt-1.5">Tax included. Free shipping over ₨10,000.</p>
            </div>

            {/* Description */}
            <p className="text-luxury-ivory/60 text-sm leading-relaxed">{product.description}</p>

            {/* Fragrance Notes */}
            <div className="border border-luxury-border p-5 space-y-4">
              <h3 className="text-luxury-gold text-[10px] tracking-widest uppercase font-semibold">Fragrance Notes</h3>
              {(['top', 'middle', 'base'] as const).map(type => (
                <div key={type} className="flex gap-4">
                  <div className="w-12 text-luxury-ivory/30 text-[10px] tracking-widest uppercase pt-0.5">{type}</div>
                  <div className="flex flex-wrap gap-2">
                    {product.fragranceNotes[type].map(note => (
                      <span key={note} className="bg-luxury-charcoal border border-luxury-border text-luxury-ivory/70 text-xs px-2.5 py-1 rounded-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-luxury-ivory/50 text-[10px] tracking-widest uppercase">Select Size</span>
                <span className="text-luxury-gold text-[10px] tracking-wider uppercase">
                  {selectedSize && `₨ ${(discountedPrice).toLocaleString()} · ${selectedSize}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 text-sm border transition-all duration-200 font-medium
                      ${selectedSize === size
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                        : 'border-luxury-border text-luxury-ivory/60 hover:border-luxury-gold hover:text-luxury-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6">
              <span className="text-luxury-ivory/50 text-[10px] tracking-widest uppercase">Quantity</span>
              <div className="flex items-center border border-luxury-border">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory">
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-luxury-ivory">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory">
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-luxury-ivory/30 text-xs">{product.stock} in stock</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-semibold tracking-widest uppercase text-xs transition-all duration-300
                  ${addedToCart
                    ? 'bg-green-600 text-white border border-green-600'
                    : 'btn-primary'}`}
              >
                <ShoppingBag size={16} />
                {addedToCart ? 'Added to Bag!' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-14 flex items-center justify-center border transition-all duration-200
                  ${wishlisted ? 'border-luxury-gold bg-luxury-gold text-luxury-black' : 'border-luxury-border text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold'}`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-4 border border-luxury-gold text-luxury-gold font-semibold tracking-widest uppercase text-xs hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300">
              <Zap size={16} />
              Buy Now
            </button>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {['100% Authentic', 'Free Returns', 'Gift Wrap'].map(g => (
                <div key={g} className="border border-luxury-border/50 p-3 text-center">
                  <div className="text-luxury-gold text-[9px] tracking-widest uppercase">{g}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="gold-divider max-w-16" />
              <h2 className="font-serif text-2xl text-luxury-ivory">You May Also Like</h2>
              <div className="gold-divider max-w-16" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </section>
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
