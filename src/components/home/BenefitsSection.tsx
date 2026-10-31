import React from 'react';
import { Truck, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            Customer First
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Shop With TECHNOVA?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We are committed to delivering an exceptional shopping experience with transparent warranties and unmatched service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/60 hover:border-blue-500/30 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Free Shipping on Eligible Orders
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complimentary expedited delivery on all orders over $99. Real-time carrier tracking provided with every package.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/60 hover:border-blue-500/30 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Secure End-to-End Payments
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Protected by 256-bit SSL encryption. We accept Apple Pay, Google Pay, PayPal, and major credit cards with zero raw storage.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/60 hover:border-blue-500/30 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              100% Genuine Certified
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct factory sealed stock from authorized manufacturers. Every serial number is registered for full global warranty coverage.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/60 hover:border-blue-500/30 transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-500/5">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Easy 30-Day Returns
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Changed your mind? Return eligible products within 30 days of delivery with pre-paid return shipping labels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
