import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Mail, Check, Shield } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!consent) {
      addToast('Please agree to receive technology updates and offers.', 'error');
      return;
    }

    setIsSubmitted(true);
    addToast('Welcome to the TECHNOVA Insider Club! Use code WELCOME20 for $20 off.', 'success');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-blue-800/40">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/20 text-blue-400 mb-2 border border-blue-400/30">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Stay Ahead of the Tech Curve.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Get product launches, exclusive offers, benchmark analysis, and VIP early access to flash sales before public release.
            </p>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 max-w-md mx-auto">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You&rsquo;re subscribed! Use promo code <strong>WELCOME20</strong> for $20 off your first order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-slate-900/90 text-white placeholder:text-slate-500 rounded-xl text-xs sm:text-sm border border-slate-700 focus:border-blue-400 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-blue-600/30 shrink-0"
                  >
                    Subscribe Now
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <input
                    type="checkbox"
                    id="consent-checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 border-slate-600 w-3.5 h-3.5 bg-slate-900"
                  />
                  <label htmlFor="consent-checkbox" className="cursor-pointer select-none">
                    I agree to receive promotional emails and technology news. Unsubscribe anytime.
                  </label>
                </div>
              </form>
            )}

            <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>We value your privacy. Zero spam. Unsubscribe with 1-click at any time.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
