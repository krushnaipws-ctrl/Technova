import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import { SAMPLE_REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import type { Product, ProductVariant, ProductColor, ProductReview } from '../types';
import {
  Star,
  ShoppingCart,
  Heart,
  Scale,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Maximize2,
  X,
  Plus,
  Minus,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface ProductDetailsProps {
  productId?: string;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId: propId }) => {
  const { path, navigate } = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();
  const { addToast } = useToast();
  const { user, userProfile } = useAuth();

  // Extract ID from prop or /product/:id
  const match = path.match(/^\/product\/([a-zA-Z0-9_-]+)$/);
  const targetId = propId || (match ? match[1] : PRODUCTS[0].id);

  const product = PRODUCTS.find((p) => p.id === targetId) || PRODUCTS[0];

  // Active state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews' | 'shipping' | 'faq'>('desc');

  // Interactive Reviews state
  const [productReviews, setProductReviews] = useState<ProductReview[]>(() => {
    return SAMPLE_REVIEWS.filter((r) => r.productId === product.id);
  });
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Sync state when product ID changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedVariant(product.variants[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setProductReviews(SAMPLE_REVIEWS.filter((r) => r.productId === product.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const unitPrice = product.price + (selectedVariant ? selectedVariant.priceModifier : 0);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedColor);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) {
      addToast('Please provide both a title and review feedback.', 'error');
      return;
    }

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userId: user?.uid || 'guest-user',
      userName: userProfile?.displayName || user?.displayName || 'Anonymous Reviewer',
      userAvatar: userProfile?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: newReviewRating,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
    };

    setProductReviews([newRev, ...productReviews]);
    setNewReviewTitle('');
    setNewReviewComment('');
    setIsSubmittingReview(false);
    addToast('Your review has been submitted and published!', 'success');
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const breadcrumbs = [
    { label: 'Shop', path: '/products' },
    { label: product.category.toUpperCase(), path: `/category/${product.category}` },
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Main 2-Column Product Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery & Zoom */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                onClick={() => setIsZoomModalOpen(true)}
              />

              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white font-black text-xs px-3 py-1 rounded-lg shadow-sm">
                  SAVE {product.discountPercent}%
                </span>
              )}

              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 shadow-md transition-colors"
                title="Full-Screen High-Res Viewer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center sm:justify-start overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-blue-600 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Pills */}
            <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 border-t border-slate-100">
              <div className="p-2 rounded-xl bg-slate-50">
                <Truck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="font-semibold text-slate-800 block">Free Shipping</span>
                <span>On orders &gt; $99</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="font-semibold text-slate-800 block">Genuine Stock</span>
                <span>Official Warranty</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <RotateCcw className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="font-semibold text-slate-800 block">30 Days</span>
                <span>Hassle-free return</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Buy Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-blue-600 uppercase tracking-widest text-xs">
                  {product.brand}
                </span>
                <span className="text-slate-400 font-mono">
                  SKU: {selectedVariant?.sku || product.sku}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current text-amber-500' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                  <span className="text-xs text-slate-400">
                    ({product.reviewCount} customer reviews)
                  </span>
                </div>

                <div>
                  {product.inStock ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      In Stock ({product.stockCount} units)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                      Backordered (Est. dispatch 7 days)
                    </span>
                  )}
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 mb-6 flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ${unitPrice.toLocaleString()}
                </span>
                {product.originalPrice > unitPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs font-bold text-red-600 ml-auto bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                  Save ${(product.originalPrice - unitPrice).toLocaleString()}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    Finishing Color: <span className="text-slate-900 font-extrabold">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor.name === color.name
                            ? 'border-blue-600 scale-110 shadow-sm'
                            : 'border-slate-300'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full block"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Configuration Variants */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    Select Hardware Configuration:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedVariant.id === v.id
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold">{v.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {v.priceModifier > 0 ? `+$${v.priceModifier}` : 'Standard'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-5 py-1.5 font-bold text-slate-900 text-xs min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-2.5 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-medium">Max 10 units per household</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-98 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  Buy Now with 1-Click
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    inWishlist
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product)}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    inCompare
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{inCompare ? 'Comparing Item' : 'Compare Specs'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed Information Below */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mt-8">
          {/* Tab Headers */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'desc' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Description & Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'specs' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Verified Reviews</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {productReviews.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'shipping' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Shipping & Warranty
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'faq' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Product FAQ
            </button>
          </div>

          {/* Tab 1: Description & Key Features */}
          {activeTab === 'desc' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Engineered For Perfection</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                  {product.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Signature Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                    >
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Technical Specifications Table */}
          {activeTab === 'specs' && (
            <div className="animate-in fade-in overflow-x-auto">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Manufacturer Specifications</h3>
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-600 w-1/3 bg-slate-50/50">
                        {key}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Customer Reviews</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{product.rating} out of 5</span>
                    <span className="text-xs text-slate-400">({product.reviewCount} total ratings)</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmittingReview(!isSubmittingReview)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
                >
                  Write a Review
                </button>
              </div>

              {/* Review Submission Form */}
              {isSubmittingReview && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 max-w-2xl"
                >
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Leave Your Verified Rating
                  </h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Rating:
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 text-amber-500 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating ? 'fill-current text-amber-500' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Headline / Title:
                    </label>
                    <input
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Stunning display & lightning-fast compilation"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Detailed Experience:
                    </label>
                    <textarea
                      rows={4}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share details on battery, performance, acoustics, and daily usage..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Post Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmittingReview(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">
                    No customer reviews yet. Be the first to review {product.name}!
                  </div>
                ) : (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-xs text-slate-900">{rev.userName}</div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(rev.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-current text-amber-500' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <h5 className="font-bold text-xs text-slate-900 mb-1">{rev.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Shipping & Warranty */}
          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed animate-in fade-in max-w-3xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Shipping Information</h3>
              <p>
                All orders are dispatched from our regional climate-controlled fulfillment centers. Orders placed before 3:00 PM EST qualify for same-day dispatch.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Standard Courier Delivery (3-5 business days): FREE for orders over $99 ($9.99 for orders under $99).</li>
                <li>Priority Air Express (1-2 business days): $19.99 flat rate.</li>
                <li>Overnight White Glove Delivery: $34.99 with direct adult signature.</li>
              </ul>

              <h4 className="text-sm font-bold text-slate-900 pt-3">Official Manufacturer Warranty</h4>
              <p>
                {product.warranty}. Includes hardware defects, factory component failure, and certified customer support access.
              </p>
            </div>
          )}

          {/* Tab 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3 animate-in fade-in max-w-3xl text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 mb-1">Are all items 100% brand new and factory sealed?</div>
                <div className="text-slate-600">Yes. TECHNOVA never sells grey-market or opened box products without clear classification. All items are brand new in original retail packaging.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900 mb-1">What is the return policy for electronics?</div>
                <div className="text-slate-600">You may return unopened or lightly inspected devices within 30 days of delivery. Pre-paid return labels are generated instantly in your customer account dashboard.</div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Image Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
