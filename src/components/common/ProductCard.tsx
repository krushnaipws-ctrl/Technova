import React, { useState } from 'react';
import type { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Scale,
  Check,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const currentPrice = product.price + (activeVariant ? activeVariant.priceModifier : 0);

  const hasMultipleImages = product.images.length > 1;
  const displayImage = isHovered && hasMultipleImages ? product.images[1] : product.images[0];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Card Header & Badges */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.discountPercent > 0 && (
            <span className="bg-red-500 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
              SAVE {product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-600 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
              TOP RATED
            </span>
          )}
        </div>

        {/* Floating Quick Action Icons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all ${
              inWishlist
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/90 text-slate-700 hover:text-red-500 hover:bg-white'
            }`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all opacity-0 group-hover:opacity-100 ${
              inCompare
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white'
            }`}
            title="Compare with other models"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Stock Pill at bottom of image */}
        <div className="absolute bottom-2 left-2 z-10">
          {product.inStock ? (
            <span className="bg-emerald-500/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="bg-slate-800/90 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">
              Backorder
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Quick variants if available */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1 mb-3 overflow-x-auto py-0.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-colors shrink-0 ${
                    selectedVariantIndex === idx
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Short Specs bullet */}
          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-base text-slate-900">
                ${currentPrice.toLocaleString()}
              </span>
              {product.originalPrice > currentPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Free express delivery</div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1, activeVariant)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-1.5 text-xs font-semibold shadow-xs hover:shadow-blue-500/20 active:scale-95 transition-all"
            title="Add to Shopping Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Comparison Checkbox for explicit toggling */}
        <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <label
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 select-none"
          >
            <input
              type="checkbox"
              checked={inCompare}
              onChange={() => {}} // handled by click
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 border-slate-300"
            />
            <span>Compare specs</span>
          </label>

          {inCompare && (
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
