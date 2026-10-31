import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Sparkles, ShieldCheck, Cpu, Award, Globe, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The TECHNOVA Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Technology That Moves You.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with a vision to redefine modern consumer electronics retail, TECHNOVA curates the world’s most advanced hardware, combining unmatched performance with exceptional design.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Pure Innovation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We exclusively stock hardware pushing boundaries: 3nm silicon, stacked sensor optics, and double-gasket acoustics.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Direct Authorization</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every device is factory sealed and serialized with certified brand warranty programs recognized globally.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Customer Centricity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From our rapid same-day dispatch to 30-day hassle-free returns, our engineering support team is with you every step.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Built for Creators, Engineers & Innovators</h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              In a marketplace flooded with complicated listings, counterfeit components, and opaque warranty fine print, TECHNOVA was founded to deliver transparency, authentic products, and swift fulfillment.
            </p>
            <p>
              We operate state-of-the-art fulfillment facilities equipped with automated optical inspection systems that verify tamper-evident packaging before any shipment leaves our distribution docks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Genuine Guaranteed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">48 hrs</div>
              <div className="text-xs text-slate-500 mt-0.5">Average Delivery</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">4.9/5</div>
              <div className="text-xs text-slate-500 mt-0.5">Customer Trust Score</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">24/7</div>
              <div className="text-xs text-slate-500 mt-0.5">Specialist Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
