import React from 'react';
import type { FilterState, ProductCategory } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/products';
import { Star, RotateCcw, Check } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onChange, onClear }) => {
  const handleCategoryChange = (cat: ProductCategory | 'all') => {
    onChange({ ...filters, category: cat });
  };

  const handleBrandToggle = (brand: string) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands });
  };

  const handleMinPrice = (val: number) => {
    onChange({ ...filters, minPrice: val });
  };

  const handleMaxPrice = (val: number) => {
    onChange({ ...filters, maxPrice: val });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-extrabold text-slate-900 text-sm">Filters</h3>
        <button
          onClick={onClear}
          className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Department
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === 'all' || !filters.category
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Departments</span>
            {(filters.category === 'all' || !filters.category) && <Check className="w-3.5 h-3.5" />}
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Price Range ($)
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <label className="text-[10px] text-slate-400 block mb-0.5">Min ($)</label>
            <input
              type="number"
              min={0}
              max={5000}
              value={filters.minPrice}
              onChange={(e) => handleMinPrice(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>
          <span className="text-slate-300 self-end pb-2">—</span>
          <div className="flex-1">
            <label className="text-[10px] text-slate-400 block mb-0.5">Max ($)</label>
            <input
              type="number"
              min={0}
              max={5000}
              value={filters.maxPrice}
              onChange={(e) => handleMaxPrice(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => handleMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Brands
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const isChecked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-3.5 h-3.5"
                />
                <span className={isChecked ? 'font-bold text-blue-700' : ''}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Minimum Rating
        </h4>
        <div className="space-y-1">
          {[4.8, 4.5, 4.0].map((star) => {
            const isSelected = filters.minRating === star;
            return (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200' : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-slate-900">{star} & Up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-2 border-t border-slate-100 space-y-2.5">
        <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
          <span className="text-red-600 font-semibold">Special Deals & Discounts</span>
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => onChange({ ...filters, onSaleOnly: e.target.checked })}
            className="rounded text-red-600 focus:ring-red-500 border-slate-300 w-4 h-4"
          />
        </label>
      </div>
    </div>
  );
};
