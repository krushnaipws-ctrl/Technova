import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-blue-900/40">
          {/* Subtle Ambient Blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Season Upgrade Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Your Next Upgrade Starts Here.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore powerful devices and accessories at prices worth discovering. Trade in your eligible device for up to $650 instant checkout credit.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-blue-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Price Match Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>0% APR 24-Month Financing</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/products?deals=true')}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Shop Exclusive Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
                  alt="Exclusive Audio & Hardware Deals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Save Up To $400 on Bundles</span>
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded font-bold">LIMITED DROP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
