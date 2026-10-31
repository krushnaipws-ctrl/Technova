import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { navigate } = useRouter();
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p, 1);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Wishlist' }]} />

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              My Saved Wishlist ({savedProducts.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Keep track of items you love. They are saved and synchronized across your authenticated devices.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToCart}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move All to Cart</span>
              </button>

              <button
                onClick={clearWishlist}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Explore our collection of smartphones, pro audio headphones, and gaming gear and tap the heart icon on any device to save it for later.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-2"
            >
              <span>Discover Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
