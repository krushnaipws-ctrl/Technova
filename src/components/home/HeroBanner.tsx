import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

interface Slide {
  badge: string;
  headline: string;
  subheadline: string;
  tagline: string;
  image: string;
  accentColor: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  specsHighlight: string[];
}

const HERO_SLIDES: Slide[] = [
  {
    badge: 'FLAGSHIP INNOVATION 2026',
    headline: 'Upgrade Your World.',
    subheadline: 'A19 Pro Silicon • Titanium Ceramic Shield • 48MP Quad-Prism Zoom',
    tagline: 'Discover the latest technology, exceptional performance, and products designed for your everyday life.',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1400&q=85',
    accentColor: 'from-blue-600 to-indigo-600',
    primaryCtaText: 'Shop iPhone 17 Pro',
    primaryCtaLink: '/product/prod-iphone-17-pro',
    secondaryCtaText: 'Explore New Arrivals',
    secondaryCtaLink: '/products',
    specsHighlight: ['6.9" ProMotion OLED', 'All-Day 33h Battery', 'Next-Gen Neural Engine'],
  },
  {
    badge: 'PRO WORKSTATION COMPUTING',
    headline: 'Supreme Power. Zero Limits.',
    subheadline: 'Apple M4 Max • 16-Core CPU • 40-Core GPU • Thunderbolt 5',
    tagline: 'Unleash extreme 8K ProRes workflows, 3D simulations, and local multimodal LLM generation anywhere you go.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=85',
    accentColor: 'from-slate-900 to-blue-900',
    primaryCtaText: 'Shop MacBook Pro M4',
    primaryCtaLink: '/product/prod-macbook-pro-16',
    secondaryCtaText: 'View All Laptops',
    secondaryCtaLink: '/category/laptops',
    specsHighlight: ['Liquid Retina XDR', 'Up to 128GB Unified RAM', 'Up to 24h Battery'],
  },
  {
    badge: 'STUDIO ACOUSTIC MASTERY',
    headline: 'Silence The Noise. Hear Everything.',
    subheadline: 'Dual Processor QN2 • 40-Hour Hi-Res LDAC Playback • Carbon Fiber Drivers',
    tagline: 'Step into uncompromising acoustic fidelity calibrated for studio producers, global travelers, and pure sound lovers.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85',
    accentColor: 'from-blue-900 to-cyan-900',
    primaryCtaText: 'Shop Sony WH-1000XM6',
    primaryCtaLink: '/product/prod-sony-wh1000xm6',
    secondaryCtaText: 'Explore Audio Gear',
    secondaryCtaLink: '/category/audio',
    specsHighlight: ['Industry-Leading ANC', 'Lossless Wireless LDAC', 'Multipoint Bluetooth 5.4'],
  },
];

export const HeroBanner: React.FC = () => {
  const { navigate } = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-12 lg:py-20 border-b border-slate-900">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold tracking-wider uppercase animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {slide.headline}
            </h1>

            {/* Subheadline Specs */}
            <div className="text-sm sm:text-base font-semibold text-blue-300 font-mono tracking-wide">
              {slide.subheadline}
            </div>

            {/* Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              {slide.tagline}
            </p>

            {/* Key Spec highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              {slide.specsHighlight.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-xs font-medium text-slate-300"
                >
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={() => navigate(slide.primaryCtaLink)}
                className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{slide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate(slide.secondaryCtaLink)}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-xl border border-slate-800 transition-all hover:border-slate-700"
              >
                {slide.secondaryCtaText}
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>2-Year Manufacturer Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span>Free Next-Day Air Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Frame */}
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-sm">TECHNOVA Certified Grade</div>
                      <div className="text-slate-400 text-[11px]">Factory sealed with authentic serial tracking</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg text-xs">
                      Ready to Ship
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
