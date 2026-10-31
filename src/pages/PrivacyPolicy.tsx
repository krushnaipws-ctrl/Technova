import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            TECHNOVA Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Effective Date: October 2026 • Last Reviewed: 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you purchase electronics, create an account with Firebase Authentication, or subscribe to TECHNOVA VIP drops, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: name, email address, phone number.</li>
              <li>Shipping & delivery destination addresses.</li>
              <li>Order transaction history, serialized item numbers, and warranty records.</li>
              <li>Device telemetry and browsing preferences to optimize search autocomplete.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. How We Protect Your Data</h2>
            <p>
              We enforce Zero-Trust access controls and ABAC firestore security rules. Payment card numbers are processed via secure payment providers using cryptographic tokenization; TECHNOVA servers never receive or store raw credit card details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Third-Party Disclosures</h2>
            <p>
              We do not sell, rent, or trade your personal information. We share minimal necessary information with certified logistics partners (such as FedEx or UPS) solely to fulfill shipping and deliver tracking notifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Your Data Rights (GDPR & CCPA)</h2>
            <p>
              You have the right to access, export, or request the deletion of your account information at any time. To exercise these rights, please contact our Data Protection Officer at privacy@technova.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
