import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { state, dispatch, removeFromCart, updateQuantity, totalItems, discountedTotal } = useCart();
  const navigate = useNavigate();

  const getDiscountedPrice = (price: number, pct: number) =>
    pct > 0 ? Math.round(price * (1 - pct / 100)) : price;

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-luxury-black/70 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-luxury-dark border-l border-luxury-border z-50 flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-luxury-border">
          <div>
            <h2 className="font-serif text-xl text-luxury-ivory">Your Bag</h2>
            <p className="text-luxury-gold/60 text-xs mt-0.5">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
            className="text-luxury-ivory/50 hover:text-luxury-gold transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-luxury-gold/20" />
              <div>
                <p className="text-luxury-ivory/60 text-sm">Your bag is empty</p>
                <p className="text-luxury-ivory/30 text-xs mt-1">Discover our luxury fragrances</p>
              </div>
              <button
                onClick={() => { dispatch({ type: 'CLOSE_CART' }); navigate('/products'); }}
                className="btn-primary text-xs"
              >
                Shop Now
              </button>
            </div>
          ) : (
            state.items.map((item: CartItem, idx: number) => {
              const discountedPrice = getDiscountedPrice(item.product.price, item.product.discountPercent);
              return (
                <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4 pb-5 border-b border-luxury-border last:border-0">
                  <div className="w-20 h-24 bg-luxury-charcoal flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="text-luxury-gold/60 text-[9px] tracking-widest uppercase">{item.product.brand}</div>
                    <div className="text-luxury-ivory text-sm font-medium leading-tight">{item.product.name}</div>
                    <div className="text-luxury-ivory/40 text-xs">{item.size} · {item.product.concentration}</div>
                    <div className="text-luxury-gold text-sm font-semibold">₨ {discountedPrice.toLocaleString()}</div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-luxury-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-7 text-center text-luxury-ivory text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-black transition-colors text-luxury-ivory"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-luxury-ivory/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-luxury-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-luxury-ivory/60 text-sm">Subtotal</span>
              <span className="text-luxury-gold font-semibold">₨ {discountedTotal.toLocaleString()}</span>
            </div>
            <p className="text-luxury-ivory/30 text-xs">Shipping and taxes calculated at checkout</p>
            <button className="w-full btn-primary text-center py-3.5">
              Proceed to Checkout
            </button>
            <button
              onClick={() => { dispatch({ type: 'CLOSE_CART' }); navigate('/products'); }}
              className="w-full btn-outline text-center py-3"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
