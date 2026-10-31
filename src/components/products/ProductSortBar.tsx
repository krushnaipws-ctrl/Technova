import React from 'react';
import type { FilterState } from '../../types';
import { LayoutGrid, List, X } from 'lucide-react';

interface ProductSortBarProps {
  totalCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters?: () => void;
}

export const ProductSortBar: React.FC<ProductSortBarProps> = ({
  totalCount,
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      sortBy: e.target.value as FilterState['sortBy'],
    });
  };

  const removeBrandFilter = (brand: string) => {
    onFilterChange({
      ...filters,
      brands: filters.brands.filter((b) => b !== brand),
    });
  };

  const clearCategory = () => {
    onFilterChange({ ...filters, category: 'all' });
  };

  const clearDeals = () => {
    onFilterChange({ ...filters, onSaleOnly: false });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Count & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-slate-900">
            Showing <strong className="text-blue-600 font-extrabold">{totalCount}</strong> products
          </span>

          {onOpenMobileFilters && (
            <button
              onClick={onOpenMobileFilters}
              className="lg:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Filter Options
            </button>
          )}
        </div>

        {/* Sort & Grid/List switcher */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={handleSortChange}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:border-blue-500 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rated</option>
              <option value="newest">Newest Arrivals</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(filters.brands.length > 0 || (filters.category && filters.category !== 'all') || filters.onSaleOnly || filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 text-[11px]">Active Filters:</span>

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
              &ldquo;{filters.searchQuery}&rdquo;
            </span>
          )}

          {filters.category && filters.category !== 'all' && (
            <button
              onClick={clearCategory}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            >
              <span className="capitalize">{filters.category}</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {filters.onSaleOnly && (
            <button
              onClick={clearDeals}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              <span>On Sale</span>
              <X className="w-3 h-3" />
            </button>
          )}

          {filters.brands.map((brand) => (
            <button
              key={brand}
              onClick={() => removeBrandFilter(brand)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              <span>{brand}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
