import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';
import type { Product } from '../../types';
import { Flame, ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { navigate } = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Select 8 top-selling and highly rated products
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.rating >= 4.85).slice(0, 8);

  return (
    <section className="py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">
              <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Best Selling Electronics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              The highest-rated flagship devices loved and verified by verified customers.
            </p>
          </div>

          <button
            onClick={() => navigate('/products?sort=best-selling')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group self-start md:self-auto"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 8 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
