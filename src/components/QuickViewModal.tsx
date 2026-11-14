import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './ui/StarRating';
import Badge from './ui/Badge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewDetails: (product: Product) => void;
}

export default function QuickViewModal({ product, onClose, onViewDetails }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[product.sizes.length - 1]);
      setQuantity(1);
      setImgIdx(0);
    }
  }, [product]);

  useEffect(() => {
    if (product) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const discountedPrice = product.discountPercent > 0
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-luxury-dark border border-luxury-border w-full max-w-3xl max-h-[90vh] overflow-auto animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 text-luxury-ivory/50 hover:text-luxury-gold transition-colors">
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-luxury-charcoal" style={{ minHeight: '340px' }}>
            <img
              src={product.images[imgIdx]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx(i => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-black/60 border border-luxury-border flex items-center justify-center hover:border-luxury-gold transition-colors">
                  <ChevronLeft size={16} className="text-luxury-ivory" />
                </button>
                <button onClick={() => setImgIdx(i => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-black/60 border border-luxury-border flex items-center justify-center hover:border-luxury-gold transition-colors">
                  <ChevronRight size={16} className="text-luxury-ivory" />
                </button>
              </>
            )}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.discountPercent > 0 && <Badge variant="red">-{product.discountPercent}%</Badge>}
              {product.isNewArrival && <Badge variant="gold">New</Badge>}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col gap-3">
            <div>
              <div className="text-luxury-gold/60 text-[10px] tracking-widest uppercase mb-1">{product.brand}</div>
              <h2 className="font-serif text-2xl text-luxury-ivory">{product.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={product.rating} size={13} showCount count={product.reviewCount} />
                <span className="text-luxury-gold/40 text-[10px] uppercase tracking-wider">{product.concentration}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-luxury-gold text-2xl font-semibold">₨ {discountedPrice.toLocaleString()}</span>
              {product.discountPercent > 0 && (
                <span className="text-luxury-ivory/30 text-sm line-through">₨ {product.price.toLocaleString()}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-luxury-ivory/60 text-xs leading-relaxed line-clamp-3">{product.description}</p>

            {/* Fragrance Notes summary */}
            <div className="border border-luxury-border p-3 rounded-sm text-xs">
              <div className="text-luxury-gold/70 text-[9px] tracking-widest uppercase mb-1.5">Top Notes</div>
              <div className="text-luxury-ivory/70">{product.fragranceNotes.top.join(' · ')}</div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="text-luxury-ivory/50 text-[10px] tracking-widest uppercase mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-xs border transition-all duration-200
                      ${selectedSize === size
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-black font-semibold'
                        : 'border-luxury-border text-luxury-ivory/60 hover:border-luxury-gold hover:text-luxury-gold'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="text-luxury-ivory/50 text-[10px] tracking-widest uppercase">Qty</div>
              <div className="flex items-center border border-luxury-border">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory">
                  <Minus size={12} />
                </button>
                <span className="w-8 text-center text-luxury-ivory text-sm">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => { addToCart(product, selectedSize, quantity); onClose(); }}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-200
                  ${wishlisted ? 'border-luxury-gold bg-luxury-gold text-luxury-black' : 'border-luxury-border text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold'}`}
              >
                <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button
              onClick={() => { onViewDetails(product); onClose(); }}
              className="text-luxury-gold text-[10px] tracking-widest uppercase hover:text-luxury-gold-light transition-colors"
            >
              View Full Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
