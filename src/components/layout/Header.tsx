import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { AnnouncementBar } from './AnnouncementBar';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import type { ProductCategory, Product } from '../../types';
import {
  Search,
  X,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Scale,
  Shield,
  LogOut,
  ChevronDown,
  Percent,
  Clock,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { path, navigate } = useRouter();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount, openCompare } = useCompare();
  const { user, userProfile, isAdmin, logout } = useAuth();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<ProductCategory | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('technova_recent_searches');
      return stored ? JSON.parse(stored) : ['iPhone 17', 'Sony WH-1000XM6', 'OLED Gaming Laptop'];
    } catch {
      return ['iPhone 17', 'Sony Headphones'];
    }
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(e.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    // Save recent search
    const updated = [searchQuery.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== searchQuery.trim().toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('technova_recent_searches', JSON.stringify(updated));

    setIsSearchFocused(false);
    navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectRecentSearch = (term: string) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    navigate(`/products?q=${encodeURIComponent(term)}`);
  };

  // Live matching products for autocomplete dropdown
  const filteredSuggestions: Product[] = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  // Matching categories
  const matchingCategories = searchQuery.trim().length > 1
    ? CATEGORIES.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Main Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            {/* Left: Mobile Toggle & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* TECHNOVA Brand Logo with Technology Inspired Icon */}
              <div
                onClick={() => navigate('/')}
                className="flex items-center gap-2.5 cursor-pointer group select-none"
              >
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-950 via-blue-900 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                  {/* Hexagon/chip inspired visual */}
                  <div className="absolute inset-1 rounded-lg border border-blue-400/40" />
                  <span className="font-extrabold text-sm tracking-wider font-mono text-blue-200">
                    T<span className="text-white">N</span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    TECHNOVA
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold hidden sm:inline -mt-1">
                    Technology That Moves You
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Search Bar with Autocomplete */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search premium laptops, smartphones, 8K cameras, audio..."
                    className="w-full pl-11 pr-20 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-hidden"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-12 text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="absolute right-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Autocomplete and Recent Searches Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  {searchQuery.trim().length === 0 ? (
                    <div>
                      <div className="flex items-center justify-between px-2 py-1 mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Recent Searches
                        </span>
                        <button
                          onClick={() => {
                            setRecentSearches([]);
                            localStorage.removeItem('technova_recent_searches');
                          }}
                          className="text-[11px] text-slate-400 hover:text-red-500"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 p-1 mb-2">
                        {recentSearches.map((term, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectRecentSearch(term)}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-600 transition-colors"
                          >
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-slate-100 pt-2 px-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Popular Categories
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {CATEGORIES.slice(0, 4).map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setIsSearchFocused(false);
                                navigate(`/category/${c.id}`);
                              }}
                              className="text-left text-xs text-slate-700 hover:text-blue-600 hover:bg-slate-50 p-1.5 rounded-md transition-colors"
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : filteredSuggestions.length > 0 || matchingCategories.length > 0 ? (
                    <div className="space-y-2">
                      {matchingCategories.length > 0 && (
                        <div className="p-1 border-b border-slate-100">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Categories
                          </span>
                          {matchingCategories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setIsSearchFocused(false);
                                navigate(`/category/${cat.id}`);
                              }}
                              className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 flex items-center justify-between"
                            >
                              <span>Explore {cat.name}</span>
                              <Sparkles className="w-3 h-3 text-blue-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="p-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Products
                        </span>
                        {filteredSuggestions.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              setIsSearchFocused(false);
                              navigate(`/product/${product.id}`);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-semibold text-blue-600 uppercase">
                                {product.brand}
                              </div>
                              <div className="text-xs font-semibold text-slate-900 truncate">
                                {product.name}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900">
                              ${product.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleSearchSubmit()}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl text-center transition-colors"
                      >
                        View all results for &ldquo;{searchQuery}&rdquo;
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No matching products found for &ldquo;{searchQuery}&rdquo;. Try searching for brand names like Apple, Sony, or categories like Laptops.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Actions (Compare, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Product Comparison Button */}
              {compareCount > 0 && (
                <button
                  onClick={openCompare}
                  className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
                  title="Compare products"
                >
                  <Scale className="w-5 h-5" />
                  <span className="hidden xl:inline text-xs font-semibold">Compare</span>
                  <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                </button>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => navigate('/wishlist')}
                className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
                title="My Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Toggle Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-semibold">Cart</span>
                {itemCount > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Account Dropdown */}
              <div ref={accountDropdownRef} className="relative">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {userProfile?.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt={userProfile.displayName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {userProfile ? userProfile.displayName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                  )}
                  <span className="text-xs font-semibold hidden md:inline max-w-24 truncate">
                    {userProfile ? userProfile.displayName.split(' ')[0] : 'Sign In'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {/* Account Dropdown Menu */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                    {user || userProfile ? (
                      <div className="space-y-1">
                        <div className="p-2 border-b border-slate-100">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {userProfile?.displayName}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {user?.email || userProfile?.email}
                          </div>
                          {isAdmin && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                              Store Administrator
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigate('/account');
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Account Dashboard</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigate('/order-tracking');
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>Track An Order</span>
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => {
                              setIsAccountDropdownOpen(false);
                              navigate('/admin');
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4 text-emerald-600" />
                            <span>Admin Console</span>
                          </button>
                        )}

                        <div className="border-t border-slate-100 my-1" />

                        <button
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-2 space-y-2">
                        <p className="text-xs text-slate-600">
                          Sign in to sync your cart, save wishlist items, and track orders.
                        </p>
                        <button
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigate('/login');
                          }}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                        >
                          Customer Sign In
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            navigate('/register');
                          }}
                          className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                        >
                          Create Free Account
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Level 3: Desktop Category Navigation Bar */}
        <div className="hidden lg:block border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-semibold text-slate-700">
            <div className="flex items-center space-x-1 py-1">
              {/* Mega Deals link */}
              <button
                onClick={() => navigate('/products?deals=true')}
                className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-1.5 font-bold transition-colors"
              >
                <Percent className="w-3.5 h-3.5 text-red-500" />
                <span>Mega Deals</span>
              </button>

              {/* Main Categories with Mega Menu Hover */}
              {CATEGORIES.map((cat) => {
                const isActive = path === `/category/${cat.id}`;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveMegaCategory(cat.id)}
                    className="relative"
                  >
                    <button
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className={`px-3 py-2 rounded-lg transition-colors hover:bg-slate-200/60 hover:text-blue-600 ${
                        isActive ? 'text-blue-600 bg-blue-50/80 font-bold' : ''
                      }`}
                    >
                      {cat.name}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <button
                onClick={() => navigate('/order-tracking')}
                className="hover:text-blue-600 transition-colors"
              >
                Order Tracking
              </button>
              <button
                onClick={() => navigate('/about')}
                className="hover:text-blue-600 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="hover:text-blue-600 transition-colors"
              >
                Support
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        {activeMegaCategory && (
          <MegaMenu
            category={activeMegaCategory}
            onClose={() => setActiveMegaCategory(null)}
          />
        )}
      </header>

      {/* Mobile Nav Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
};
