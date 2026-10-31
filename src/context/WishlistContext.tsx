import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { syncWishlistToFirestore } from '../lib/firestoreService';
import { PRODUCTS } from '../data/products';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('technova_wishlist');
      return stored ? JSON.parse(stored) : ['prod-sony-wh1000xm6', 'prod-apple-watch-ultra-2'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('technova_wishlist', JSON.stringify(wishlistIds));
    if (user) {
      syncWishlistToFirestore(user.uid, wishlistIds).catch((err) => {
        console.warn('Could not sync wishlist to Firestore:', err);
      });
    }
  }, [wishlistIds, user]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const productName = product ? product.name : 'Product';

    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      addToast(`Removed "${productName}" from wishlist`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      addToast(`Saved "${productName}" to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    addToast('Removed from wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
