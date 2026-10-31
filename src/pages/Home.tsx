import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { BestSellers } from '../components/home/BestSellers';
import { PromoBanner } from '../components/home/PromoBanner';
import { NewArrivalsCarousel } from '../components/home/NewArrivalsCarousel';
import { DealsSection } from '../components/home/DealsSection';
import { BrandsGrid } from '../components/home/BrandsGrid';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Section A: Hero Banner */}
      <HeroBanner />

      {/* Section B: Shop by Category */}
      <CategoryGrid />

      {/* Section C: Best Sellers */}
      <BestSellers />

      {/* Section D: Promotional Banner */}
      <PromoBanner />

      {/* Section E: New Arrivals Carousel */}
      <NewArrivalsCarousel />

      {/* Section F: Exclusive Flash Deals */}
      <DealsSection />

      {/* Section G: Featured Brands */}
      <BrandsGrid />

      {/* Section H: Why Shop With Us? */}
      <BenefitsSection />

      {/* Section I: Customer Reviews */}
      <CustomerReviews />

      {/* Section J: Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
