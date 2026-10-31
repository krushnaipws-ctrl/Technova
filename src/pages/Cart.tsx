import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Trash2,
  Heart,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Check,
  RotateCcw,
  Plus,
  Minus,
} from 'lucide-react';

export const Cart: React.FC = () => {
  const { navigate } = useRouter();
  const {
    items,
    savedForLater,
    itemCount,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    saveForLater,
    moveToCartFromSaved,
    removeSavedItem,
    applyCoupon,
    removeCoupon,
    shippingMethod,
    setShippingMethod,
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleMoveToWishlist = (itemId: string, productId: string) => {
    if (!isInWishlist(productId)) {
      toggleWishlist(productId);
    }
    removeFromCart(itemId);
  };

  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Cart' }]} />

        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
            >
              Clear Entire Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-slate-200/80 shadow-xs mb-16">
            <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Your shopping cart is empty</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8">
              Looks like you haven&rsquo;t added any electronics to your cart yet. Explore our high-performance smartphones, audio systems, and workstation laptops.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs divide-y divide-slate-100">
                {items.map((item) => (
                  <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5">
                    {/* Item Image */}
                    <div
                      onClick={() => navigate(`/product/${item.product.id}`)}
                      className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60 cursor-pointer"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-bold text-blue-600 uppercase">
                              {item.product.brand}
                            </div>
                            <h3
                              onClick={() => navigate(`/product/${item.product.id}`)}
                              className="font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                            >
                              {item.product.name}
                            </h3>
                          </div>

                          <div className="text-right">
                            <div className="font-black text-base text-slate-900">
                              ${(item.unitPrice * item.quantity).toLocaleString()}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[11px] text-slate-400">
                                ${item.unitPrice.toLocaleString()} each
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                          {item.selectedVariant?.name && (
                            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                              {item.selectedVariant.name}
                            </span>
                          )}
                          {item.selectedColor?.name && (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span>{item.selectedColor.name}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-50 text-xs">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 font-bold text-slate-900 min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center gap-3 text-slate-400">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="hover:text-blue-600 transition-colors"
                          >
                            Save for Later
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => handleMoveToWishlist(item.id, item.productId)}
                            className="hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>Move to Wishlist</span>
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hover:text-red-600 transition-colors text-slate-400 hover:text-red-600 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved For Later Section */}
              {savedForLater.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs mt-6">
                  <h3 className="font-extrabold text-base text-slate-900 mb-4">
                    Saved For Later ({savedForLater.length})
                  </h3>
                  <div className="divide-y divide-slate-100">
                    {savedForLater.map((sItem) => (
                      <div key={sItem.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={sItem.product.images[0]}
                            alt=""
                            className="w-14 h-14 rounded-xl object-cover bg-slate-100"
                          />
                          <div>
                            <div className="font-bold text-xs text-slate-900">{sItem.product.name}</div>
                            <div className="text-xs font-bold text-blue-600 mt-0.5">
                              ${sItem.unitPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <button
                            onClick={() => moveToCartFromSaved(sItem.id)}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg transition-colors"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeSavedItem(sItem.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-lg text-slate-900">Order Summary</h3>

                {/* Subtotals & Fees */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">${subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-red-600 font-semibold">
                      <span>Discount Voucher ({appliedCoupon?.code})</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Shipping Method Selector */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="font-bold text-slate-700 block">Shipping Speed:</span>
                    <label className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="text-blue-600"
                        />
                        <span>Standard (3-5 days)</span>
                      </div>
                      <span className="font-bold text-slate-800">
                        {subtotal >= 99 ? 'FREE' : '$9.99'}
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="text-blue-600"
                        />
                        <span>Express Air (1-2 days)</span>
                      </div>
                      <span className="font-bold text-slate-800">$19.99</span>
                    </label>
                  </div>

                  <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-100">
                    <span>Estimated Tax (7%)</span>
                    <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                    <span>Estimated Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-3 border-t border-slate-100">
                  {appliedCoupon ? (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="font-bold text-blue-900">{appliedCoupon.code}</div>
                          <div className="text-[11px] text-blue-600">{appliedCoupon.description}</div>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-500 font-bold hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                        Have a Promo Code?
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Try TECHNOVA10, SAVE50"
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono focus:border-blue-500 focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <div className="text-[11px] text-red-500">{couponError}</div>
                      )}
                    </form>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-98 transition-all"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors text-center"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products Carousel */}
        {recommendedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">
              Recommended Tech Accessories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
