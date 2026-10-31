import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Truck, RotateCcw, ShieldCheck, Check, Clock } from 'lucide-react';

export const ShippingReturns: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Shipping & Returns' }]} />

        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Shipping & Return Policies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Clear, transparent policies engineered to give you complete peace of mind with every order.
          </p>
        </div>

        {/* Shipping Overview */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Delivery Speeds & Methods</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900">Standard Ground</div>
              <div className="text-blue-600 font-extrabold text-sm">FREE on $99+</div>
              <p className="text-slate-500">3-5 business days. Dispatched via FedEx Ground or UPS.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900">Priority Air Express</div>
              <div className="text-blue-600 font-extrabold text-sm">$19.99 Flat</div>
              <p className="text-slate-500">1-2 business days with air transit guarantee and priority tracking.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900">Overnight White Glove</div>
              <div className="text-blue-600 font-extrabold text-sm">$34.99 Flat</div>
              <p className="text-slate-500">Next morning dispatch with direct adult recipient signature.</p>
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">Order Processing Schedule</h3>
            <p>
              Orders placed before 3:00 PM EST (Monday through Friday) qualify for same-day picking and dispatch. You will receive an automated dispatch email with a direct FedEx or UPS tracking code as soon as your airway bill is generated.
            </p>
          </div>
        </div>

        {/* Returns & Warranty */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">30-Day Hassle-Free Returns</h2>
          </div>

          <div className="text-xs text-slate-600 space-y-4 leading-relaxed">
            <p>
              We want you to be completely satisfied with your hardware. If you are not fully delighted with your purchase, you may initiate a return within 30 days of physical delivery.
            </p>

            <h3 className="font-bold text-slate-900 text-sm">Eligibility Guidelines:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Items must be returned in their original packaging with all included accessories, chargers, manuals, and warranty cards.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Devices must be reset to factory defaults and cleared of any cloud locks (e.g. iCloud Activation Lock, Google FRP).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Pre-paid return labels can be generated directly inside your TECHNOVA Customer Dashboard.</span>
              </li>
            </ul>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Refund Processing Times</h3>
            <p>
              Once your returned package arrives at our central inspection center, our technicians verify the serial number within 48 hours. Refunds are automatically credited back to your original payment method (Credit Card, Apple Pay, PayPal) within 3-5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
