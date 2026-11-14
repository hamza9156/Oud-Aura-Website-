import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('oudaura-wishlist');
    if (saved) {
      try { setWishlist(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oudaura-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: string) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const isWishlisted = (id: string) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
