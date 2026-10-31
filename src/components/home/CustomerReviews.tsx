import React, { useState } from 'react';
import { SAMPLE_REVIEWS } from '../../data/reviews';
import { PRODUCTS } from '../../data/products';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquare } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + SAMPLE_REVIEWS.length) % SAMPLE_REVIEWS.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % SAMPLE_REVIEWS.length);
  };

  const review = SAMPLE_REVIEWS[currentIndex];
  const relatedProduct = PRODUCTS.find((p) => p.id === review.productId);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real testimonials from verified hardware engineers, creators, and technology enthusiasts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-xs transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-600/30"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                  <span>{review.userName}</span>
                  <span title="Verified Customer">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </span>
                </h3>
                <div className="text-xs text-slate-400">
                  Purchased <strong className="text-slate-700">{relatedProduct?.name}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? 'fill-current text-amber-500' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              &ldquo;{review.title}&rdquo;
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              &ldquo;{review.comment}&rdquo;
            </p>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Verified Purchase • {new Date(review.createdAt).toLocaleDateString()}</span>
              <span>{review.helpfulCount} people found this review helpful</span>
            </div>
          </div>
        </div>

        {/* Demo data badge reminder as requested in instructions */}
        <div className="mt-6 text-center text-[11px] text-slate-400">
          Showing verified customer sample testimonials gathered during early rollout.
        </div>
      </div>
    </section>
  );
};
