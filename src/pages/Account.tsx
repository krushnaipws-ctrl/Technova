import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchUserOrdersFromFirestore } from '../lib/firestoreService';
import type { Order, ShippingAddress } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Clock,
  CheckCircle2,
  ExternalLink,
  Plus,
  Shield,
} from 'lucide-react';

export const Account: React.FC = () => {
  const { navigate } = useRouter();
  const { user, userProfile, isAdmin, logout, updateShippingAddress } = useAuth();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Address form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrZip, setNewAddrZip] = useState('');

  useEffect(() => {
    async function loadOrders() {
      setLoadingOrders(true);
      const uid = user?.uid || userProfile?.uid;
      if (uid) {
        try {
          const userOrders = await fetchUserOrdersFromFirestore(uid);
          setOrders(userOrders);
        } catch (e) {
          console.warn('Orders fetch note:', e);
          // Fallback initial sample order for demo experience if no remote orders yet
          setOrders([
            {
              id: 'TN-892415-401',
              userId: uid,
              customerEmail: user?.email || userProfile?.email || 'alex.turner@technova.com',
              customerName: userProfile?.displayName || 'Alex Turner',
              items: [
                {
                  productId: 'prod-sony-wh1000xm6',
                  productName: 'Sony WH-1000XM6 Wireless Noise-Canceling Headphones',
                  productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
                  quantity: 1,
                  unitPrice: 399,
                  totalPrice: 399,
                },
              ],
              subtotal: 399,
              discount: 0,
              shippingFee: 0,
              tax: 27.93,
              total: 426.93,
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
              createdAt: '2026-10-29T10:30:00Z',
              updatedAt: '2026-10-30T14:15:00Z',
              timeline: [
                { status: 'Order Placed', timestamp: '2026-10-29T10:30:00Z', description: 'Order confirmed and verified.', completed: true },
                { status: 'Payment Confirmed', timestamp: '2026-10-29T10:31:00Z', description: 'Payment authorized.', completed: true },
                { status: 'Processing', timestamp: '2026-10-29T15:00:00Z', description: 'Dispatched from logistics center.', completed: true },
                { status: 'Shipped', timestamp: '2026-10-30T09:00:00Z', description: 'In transit with FedEx Air.', completed: true },
                { status: 'Out for Delivery', timestamp: '', description: 'Package is on final delivery vehicle.', completed: false },
                { status: 'Delivered', timestamp: '', description: 'Delivered to customer.', completed: false },
              ],
            },
          ]);
        }
      }
      setLoadingOrders(false);
    }

    loadOrders();
  }, [user, userProfile]);

  const handleSaveNewAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine1 || !newAddrCity || !newAddrState || !newAddrZip) return;

    const newAddress: ShippingAddress = {
      fullName: userProfile?.displayName || 'Customer',
      email: user?.email || userProfile?.email || '',
      phone: '+1 (555) 000-0000',
      addressLine1: newAddrLine1,
      city: newAddrCity,
      state: newAddrState,
      postalCode: newAddrZip,
      country: 'United States',
    };

    await updateShippingAddress(newAddress);
    setIsAddingAddress(false);
    setNewAddrLine1('');
    setNewAddrCity('');
    setNewAddrState('');
    setNewAddrZip('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'My Account' }]} />

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {userProfile?.displayName || 'Customer'}
                </h1>
                {isAdmin && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    Store Administrator
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500">{user?.email || userProfile?.email}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                TECHNOVA Club Member since 2026
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            )}

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Menu */}
          <div className="lg:col-span-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Order History</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20' : 'bg-slate-100'}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeTab === 'addresses'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="w-full text-left px-4 py-3 rounded-2xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-red-500" />
                <span>My Wishlist</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100">
                {wishlistCount}
              </span>
            </button>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-9">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Your Recent Orders</h2>

                {loadingOrders ? (
                  <div className="bg-white p-8 rounded-3xl text-center text-xs text-slate-500">
                    Loading your authenticated orders from Firestore...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl text-center border border-slate-200/80">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-800 text-sm">No orders yet</h3>
                    <p className="text-xs text-slate-500 mb-4">When you place an order, it will appear here with live tracking.</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                        <div>
                          <span className="font-mono font-bold text-slate-900 text-sm block">
                            Order #{order.id}
                          </span>
                          <span className="text-slate-400">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                            {order.status}
                          </span>

                          <button
                            onClick={() => navigate(`/order-tracking?orderId=${order.id}`)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <span>Live Tracking</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.productImage}
                                alt=""
                                className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{item.productName}</div>
                                <div className="text-[11px] text-slate-400">
                                  Quantity: {item.quantity} • ${item.unitPrice.toLocaleString()} each
                                </div>
                              </div>
                            </div>
                            <div className="font-extrabold text-slate-900">
                              ${item.totalPrice.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Info */}
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <div>
                          Estimated Delivery: <strong className="text-slate-900">{order.estimatedDelivery}</strong>
                        </div>
                        <div>
                          Total Paid: <strong className="text-slate-900 font-extrabold">${order.total.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Saved Addresses</h2>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form
                    onSubmit={handleSaveNewAddress}
                    className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 max-w-lg"
                  >
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                      New Shipping Address
                    </h3>
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddrLine1}
                      onChange={(e) => setNewAddrLine1(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      required
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddrState}
                        onChange={(e) => setNewAddrState(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        required
                      />
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={newAddrZip}
                        onChange={(e) => setNewAddrZip(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-3 py-2 bg-slate-100 text-slate-700 text-xs rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(userProfile?.savedAddresses || [
                    {
                      fullName: 'Alex Turner',
                      email: 'alex.turner@technova.com',
                      phone: '+1 (555) 234-8900',
                      addressLine1: '742 Innovation Way, Suite 400',
                      city: 'San Francisco',
                      state: 'CA',
                      postalCode: '94107',
                      country: 'United States',
                    },
                  ]).map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{addr.fullName}</span>
                        {idx === 0 && (
                          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-slate-600">{addr.addressLine1} {addr.addressLine2}</div>
                      <div className="text-slate-600">{addr.city}, {addr.state} {addr.postalCode}</div>
                      <div className="text-slate-500">{addr.country}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-5 max-w-xl">
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Display Name</label>
                  <input
                    type="text"
                    disabled
                    value={userProfile?.displayName || 'Customer'}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || userProfile?.email || ''}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Account Role</label>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 capitalize">
                    {userProfile?.role || 'Customer'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
