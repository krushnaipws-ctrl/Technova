import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'orders' | 'shipping' | 'warranty' | 'returns' | 'payment';
}

const FAQ_LIST: FAQItem[] = [
  {
    category: 'orders',
    question: 'How do I track my active order?',
    answer: 'Once your order is processed, a live carrier tracking code (e.g. FedEx) is assigned. You can check it anytime by visiting our Order Tracking page or your Customer Dashboard.',
  },
  {
    category: 'orders',
    question: 'Can I modify or cancel an order after placing it?',
    answer: 'Because our warehouse uses automated picking systems, orders move to processing within 30 minutes. If you need to make changes, please contact support immediately or use the cancel option in your account dashboard.',
  },
  {
    category: 'shipping',
    question: 'What are the delivery timescales and thresholds for free shipping?',
    answer: 'All orders over $99 qualify for complimentary Standard Ground Shipping (3-5 business days). For faster arrival, Priority Air (1-2 days) is available for $19.99 and Overnight Delivery for $34.99.',
  },
  {
    category: 'shipping',
    question: 'Do you require a signature upon delivery?',
    answer: 'For your security, high-value electronics exceeding $500 (such as flagship smartphones, workstations, and pro cameras) automatically require an adult signature upon delivery.',
  },
  {
    category: 'warranty',
    question: 'Are TECHNOVA products covered by official manufacturer warranties?',
    answer: 'Yes. TECHNOVA is an authorized direct retail partner for Apple, Samsung, Sony, Dell, Lenovo, and Canon. Every serial number is registered with the manufacturer for official warranty coverage and support.',
  },
  {
    category: 'warranty',
    question: 'How do I initiate a warranty claim for a defective item?',
    answer: 'You can either bring your device to an authorized manufacturer service provider (e.g. Apple Genius Bar, Samsung Service Center) with your TECHNOVA receipt or contact our support team to facilitate factory repairs.',
  },
  {
    category: 'returns',
    question: 'What is the TECHNOVA return policy?',
    answer: 'We offer a 30-day return policy for eligible electronics in their original packaging. Unopened or lightly inspected items can be returned with a pre-paid return label generated from your account dashboard.',
  },
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept Apple Pay, Google Pay, PayPal, and all major credit cards (Visa, Mastercard, American Express). All transactions are encrypted via 256-bit SSL protocols with zero raw credit card storage.',
  },
];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 2]);

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Find immediate answers regarding orders, shipments, warranty registrations, and payment security.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search FAQs (e.g., returns, warranty, delivery)..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'orders', label: 'Orders & Changes' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'warranty', label: 'Warranty & Repairs' },
            { id: 'returns', label: 'Returns & Refunds' },
            { id: 'payment', label: 'Payments & Security' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
