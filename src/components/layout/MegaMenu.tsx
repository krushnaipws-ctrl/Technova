import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import type { ProductCategory } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  category: ProductCategory;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  const { navigate } = useRouter();

  const currentCategory = CATEGORIES.find((c) => c.id === category);
  const categoryProducts = PRODUCTS.filter((p) => p.category === category).slice(0, 3);

  if (!currentCategory) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-b border-slate-200/80 z-40 transition-all duration-200 py-6"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
        {/* Left Column: Category info & Popular links */}
        <div className="col-span-3 border-r border-slate-100 pr-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-blue-50 text-blue-600 rounded">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-lg">{currentCategory.name}</h3>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">{currentCategory.description}</p>

          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Featured Brands
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentCategory.featuredBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    navigate(`/products?category=${category}&brand=${brand}`);
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-md text-slate-700 transition-colors"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              navigate(`/category/${category}`);
              onClose();
            }}
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
          >
            <span>View All {currentCategory.name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Center/Right: Top 3 Featured Products in this Category */}
        <div className="col-span-9">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Top Picks & Bestsellers
            </h4>
            <span className="text-xs text-slate-500">Genuine Manufacturer Stock</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  onClose();
                }}
                className="group cursor-pointer rounded-xl p-3 border border-slate-200/60 hover:border-blue-500/30 hover:shadow-lg transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.discountPercent > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -{product.discountPercent}%
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
                    {product.brand}
                  </div>
                  <h5 className="font-semibold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h5>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-bold text-slate-900 text-sm">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
