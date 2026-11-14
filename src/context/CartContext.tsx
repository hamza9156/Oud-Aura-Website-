import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountedTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      const existingIdx = state.items.findIndex(
        i => i.product.id === action.payload.product.id && i.size === action.payload.size
      );
      if (existingIdx >= 0) {
        const updated = [...state.items];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + action.payload.quantity,
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload.product, size: action.payload.size, quantity: action.payload.quantity }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            i => !(i.product.id === action.payload.productId && i.size === action.payload.size)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.productId && i.size === action.payload.size
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    const saved = localStorage.getItem('oudaura-cart');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oudaura-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, quantity } });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (productId: string, size: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });

  const updateQuantity = (productId: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const discountedPrice = (p: Product) =>
    p.discountPercent > 0 ? Math.round(p.price * (1 - p.discountPercent / 100)) : p.price;

  const subtotal = state.items.reduce((sum, i) => sum + discountedPrice(i.product) * i.quantity, 0);
  const discountedTotal = subtotal;

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, discountedTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
