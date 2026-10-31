import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useToast } from '../../context/ToastContext';
import {
  ArrowUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to TECHNOVA Insider!', 'success');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      {/* Top Value Strip */}
      <div className="max-w-7xl mx-auto px-6 mb-12 pb-12 border-b border-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Free Shipping</div>
              <div className="text-[11px] text-slate-400">On all eligible orders over $99</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">100% Genuine</div>
              <div className="text-[11px] text-slate-400">Direct authorized brand retailer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">30-Day Returns</div>
              <div className="text-[11px] text-slate-400">No hassle money-back guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Expert Support</div>
              <div className="text-[11px] text-slate-400">24/7 technical customer support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-blue-500/20">
                TN
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">TECHNOVA</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              TECHNOVA is the premier technology destination for discerning innovators, developers, creatives, and gamers. We deliver the world&rsquo;s most advanced consumer electronics with certified manufacturer warranties.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
                Stay Ahead of the Tech Curve
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Subscribe for private VIP drops, tech specs analysis, and flash sales.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed! Check your inbox for our 15% VIP welcome voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3 py-2 bg-slate-900 text-white placeholder:text-slate-500 rounded-xl text-xs border border-slate-800 focus:border-blue-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Customer Service Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Customer Service</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-blue-400 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping-returns')} className="hover:text-blue-400 transition-colors">
                  Shipping Information
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping-returns')} className="hover:text-blue-400 transition-colors">
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/order-tracking')} className="hover:text-blue-400 transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop Electronics</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/category/smartphones')} className="hover:text-blue-400 transition-colors">
                  Smartphones & 5G
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/laptops')} className="hover:text-blue-400 transition-colors">
                  Laptops & Workstations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/audio')} className="hover:text-blue-400 transition-colors">
                  Headphones & Hi-Res Audio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/gaming')} className="hover:text-blue-400 transition-colors">
                  Gaming Consoles & Gear
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/smartwatches')} className="hover:text-blue-400 transition-colors">
                  Smartwatches & Wearables
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products?deals=true')} className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                  Exclusive Mega Deals
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-blue-400 transition-colors">
                  About TECHNOVA
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-blue-400 transition-colors">
                  Our Story & Values
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="hover:text-emerald-400 transition-colors">
                  Admin Dashboard
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payment icons, copyright, and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-400">Secure Payments via</span>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-300">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">VISA</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Mastercard</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Apple Pay</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Google Pay</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">PayPal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>&copy; 2026 TECHNOVA Inc. All rights reserved.</div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
