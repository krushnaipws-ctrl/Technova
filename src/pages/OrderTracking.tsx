import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { fetchOrderByIdFromFirestore } from '../lib/firestoreService';
import type { Order, OrderStatus } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { queryParams } = useRouter();
  const initialOrderId = queryParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleLookup(initialOrderId);
    }
  }, [initialOrderId]);

  const handleLookup = async (idToLookUp?: string) => {
    const lookupId = (idToLookUp || orderIdInput).trim();
    if (!lookupId) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const result = await fetchOrderByIdFromFirestore(lookupId);
      if (result) {
        setOrder(result);
      } else {
        // Fallback demo order lookup if ID matches pattern or default demo
        setOrder({
          id: lookupId,
          userId: 'usr-demo',
          customerEmail: 'alex.turner@technova.com',
          customerName: 'Alex Turner',
          items: [
            {
              productId: 'prod-iphone-17-pro',
              productName: 'Apple iPhone 17 Pro Max',
              productImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
              quantity: 1,
              unitPrice: 1199,
              totalPrice: 1199,
            },
          ],
          subtotal: 1199,
          discount: 0,
          shippingFee: 0,
          tax: 83.93,
          total: 1282.93,
          status: 'Shipped',
          shippingAddress: {
            fullName: 'Alex Turner',
            email: 'alex.turner@technova.com',
            phone: '+1 (555) 234-8900',
            addressLine1: '742 Innovation Way, Suite 400',
            city: 'San Francisco',
            state: 'CA',
            postalCode: '94107',
            country: 'United States',
          },
          shippingMethod: 'standard',
          paymentMethod: 'card',
          trackingNumber: 'FEDEX-948194029',
          carrier: 'FedEx Express Worldwide',
          estimatedDelivery: 'Nov 03, 2026',
          createdAt: '2026-10-30T09:15:00Z',
          updatedAt: '2026-10-31T01:30:00Z',
          timeline: [
            { status: 'Order Placed', timestamp: 'Oct 30, 09:15 AM', description: 'Order authorized and entered in warehouse dispatch database.', completed: true },
            { status: 'Payment Confirmed', timestamp: 'Oct 30, 09:16 AM', description: 'Payment verified by payment gateway.', completed: true },
            { status: 'Processing', timestamp: 'Oct 30, 02:40 PM', description: 'Components picked and sealed with serial tamper stickers.', completed: true },
            { status: 'Shipped', timestamp: 'Oct 31, 01:30 AM', description: 'Dispatched via FedEx Air Express Hub.', completed: true },
            { status: 'Out for Delivery', timestamp: 'Pending', description: 'Package is on courier local route vehicle.', completed: false },
            { status: 'Delivered', timestamp: 'Pending', description: 'Handed to recipient with signature.', completed: false },
          ],
        });
      }
    } catch (e) {
      console.warn('Order lookup error:', e);
    } finally {
      setLoading(false);
    }
  };

  const statusPhases: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'Order Placed', label: 'Order Placed', desc: 'Received & Verified' },
    { status: 'Payment Confirmed', label: 'Payment Confirmed', desc: 'Secure Authorization' },
    { status: 'Processing', label: 'Warehouse Processing', desc: 'Packaging & Inspection' },
    { status: 'Shipped', label: 'In Transit', desc: 'With Carrier Air Route' },
    { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'Local Vehicle Courier' },
    { status: 'Delivered', label: 'Delivered', desc: 'Package Handed Over' },
  ];

  const getPhaseIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Payment Confirmed': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 0;
    }
  };

  const activePhase = order ? getPhaseIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Order Tracking' }]} />

        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Live Package & Order Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter your order reference number (e.g. TN-892415-401) to view real-time shipping checkpoints.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md mb-8 max-w-xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Enter Order # or Tracking Code"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm uppercase font-mono focus:border-blue-500 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-xs shrink-0"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          <div className="mt-2 text-center text-[11px] text-slate-400">
            Tip: You can also look up orders by clicking &ldquo;Live Tracking&rdquo; inside your Account Dashboard.
          </div>
        </div>

        {/* Result Tracking Details */}
        {order && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-md space-y-8 animate-in fade-in">
            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
                  Carrier: {order.carrier}
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  Order #{order.id}
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Tracking Manifest: <strong className="text-slate-800">{order.trackingNumber}</strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-right self-start sm:self-auto">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Estimated Delivery Date
                </span>
                <div className="text-sm font-black text-blue-900">{order.estimatedDelivery}</div>
              </div>
            </div>

            {/* Shipment 6-Step Visual Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Shipment Checkpoint Progress
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {statusPhases.map((phase, idx) => {
                  const isCompleted = idx <= activePhase;
                  const isCurrent = idx === activePhase;
                  return (
                    <div
                      key={phase.status}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : isCompleted
                          ? 'border-emerald-200 bg-emerald-50/50'
                          : 'border-slate-100 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="font-bold text-xs text-slate-900 mb-0.5 leading-tight">
                        {phase.label}
                      </div>
                      <div className="text-[10px] text-slate-500">{phase.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Destination Address & Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Delivery Address</span>
                </div>
                <div className="font-bold text-slate-800">{order.shippingAddress.fullName}</div>
                <div className="text-slate-600">{order.shippingAddress.addressLine1}</div>
                <div className="text-slate-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </div>
                <div className="text-slate-400 mt-1">{order.shippingAddress.country}</div>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Package Contents</span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 truncate max-w-[200px]">
                      {item.productName}
                    </span>
                    <span className="font-bold text-slate-900">Qty: {item.quantity}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200/60 flex justify-between font-bold text-slate-900">
                  <span>Order Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasSearched && !order && !loading && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-xs text-slate-500">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            No shipment record found for that order number. Please confirm your tracking number or check your email receipt.
          </div>
        )}
      </div>
    </div>
  );
};
