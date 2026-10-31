import React, { useState } from 'react';
import type { Product, ProductVariant, ProductColor } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  ArrowRight,
  Check,
} from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.price + (selectedVariant ? selectedVariant.priceModifier : 0);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200/60 mb-4 shadow-inner">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-blue-600 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Config */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-blue-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-slate-400 font-mono">SKU: {selectedVariant?.sku || product.sku}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 leading-tight mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current text-amber-500' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl font-black text-slate-900">
                ${currentPrice.toLocaleString()}
              </span>
              {product.originalPrice > currentPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Color: <strong className="text-slate-900">{selectedColor.name}</strong>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor.name === c.name ? 'border-blue-600 scale-110 shadow-sm' : 'border-slate-300'
                      }`}
                      title={c.name}
                    >
                      <span className="w-full h-full rounded-full block" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Configuration / Storage:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedVariant.id === v.id
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold">{v.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {v.priceModifier > 0 ? `+$${v.priceModifier}` : 'Standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-200 text-slate-600 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold text-slate-900 text-xs min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="px-3 py-1.5 hover:bg-slate-200 text-slate-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-slate-200 text-slate-600 hover:text-red-500 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate(`/product/${product.id}`);
              }}
              className="w-full text-center py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 group"
            >
              <span>View Full Technical Specifications & Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
