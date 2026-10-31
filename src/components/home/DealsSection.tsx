import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Flame, Clock, ShoppingCart, ArrowRight } from 'lucide-react';

interface DealItem {
  productId: string;
  claimedPercent: number;
  dealEndsAt: string; // ISO date
}

const DEALS_DATA: DealItem[] = [
  { productId: 'prod-anker-prime-240w', claimedPercent: 84, dealEndsAt: '2026-11-04T23:59:59Z' },
  { productId: 'prod-jbl-boombox-3', claimedPercent: 68, dealEndsAt: '2026-11-05T18:00:00Z' },
  { productId: 'prod-pixel-10-pro', claimedPercent: 92, dealEndsAt: '2026-11-03T23:59:59Z' },
  { productId: 'prod-dji-pocket-3', claimedPercent: 74, dealEndsAt: '2026-11-04T12:00:00Z' },
];

export const DealsSection: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();

  // Dynamic countdown timer calculating difference against end date
  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, { hours: number; minutes: number; seconds: number }>>({});

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const updated: Record<string, { hours: number; minutes: number; seconds: number }> = {};
      const now = new Date().getTime();

      DEALS_DATA.forEach((deal) => {
        const target = new Date(deal.dealEndsAt).getTime();
        const diff = Math.max(0, target - now);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updated[deal.productId] = { hours, minutes, seconds };
      });

      setTimeLeftMap(updated);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const dealProducts = DEALS_DATA.map((d) => ({
    ...d,
    product: PRODUCTS.find((p) => p.id === d.productId)!,
  })).filter((d) => d.product);

  const format2 = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest mb-1">
              <Flame className="w-3.5 h-3.5 fill-current text-red-500 animate-bounce" />
              <span>Limited-Time Flash Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Exclusive Flash Promotions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-demand hardware with verified price cuts. Stock refreshes automatically once sold out.
            </p>
          </div>

          <button
            onClick={() => navigate('/products?deals=true')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 group self-start md:self-auto"
          >
            <span>View All Flash Offers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map(({ product, claimedPercent, productId }) => {
            const time = timeLeftMap[productId] || { hours: 24, minutes: 0, seconds: 0 };
            return (
              <div
                key={productId}
                className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-red-500/50 p-4 flex flex-col justify-between group transition-all hover:shadow-xl hover:shadow-red-500/5"
              >
                <div>
                  {/* Image & Discount Badge */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 cursor-pointer mb-3"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded-md shadow-md">
                      SAVE {product.discountPercent}%
                    </span>
                  </div>

                  {/* Real Countdown Timer */}
                  <div className="flex items-center justify-between text-xs font-mono mb-2 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                      <Clock className="w-3 h-3 text-red-400" /> Ends In:
                    </span>
                    <span className="font-bold text-red-400">
                      {format2(time.hours)}h : {format2(time.minutes)}m : {format2(time.seconds)}s
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">
                    {product.brand}
                  </div>
                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="font-bold text-sm text-white line-clamp-1 hover:text-blue-400 cursor-pointer transition-colors mb-2"
                  >
                    {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Claimed Progress Bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Available inventory</span>
                      <span className="text-red-400 font-bold">{claimedPercent}% Claimed</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-red-500 h-1.5 rounded-full"
                        style={{ width: `${claimedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-red-600/20 active:scale-98"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Claim Deal
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
