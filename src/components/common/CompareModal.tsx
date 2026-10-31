import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { X, Trash2, ShoppingCart, Star, Scale, Check } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { compareProducts, isCompareOpen, closeCompare, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { navigate } = useRouter();

  if (!isCompareOpen) return null;

  // Collect all unique specification keys across comparing products
  const allSpecKeys = Array.from(
    new Set(
      compareProducts.flatMap((p) => Object.keys(p.specifications))
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
        onClick={closeCompare}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Side-by-Side Product Comparison ({compareProducts.length}/4)
              </h3>
              <p className="text-xs text-slate-400">
                Compare technical specifications, battery benchmarks, displays, and pricing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-slate-400 hover:text-red-400 font-semibold px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-900 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={closeCompare}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {compareProducts.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 text-base mb-1">No products selected for comparison</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                Click &ldquo;Compare&rdquo; on any product card to analyze specifications, pricing, and ratings side by side.
              </p>
              <button
                onClick={() => {
                  closeCompare();
                  navigate('/products');
                }}
                className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-500 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="p-3 w-44 font-bold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-tl-xl">
                      Product
                    </th>
                    {compareProducts.map((p) => (
                      <th key={p.id} className="p-3 w-64 align-top">
                        <div className="relative group p-3 bg-slate-50 rounded-2xl border border-slate-200/70 flex flex-col justify-between h-full">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="aspect-square w-24 h-24 mx-auto mb-2 rounded-xl overflow-hidden bg-white border border-slate-200/60 p-1">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                          </div>

                          <div className="text-[11px] font-bold text-blue-600 uppercase mb-0.5">{p.brand}</div>
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-2 mb-2">{p.name}</h4>

                          <div className="font-extrabold text-sm text-slate-900 mb-3">
                            ${p.price.toLocaleString()}
                          </div>

                          <button
                            onClick={() => {
                              addToCart(p, 1);
                              closeCompare();
                            }}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add to Cart
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {/* Rating Row */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Rating & Reviews</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{p.rating}</span>
                          <span className="text-slate-400 font-normal">({p.reviewCount} reviews)</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Category */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Category</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 uppercase font-semibold text-[11px] text-slate-700">
                        {p.category}
                      </td>
                    ))}
                  </tr>

                  {/* Stock Status */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Availability</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3">
                        {p.inStock ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> In Stock ({p.stockCount} units)
                          </span>
                        ) : (
                          <span className="text-amber-600 font-medium">Backordered</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Manufacturer Warranty</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-3 text-slate-700">
                        {p.warranty}
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specifications */}
                  {allSpecKeys.map((key) => (
                    <tr key={key}>
                      <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">{key}</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="p-3 text-slate-800">
                          {p.specifications[key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
