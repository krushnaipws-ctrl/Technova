import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, Product, ProductVariant, ProductColor, Coupon } from '../types';
import { VALID_COUPONS } from '../data/coupons';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { syncCartToFirestore } from '../lib/firestoreService';

interface CartContextType {
  items: CartItem[];
  savedForLater: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  tax: number;
  total: number;
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant, color?: ProductColor) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  saveForLater: (itemId: string) => void;
  moveToCartFromSaved: (itemId: string) => void;
  removeSavedItem: (itemId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingMethod: 'standard' | 'express' | 'overnight';
  setShippingMethod: (method: 'standard' | 'express' | 'overnight') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('technova_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('technova_saved_items');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Persist to localStorage and sync to Firestore
  useEffect(() => {
    localStorage.setItem('technova_cart', JSON.stringify(items));
    if (user) {
      syncCartToFirestore(user.uid, items).catch((err) => {
        console.warn('Could not sync cart to Firestore:', err);
      });
    }
  }, [items, user]);

  useEffect(() => {
    localStorage.setItem('technova_saved_items', JSON.stringify(savedForLater));
  }, [savedForLater]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = useCallback(
    (product: Product, quantity = 1, variant?: ProductVariant, color?: ProductColor) => {
      const effectiveVariant = variant || product.variants[0];
      const effectiveColor = color || product.colors[0];
      const unitPrice = product.price + (effectiveVariant ? effectiveVariant.priceModifier : 0);
      const uniqueId = `${product.id}-${effectiveVariant?.id || 'base'}-${effectiveColor?.name || 'def'}`;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((i) => i.id === uniqueId);
        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = updated[existingIndex].quantity + quantity;
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        } else {
          return [
            ...prevItems,
            {
              id: uniqueId,
              productId: product.id,
              product,
              selectedVariant: effectiveVariant,
              selectedColor: effectiveColor,
              quantity,
              unitPrice,
            },
          ];
        }
      });

      addToast(`Added "${product.name}" to cart`, 'success');
      setIsCartOpen(true);
    },
    [addToast]
  );

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.min(10, quantity) } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const saveForLater = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setSavedForLater((prev) => [...prev.filter((i) => i.id !== itemId), item]);
    addToast('Item moved to Save for Later', 'info');
  };

  const moveToCartFromSaved = (itemId: string) => {
    const item = savedForLater.find((i) => i.id === itemId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
    setItems((prev) => [...prev, item]);
    addToast('Item moved back to cart', 'success');
  };

  const removeSavedItem = (itemId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const coupon = VALID_COUPONS.find((c) => c.code === trimmed);

    if (!coupon) {
      return { success: false, message: 'Invalid promotional code.' };
    }

    if (coupon.minSpend && subtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Order subtotal must be at least $${coupon.minSpend} to use this coupon.`,
      };
    }

    setAppliedCoupon(coupon);
    addToast(`Coupon "${coupon.code}" applied successfully!`, 'success');
    return { success: true, message: `Coupon applied: ${coupon.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Computations
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  // Shipping calculation
  let shippingFee = 0;
  if (items.length > 0) {
    if (shippingMethod === 'standard') {
      shippingFee = subtotal >= 99 ? 0 : 9.99;
    } else if (shippingMethod === 'express') {
      shippingFee = 19.99;
    } else if (shippingMethod === 'overnight') {
      shippingFee = 34.99;
    }
  }

  // Tax calculation (estimated 7%)
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount > 0 ? Math.round(taxableAmount * 0.07 * 100) / 100 : 0;
  const total = Math.max(0, taxableAmount + shippingFee + tax);

  return (
    <CartContext.Provider
      value={{
        items,
        savedForLater,
        itemCount,
        subtotal,
        discountAmount,
        shippingFee,
        tax,
        total,
        appliedCoupon,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        saveForLater,
        moveToCartFromSaved,
        removeSavedItem,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
