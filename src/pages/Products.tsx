import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSortBar } from '../components/products/ProductSortBar';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { FilterState, Product, ProductCategory } from '../types';
import { PackageSearch, X, RotateCcw } from 'lucide-react';

interface ProductsPageProps {
  initialCategory?: ProductCategory;
}

export const Products: React.FC<ProductsPageProps> = ({ initialCategory }) => {
  const { path, queryParams, navigate } = useRouter();

  // Read URL query params
  const searchQ = queryParams.get('q') || '';
  const brandParam = queryParams.get('brand') || '';
  const dealsParam = queryParams.get('deals') === 'true';
  const sortParam = (queryParams.get('sort') as FilterState['sortBy']) || 'featured';

  // Extract category from path e.g. /category/smartphones
  const pathCategoryMatch = path.match(/^\/category\/([a-z-]+)$/);
  const pathCategory = (pathCategoryMatch ? pathCategoryMatch[1] : undefined) as ProductCategory | undefined;

  const effectiveCategory = initialCategory || pathCategory || (queryParams.get('category') as ProductCategory) || 'all';

  const [filters, setFilters] = useState<FilterState>({
    category: effectiveCategory,
    brands: brandParam ? [brandParam] : [],
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: dealsParam,
    searchQuery: searchQ,
    sortBy: sortParam,
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync state if query or path changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: effectiveCategory,
      brands: brandParam ? [brandParam] : prev.brands,
      onSaleOnly: dealsParam || prev.onSaleOnly,
      searchQuery: searchQ,
    }));
    setCurrentPage(1);
  }, [effectiveCategory, brandParam, dealsParam, searchQ]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category check
      if (filters.category && filters.category !== 'all') {
        if (product.category !== filters.category) return false;
      }

      // Search query check
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.shortDescription.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Brand filter
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // In-stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // On-sale / Deals filter
      if (filters.onSaleOnly && product.discountPercent <= 0 && !product.isDeal) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'best-selling':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === filters.category);

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      brands: [],
      minPrice: 0,
      maxPrice: 5000,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      searchQuery: '',
      sortBy: 'featured',
    });
    navigate('/products');
  };

  const breadcrumbs = [
    { label: 'Shop', path: '/products' },
    ...(activeCategoryInfo ? [{ label: activeCategoryInfo.name }] : []),
    ...(filters.searchQuery ? [{ label: `Search: "${filters.searchQuery}"` }] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header / Category Hero */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {activeCategoryInfo
              ? activeCategoryInfo.name
              : filters.searchQuery
              ? `Results for "${filters.searchQuery}"`
              : filters.onSaleOnly
              ? 'Mega Sale & Exclusive Deals'
              : 'All Electronics'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {activeCategoryInfo
              ? activeCategoryInfo.description
              : 'Explore our catalog of certified computers, flagship mobile devices, hi-res acoustics, and gaming systems.'}
          </p>
        </div>

        {/* Layout Grid: Sidebar Filters on Left + Products on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            <ProductFilters
              filters={filters}
              onChange={(f) => setFilters(f)}
              onClear={handleClearFilters}
            />
          </div>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-3">
            <ProductSortBar
              totalCount={filteredProducts.length}
              filters={filters}
              onFilterChange={(f) => setFilters(f)}
              viewMode={viewMode}
              onViewModeChange={(m) => setViewMode(m)}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            />

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <PackageSearch className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No matching electronics found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  Try adjusting your price range, removing specific brand filters, or searching with broader keywords.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-500 transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200/80">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-sm text-slate-900">Filter Hardware</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onChange={(f) => setFilters(f)}
              onClear={handleClearFilters}
            />

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-6 w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
