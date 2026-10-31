import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types';
import { useToast } from './ToastContext';

interface CompareContextType {
  compareProducts: Product[];
  compareCount: number;
  isCompareOpen: boolean;
  openCompare: () => void;
  closeCompare: () => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  const isInCompare = (productId: string) => compareProducts.some((p) => p.id === productId);

  const toggleCompare = (product: Product) => {
    if (isInCompare(product.id)) {
      setCompareProducts((prev) => prev.filter((p) => p.id !== product.id));
      addToast(`Removed "${product.name}" from comparison`, 'info');
    } else {
      if (compareProducts.length >= 4) {
        addToast('You can compare a maximum of 4 products at once.', 'error');
        return;
      }
      setCompareProducts((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to comparison table`, 'success');
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareProducts([]);
  };

  const openCompare = () => setIsCompareOpen(true);
  const closeCompare = () => setIsCompareOpen(false);

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        compareCount: compareProducts.length,
        isCompareOpen,
        openCompare,
        closeCompare,
        toggleCompare,
        isInCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
