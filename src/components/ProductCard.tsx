import { useState } from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './ui/StarRating';
import Badge from './ui/Badge';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = product.discountPercent > 0
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : product.price;

  const wishlisted = isWishlisted(product.id);
  const defaultSize = product.sizes[product.sizes.length - 1];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultSize, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  return (
    <div
      className="product-card group cursor-pointer flex flex-col"
      onMouseEnter={() => { setIsHovered(true); setImgIdx(1); }}
      onMouseLeave={() => { setIsHovered(false); setImgIdx(0); }}
    >
      {/* Image Area */}
      <div className="relative overflow-hidden bg-luxury-charcoal" style={{ paddingBottom: '125%' }}>
        <img
          src={product.images[imgIdx] || product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <Badge variant="red">-{product.discountPercent}%</Badge>
          )}
          {product.isNewArrival && (
            <Badge variant="gold">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="dark">Best Seller</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300
            ${wishlisted
              ? 'bg-luxury-gold border-luxury-gold text-luxury-black'
              : 'bg-luxury-black/50 border-luxury-border text-luxury-ivory hover:border-luxury-gold hover:text-luxury-gold'}`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-end pb-4 gap-2 transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="overlay-fade absolute inset-0 pointer-events-none" />
          <button
            onClick={handleQuickView}
            className="relative z-10 flex items-center gap-2 bg-luxury-black/80 border border-luxury-border text-luxury-gold text-[10px] tracking-widest uppercase px-4 py-2 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-200"
          >
            <Eye size={12} />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col flex-1 gap-1.5">
        <div className="text-luxury-gold/60 text-[9px] tracking-widest uppercase font-semibold">{product.brand}</div>
        <div className="text-luxury-ivory text-sm font-medium leading-tight line-clamp-2 font-serif">{product.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-luxury-gold/50 text-[9px] tracking-wider uppercase">{product.gender}</span>
          <span className="text-luxury-ivory/20">·</span>
          <span className="text-luxury-gold/50 text-[9px] tracking-wider uppercase">{product.concentration}</span>
        </div>

        <StarRating rating={product.rating} size={12} showCount count={product.reviewCount} />

        {/* Price Row */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-luxury-gold font-semibold text-sm">
            ₨ {discountedPrice.toLocaleString()}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-luxury-ivory/30 text-xs line-through">
              ₨ {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-transparent border border-luxury-border text-luxury-gold text-[10px] tracking-widest uppercase py-2.5 hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300"
        >
          <ShoppingBag size={12} />
          Add to Bag
        </button>
      </div>
    </div>
  );
}
