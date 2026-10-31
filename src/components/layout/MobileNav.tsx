import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/categories';
import {
  X,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  Watch,
  Camera,
  Home,
  Cable,
  Percent,
  User,
  ShoppingBag,
  Heart,
  Shield,
  HelpCircle,
  Truck,
  LogIn,
  LogOut,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const { user, userProfile, isAdmin, logout } = useAuth();

  if (!isOpen) return null;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'smartphones':
        return <Smartphone className="w-4 h-4" />;
      case 'laptops':
        return <Laptop className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'gaming':
        return <Gamepad2 className="w-4 h-4" />;
      case 'smartwatches':
        return <Watch className="w-4 h-4" />;
      case 'cameras':
        return <Camera className="w-4 h-4" />;
      case 'smart-home':
        return <Home className="w-4 h-4" />;
      case 'accessories':
        return <Cable className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const handleLink = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
              TN
            </div>
            <span className="font-bold text-base tracking-tight">TECHNOVA</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          {user || userProfile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                  {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {userProfile?.displayName || 'My Account'}
                  </div>
                  <div className="text-xs text-slate-500">{user?.email || userProfile?.email}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-slate-400 hover:text-red-600 p-1.5"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleLink('/login')}
                className="flex-1 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
              <button
                onClick={() => handleLink('/register')}
                className="flex-1 py-2 text-xs font-semibold border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-100"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Navigation Categories */}
        <div className="p-4 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Categories
          </div>

          <button
            onClick={() => handleLink('/products?deals=true')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-red-600 bg-red-50/60 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Percent className="w-4 h-4 text-red-500" />
              <span>Mega Deals</span>
            </div>
            <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded">
              HOT
            </span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleLink(`/category/${cat.id}`)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400">{getCategoryIcon(cat.id)}</span>
                <span>{cat.name}</span>
              </div>
              <span className="text-xs text-slate-400">{cat.itemCount}</span>
            </button>
          ))}
        </div>

        {/* Quick Links */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Account & Support
          </div>

          <button
            onClick={() => handleLink('/account')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Customer Dashboard</span>
          </button>

          <button
            onClick={() => handleLink('/wishlist')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            <Heart className="w-4 h-4 text-slate-400" />
            <span>My Wishlist</span>
          </button>

          <button
            onClick={() => handleLink('/order-tracking')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            <Truck className="w-4 h-4 text-slate-400" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => handleLink('/faq')}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Frequently Asked Questions</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => handleLink('/admin')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg font-semibold"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Admin Console</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
