import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS } from '../data/products';
import { VALID_COUPONS } from '../data/coupons';
import type { Product, Order, Coupon, OrderStatus } from '../types';
import { updateOrderStatusInFirestore } from '../lib/firestoreService';
import {
  Shield,
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Package,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Tag,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigate } = useRouter();
  const { user, userProfile, isAdmin, signInDemoUser } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'customers'>('overview');

  // Product management state
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [isAddProductModal, setIsAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Product['category']>('smartphones');
  const [newProductPrice, setNewProductPrice] = useState(999);
  const [newProductStock, setNewProductStock] = useState(25);

  // Orders management state
  const [orderList, setOrderList] = useState<Order[]>([
    {
      id: 'TN-892415-401',
      userId: 'usr-1',
      customerEmail: 'alex.turner@technova.com',
      customerName: 'Alex Turner',
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
      timeline: [],
    },
    {
      id: 'TN-729410-109',
      userId: 'usr-2',
      customerEmail: 'elena.rostova@designlab.io',
      customerName: 'Elena Rostova',
      items: [
        {
          productId: 'prod-macbook-pro-16',
          productName: 'Apple MacBook Pro 16" M4 Max',
          productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80',
          quantity: 1,
          unitPrice: 3499,
          totalPrice: 3499,
        },
      ],
      subtotal: 3499,
      discount: 100,
      shippingFee: 0,
      tax: 237.93,
      total: 3636.93,
      status: 'Processing',
      shippingAddress: {
        fullName: 'Elena Rostova',
        email: 'elena.rostova@designlab.io',
        phone: '+1 (555) 890-1234',
        addressLine1: '120 Broadway Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10006',
        country: 'United States',
      },
      shippingMethod: 'express',
      paymentMethod: 'card',
      trackingNumber: 'FEDEX-109382103',
      carrier: 'FedEx Express Worldwide',
      estimatedDelivery: 'Nov 02, 2026',
      createdAt: '2026-10-30T11:00:00Z',
      updatedAt: '2026-10-30T11:30:00Z',
      timeline: [],
    },
  ]);

  // Coupon state
  const [coupons, setCoupons] = useState<Coupon[]>(VALID_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponVal, setNewCouponVal] = useState(15);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  // Customer state
  const customerList = [
    { name: 'Alex Turner', email: 'alex.turner@technova.com', orders: 4, spent: '$2,840.00', status: 'Active VIP' },
    { name: 'Elena Rostova', email: 'elena.rostova@designlab.io', orders: 2, spent: '$4,120.00', status: 'Active VIP' },
    { name: 'Marcus Sterling', email: 'marcus.s@enterprise.com', orders: 3, spent: '$1,980.00', status: 'Active' },
    { name: 'David Chen', email: 'david.chen@tokyo.ac.jp', orders: 1, spent: '$399.00', status: 'Active' },
  ];

  // Security Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Restricted Administrator Area</h2>
          <p className="text-xs text-slate-500">
            You must be authenticated as an authorized TECHNOVA administrator to access the control panel.
          </p>
          <div className="pt-2">
            <button
              onClick={() => signInDemoUser('admin')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Sign In as Administrator (Krushna)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Order status update handler
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatusInFirestore(orderId, newStatus);
    } catch {
      // Local sync
    }
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o))
    );
    addToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  // Add Product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductBrand) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      brand: newProductBrand,
      category: newProductCategory,
      price: newProductPrice,
      originalPrice: newProductPrice + 100,
      discountPercent: 10,
      rating: 5.0,
      reviewCount: 1,
      stockCount: newProductStock,
      inStock: newProductStock > 0,
      sku: `${newProductBrand.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      description: 'Newly added flagship hardware to the TECHNOVA catalog.',
      shortDescription: `${newProductName} with certified manufacturer warranty.`,
      features: ['Factory Sealed Genuine Stock', 'Global Manufacturer Warranty', 'Expedited Courier Transit'],
      specifications: {
        Brand: newProductBrand,
        Category: newProductCategory,
        Warranty: '2-Year Official Protection',
      },
      colors: [{ name: 'Space Black', hex: '#111827' }],
      variants: [{ id: 'v-std', name: 'Standard Edition', sku: 'STD-1', priceModifier: 0, stock: newProductStock }],
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      ],
      warranty: '2-Year Official Guarantee',
      shippingInfo: 'Free 2-day delivery.',
      isNew: true,
    };

    setProductList([newProd, ...productList]);
    setIsAddProductModal(false);
    setNewProductName('');
    setNewProductBrand('');
    addToast(`Added "${newProd.name}" to store catalog!`, 'success');
  };

  const handleDeleteProduct = (productId: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product removed from active catalog', 'info');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: newCouponVal,
      minSpend: 100,
      description: `${newCouponVal}${newCouponType === 'percentage' ? '%' : '$'} OFF orders over $100`,
      expiryDate: '2026-12-31',
    };

    setCoupons([newC, ...coupons]);
    setNewCouponCode('');
    addToast(`Coupon "${newC.code}" created and active!`, 'success');
  };

  // Metrics
  const totalSales = 184520;
  const totalOrders = 348;
  const lowStockCount = productList.filter((p) => p.stockCount <= 15).length;

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
              TN
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight">TECHNOVA Executive Control Console</h1>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">
                  Live Firestore Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong>{user?.email || userProfile?.email}</strong> (Full RBAC Administrator Privileges)
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl self-start sm:self-auto transition-colors"
          >
            Return to Storefront
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'overview', label: 'Store Overview' },
            { id: 'products', label: `Inventory & Products (${productList.length})` },
            { id: 'orders', label: `Orders Fulfillment (${orderList.length})` },
            { id: 'coupons', label: `Promotions & Vouchers (${coupons.length})` },
            { id: 'customers', label: `Customer Accounts (${customerList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Gross Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">${totalSales.toLocaleString()}</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">+18.4% vs last month</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Orders Dispatched</span>
                  <ShoppingBag className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{totalOrders}</div>
                <div className="text-xs text-slate-400 mt-1">99.8% on-time delivery</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Catalog SKUs</span>
                  <Package className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">{productList.length} Devices</div>
                <div className="text-xs text-slate-400 mt-1">Across 8 major categories</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-bold uppercase tracking-wider">Low Stock Warnings</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-amber-600">{lowStockCount} Units</div>
                <div className="text-xs text-amber-600 font-medium mt-1">Restock suggested</div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-black text-base text-slate-900">Live Fulfillment Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Fulfillment Status</th>
                      <th className="py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orderList.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{ord.id}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">{ord.customerName}</td>
                        <td className="py-3 px-3 text-slate-500">{new Date(ord.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">${ord.total.toFixed(2)}</td>
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => setActiveTab('orders')}
                            className="text-blue-600 hover:underline font-bold"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Product Catalog Management</h2>
                <p className="text-xs text-slate-500">Configure prices, inventory levels, and add new product entries.</p>
              </div>

              <button
                onClick={() => setIsAddProductModal(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-3 px-3">Device</th>
                    <th className="py-3 px-3">Brand</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock Units</th>
                    <th className="py-3 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productList.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 max-w-xs truncate">
                        {prod.name}
                      </td>
                      <td className="py-3 px-3 font-bold text-blue-600">{prod.brand}</td>
                      <td className="py-3 px-3 uppercase text-[11px] text-slate-600">{prod.category}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">${prod.price.toLocaleString()}</td>
                      <td className="py-3 px-3 font-bold text-slate-800">
                        {prod.stockCount <= 15 ? (
                          <span className="text-amber-600 font-bold">{prod.stockCount} (Low)</span>
                        ) : (
                          <span>{prod.stockCount}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Product Modal */}
            {isAddProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="fixed inset-0 bg-slate-950/60"
                  onClick={() => setIsAddProductModal(false)}
                />
                <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-4">
                  <h3 className="font-bold text-slate-900 text-base">Add New Hardware SKU</h3>
                  <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Product Name</label>
                      <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="e.g. Sony FX3 Cinema Camera"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Brand</label>
                        <input
                          type="text"
                          value={newProductBrand}
                          onChange={(e) => setNewProductBrand(e.target.value)}
                          placeholder="e.g. Sony"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Category</label>
                        <select
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value as any)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="smartphones">Smartphones</option>
                          <option value="laptops">Laptops</option>
                          <option value="audio">Audio</option>
                          <option value="gaming">Gaming</option>
                          <option value="smartwatches">Smartwatches</option>
                          <option value="cameras">Cameras</option>
                          <option value="accessories">Accessories</option>
                          <option value="smart-home">Smart Home</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Stock Units</label>
                        <input
                          type="number"
                          value={newProductStock}
                          onChange={(e) => setNewProductStock(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                      >
                        Publish to Store
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddProductModal(false)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Order Dispatch & Status Manager</h2>

            <div className="space-y-4">
              {orderList.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100 text-xs">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-sm block">
                        Order #{order.id}
                      </span>
                      <span className="text-slate-500">
                        Recipient: <strong>{order.customerName}</strong> ({order.customerEmail})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-medium">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Payment Confirmed">Payment Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Carrier Tracking
                      </span>
                      <div className="font-mono text-slate-800">{order.carrier} • {order.trackingNumber}</div>
                      <div className="text-slate-500 mt-1">Est. Delivery: {order.estimatedDelivery}</div>
                    </div>

                    <div>
                      <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Financials
                      </span>
                      <div className="text-slate-800 font-bold">Total: ${order.total.toFixed(2)}</div>
                      <div className="text-slate-500 capitalize">Payment Method: {order.paymentMethod}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Promotions & Coupon Vouchers</h2>

            {/* Create Coupon Form */}
            <form
              onSubmit={handleCreateCoupon}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 max-w-xl text-xs"
            >
              <h3 className="font-bold text-slate-900 text-sm">Create New Promo Code</h3>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. FLASH25)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono"
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newCouponVal}
                  onChange={(e) => setNewCouponVal(Number(e.target.value))}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
                <select
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="percentage">% Percentage</option>
                  <option value="fixed">$ Fixed USD</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
              >
                Add Coupon Code
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-blue-600">{c.code}</span>
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-700">
                      {c.discountValue}{c.discountType === 'percentage' ? '%' : '$'} OFF
                    </span>
                  </div>
                  <p className="text-slate-500">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Customer Accounts Directory</h2>
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Lifetime Orders</th>
                    <th className="py-3 px-3">Gross Spent</th>
                    <th className="py-3 px-3">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customerList.map((cust) => (
                    <tr key={cust.email} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{cust.name}</td>
                      <td className="py-3 px-3 text-slate-600">{cust.email}</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{cust.orders}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{cust.spent}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded">
                          {cust.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
