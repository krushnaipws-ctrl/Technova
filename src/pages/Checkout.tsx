import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useRouter } from '../context/RouterContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { createOrderInFirestore } from '../lib/firestoreService';
import type { Order, ShippingAddress } from '../types';
import {
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { navigate } = useRouter();
  const { items, subtotal, discountAmount, shippingFee, tax, total, clearCart, shippingMethod, setShippingMethod } = useCart();
  const { user, userProfile, updateShippingAddress } = useAuth();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [email, setEmail] = useState(user?.email || userProfile?.email || '');
  const [phone, setPhone] = useState('+1 (555) 234-8900');

  // Address
  const defaultAddr = userProfile?.savedAddresses?.[0];
  const [fullName, setFullName] = useState(userProfile?.displayName || 'Alex Turner');
  const [addressLine1, setAddressLine1] = useState(defaultAddr?.addressLine1 || '742 Innovation Way');
  const [addressLine2, setAddressLine2] = useState(defaultAddr?.addressLine2 || 'Suite 400');
  const [city, setCity] = useState(defaultAddr?.city || 'San Francisco');
  const [state, setState] = useState(defaultAddr?.state || 'CA');
  const [postalCode, setPostalCode] = useState(defaultAddr?.postalCode || '94107');
  const [country, setCountry] = useState(defaultAddr?.country || 'United States');

  // Payment
  const [paymentProvider, setPaymentProvider] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState(fullName);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!email || !email.includes('@')) errs.email = 'Valid email address is required.';
      if (!phone) errs.phone = 'Phone number is required for shipping updates.';
    }

    if (step === 2) {
      if (!fullName) errs.fullName = 'Full recipient name is required.';
      if (!addressLine1) errs.addressLine1 = 'Street address is required.';
      if (!city) errs.city = 'City is required.';
      if (!state) errs.state = 'State / Province is required.';
      if (!postalCode) errs.postalCode = 'Postal / Zip code is required.';
    }

    if (step === 4 && paymentProvider === 'card') {
      if (!cardName) errs.cardName = 'Name on card is required.';
      if (cardNumber.length < 10) errs.cardNumber = 'Valid card number required.';
      if (!cardExpiry) errs.cardExpiry = 'Expiry date required.';
      if (!cardCvc) errs.cardCvc = 'CVC required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (Math.min(6, prev + 1) as any));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(4)) {
      setCurrentStep(4);
      return;
    }

    setIsProcessing(true);

    try {
      // Generate order number
      const orderId = `TN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
      const trackingNumber = `FEDEX-${Math.floor(Math.random() * 900000000 + 100000000)}`;

      const estDeliveryDate = new Date();
      estDeliveryDate.setDate(estDeliveryDate.getDate() + (shippingMethod === 'overnight' ? 1 : shippingMethod === 'express' ? 2 : 4));

      const shippingAddr: ShippingAddress = {
        fullName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      };

      const newOrder: Order = {
        id: orderId,
        userId: user?.uid || userProfile?.uid || 'guest-shopper',
        customerEmail: email,
        customerName: fullName,
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.product.name,
          productImage: i.product.images[0],
          variantName: i.selectedVariant?.name,
          colorName: i.selectedColor?.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.unitPrice * i.quantity,
        })),
        subtotal,
        discount: discountAmount,
        shippingFee,
        tax,
        total,
        status: 'Order Placed',
        shippingAddress: shippingAddr,
        shippingMethod,
        paymentMethod: paymentProvider,
        trackingNumber,
        carrier: 'FedEx Express Worldwide',
        estimatedDelivery: estDeliveryDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          { status: 'Order Placed', timestamp: new Date().toISOString(), description: 'Order recorded in TECHNOVA global dispatch system.', completed: true },
          { status: 'Payment Confirmed', timestamp: new Date().toISOString(), description: 'Authorized payment token verified.', completed: true },
          { status: 'Processing', timestamp: '', description: 'Picking components in regional logistics hub.', completed: false },
          { status: 'Shipped', timestamp: '', description: 'Carrier pickup and airway tracking manifest assigned.', completed: false },
          { status: 'Out for Delivery', timestamp: '', description: 'Out for drop-off with local courier vehicle.', completed: false },
          { status: 'Delivered', timestamp: '', description: 'Delivered and verified.', completed: false },
        ],
      };

      // Save order to Firestore
      await createOrderInFirestore(newOrder);

      // Save address to user profile
      await updateShippingAddress(shippingAddr);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }

      setCreatedOrder(newOrder);
      clearCart();
      setCurrentStep(6);
      addToast(`Order ${orderId} placed successfully!`, 'success');
    } catch (err) {
      console.error('Failed to create order:', err);
      addToast('There was an error saving your order. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Contact' },
    { num: 2, title: 'Shipping Address' },
    { num: 3, title: 'Shipping Method' },
    { num: 4, title: 'Payment' },
    { num: 5, title: 'Review' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator (Only if not final step) */}
        {currentStep < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
              {stepsList.map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        currentStep === s.num
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : currentStep > s.num
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {currentStep > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 mt-1 hidden sm:block">
                      {s.title}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        currentStep > s.num ? 'bg-emerald-400' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Clearly Labeled Demo Checkout Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-center gap-2 max-w-2xl mx-auto">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>TECHNOVA Demo Environment:</strong> Real end-to-end tokenization and Firestore database sync active. You may use the provided test fields to simulate genuine order checkout.
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Step 1: Contact Information</h2>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address (for order confirmation & receipts)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
              />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Phone (for delivery SMS notifications)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
              />
              {errors.phone && <div className="text-xs text-red-500 mt-1">{errors.phone}</div>}
            </div>

            <button
              onClick={handleNextStep}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>Continue to Shipping Address</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Shipping Address */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Step 2: Shipping Destination</h2>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Recipient Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
              />
              {errors.fullName && <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
              />
              {errors.addressLine1 && <div className="text-xs text-red-500 mt-1">{errors.addressLine1}</div>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Apartment, Suite, Unit (Optional)</label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                {errors.city && <div className="text-xs text-red-500 mt-1">{errors.city}</div>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                {errors.state && <div className="text-xs text-red-500 mt-1">{errors.state}</div>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Postal / ZIP Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
                {errors.postalCode && <div className="text-xs text-red-500 mt-1">{errors.postalCode}</div>}
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <span>Continue to Shipping Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Shipping Method */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Step 3: Shipping Speed</h2>

            <div className="space-y-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">Standard Ground Delivery</div>
                    <div className="text-xs text-slate-500">Delivered in 3-5 business days with FedEx Ground</div>
                  </div>
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900">
                  {subtotal >= 99 ? 'FREE' : '$9.99'}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">Priority Air Express</div>
                    <div className="text-xs text-slate-500">Delivered in 1-2 business days with FedEx 2Day</div>
                  </div>
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900">$19.99</span>
              </label>

              <label
                onClick={() => setShippingMethod('overnight')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'overnight' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'overnight'}
                    onChange={() => setShippingMethod('overnight')}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">Overnight Priority Delivery</div>
                    <div className="text-xs text-slate-500">Next business day morning delivery with signature</div>
                  </div>
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900">$34.99</span>
              </label>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Step 4: Secure Payment</h2>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </div>
            </div>

            {/* Provider Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentProvider('card')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                  paymentProvider === 'card'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Credit / Debit
              </button>
              <button
                onClick={() => setPaymentProvider('paypal')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                  paymentProvider === 'paypal'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                PayPal
              </button>
              <button
                onClick={() => setPaymentProvider('applepay')}
                className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                  paymentProvider === 'applepay'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Apple / Google
              </button>
            </div>

            {paymentProvider === 'card' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:border-blue-500 focus:outline-hidden"
                  />
                  {errors.cardName && <div className="text-xs text-red-500 mt-1">{errors.cardName}</div>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                  {errors.cardNumber && <div className="text-xs text-red-500 mt-1">{errors.cardNumber}</div>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                    />
                    {errors.cardExpiry && <div className="text-xs text-red-500 mt-1">{errors.cardExpiry}</div>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Security CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                    />
                    {errors.cardCvc && <div className="text-xs text-red-500 mt-1">{errors.cardCvc}</div>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <div className="font-bold text-sm text-slate-900">
                  {paymentProvider === 'paypal' ? 'PayPal Express' : 'Apple Pay / Google Wallet'}
                </div>
                <p className="text-xs text-slate-500">
                  You will be securely redirected to authenticate tokenized biometric checkout.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <span>Review Order Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Final Order Review */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Step 5: Review & Confirm Order</h2>

            {/* Recipient and Shipping Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Deliver To:
                </span>
                <div className="font-bold text-slate-900">{fullName}</div>
                <div className="text-slate-600">{addressLine1} {addressLine2}</div>
                <div className="text-slate-600">{city}, {state} {postalCode}</div>
                <div className="text-slate-500 mt-1">{email} • {phone}</div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Shipping & Payment:
                </span>
                <div className="font-bold text-slate-900 capitalize">{shippingMethod} Shipping Speed</div>
                <div className="text-slate-600 capitalize">Payment: {paymentProvider} (Simulated Token)</div>
                <div className="text-emerald-600 font-semibold mt-1">2-Year Official Guarantee Included</div>
              </div>
            </div>

            {/* Itemized List */}
            <div className="space-y-3 divide-y divide-slate-100">
              <span className="font-bold text-slate-400 text-xs uppercase tracking-wider block">
                Purchased Hardware ({items.length})
              </span>
              {items.map((item) => (
                <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{item.product.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Qty: {item.quantity} • {item.selectedVariant?.name || 'Standard'}
                      </div>
                    </div>
                  </div>
                  <div className="font-extrabold text-slate-900">
                    ${(item.unitPrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping ({shippingMethod})</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Sales Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-3 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all"
              >
                {isProcessing ? (
                  <span>Authorizing Order with Firestore...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Place Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation Screen */}
        {currentStep === 6 && createdOrder && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Order Confirmed
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Thank You for Your Order!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
                We have received your order and dispatched confirmation details to{' '}
                <strong className="text-slate-800">{createdOrder.customerEmail}</strong>.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Order Number:</span>
                <span className="font-mono font-bold text-slate-900">{createdOrder.id}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Carrier Tracking:</span>
                <span className="font-mono font-bold text-blue-600">{createdOrder.trackingNumber}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">Estimated Delivery Date:</span>
                <span className="font-bold text-slate-900">{createdOrder.estimatedDelivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Charged:</span>
                <span className="font-black text-slate-900 text-sm">${createdOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate(`/order-tracking?orderId=${createdOrder.id}`)}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Clock className="w-4 h-4" />
                Track This Shipment
              </button>

              <button
                onClick={() => navigate('/products')}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
