import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { navigate } = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 99;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Your Cart ({itemCount})</h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-blue-50/70 p-3 border-b border-blue-100 text-xs">
          <div className="flex justify-between items-center mb-1 text-slate-700 font-medium">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-blue-600">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Express Shipping</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Unlocked FREE Express Shipping!
              </span>
            )}
            <span className="font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1">Your cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Discover flagship smartphones, high-performance laptops, and audio gear built for you.
              </p>
              <button
                onClick={() => {
                  navigate('/products');
                  closeCart();
                }}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium text-xs rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 group">
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5
                      onClick={() => {
                        navigate(`/product/${item.product.id}`);
                        closeCart();
                      }}
                      className="font-semibold text-xs text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                    >
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 p-0.5 transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.selectedVariant?.name && <span>{item.selectedVariant.name}</span>}
                    {item.selectedColor?.name && <span> • {item.selectedColor.name}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-semibold text-slate-900 min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-bold text-slate-900 text-xs">
                      ${(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with subtotal and checkout buttons */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 text-sm">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Shipping</span>
                <span className="text-slate-700">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$9.99'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Taxes and discounts calculated at checkout.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  navigate('/cart');
                  closeCart();
                }}
                className="py-2.5 px-3 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs rounded-xl bg-white transition-colors"
              >
                View Full Cart
              </button>

              <button
                onClick={() => {
                  navigate('/checkout');
                  closeCart();
                }}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
