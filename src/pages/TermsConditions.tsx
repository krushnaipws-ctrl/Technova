import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms & Conditions of Sale
          </h1>
          <p className="text-xs text-slate-400">Effective Date: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing the TECHNOVA website, browsing products, creating an account, or placing orders, you agree to be bound by these Terms and Conditions. If you do not agree with any provision, please discontinue using the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Authenticity & Warranties</h2>
            <p>
              All hardware listed on TECHNOVA is guaranteed authentic, factory-sealed, and sourced from official distribution channels. Product warranties are backed by their respective manufacturers (Apple, Samsung, Sony, Dell, Lenovo, etc.) in accordance with their standard terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Pricing and Order Corrections</h2>
            <p>
              We strive for complete accuracy in product pricing, configurations, and inventory status. In the rare event of a typographical pricing error, TECHNOVA reserves the right to cancel unfulfilled orders and issue immediate full refunds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
            <p>
              All trademarks, product images, and brand identifiers (such as Apple, Samsung, Sony) belong to their respective registered owners and are utilized here strictly for descriptive catalog identification.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
