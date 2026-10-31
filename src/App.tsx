import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { CompareModal } from './components/common/CompareModal';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';
import { OrderTracking } from './pages/OrderTracking';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { ShippingReturns } from './pages/ShippingReturns';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFound } from './pages/NotFound';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Route matching
  const renderPage = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <Home />;
    }

    // 2. All Products / Search Results
    if (path === '/products') {
      return <Products />;
    }

    // 3. Category Page (/category/:category)
    const categoryMatch = path.match(/^\/category\/([a-z-]+)$/);
    if (categoryMatch) {
      return <Products initialCategory={categoryMatch[1] as any} />;
    }

    // 4. Product Details (/product/:id)
    const productMatch = path.match(/^\/product\/([a-zA-Z0-9_-]+)$/);
    if (productMatch) {
      return <ProductDetails productId={productMatch[1]} />;
    }

    // 5. Shopping Cart
    if (path === '/cart') {
      return <Cart />;
    }

    // 6. Checkout
    if (path === '/checkout') {
      return <Checkout />;
    }

    // 7. Customer Login
    if (path === '/login') {
      return <Login />;
    }

    // 8. Customer Registration
    if (path === '/register') {
      return <Register />;
    }

    // 9. Forgot Password
    if (path === '/forgot-password') {
      return <ForgotPassword />;
    }

    // 10. Account Dashboard
    if (path === '/account') {
      return <Account />;
    }

    // 11. Wishlist
    if (path === '/wishlist') {
      return <Wishlist />;
    }

    // 12. Order Tracking
    if (path === '/order-tracking') {
      return <OrderTracking />;
    }

    // 13. About Us
    if (path === '/about') {
      return <About />;
    }

    // 14. Contact Us
    if (path === '/contact') {
      return <Contact />;
    }

    // 15. FAQ
    if (path === '/faq') {
      return <FAQ />;
    }

    // 16. Shipping and Returns
    if (path === '/shipping-returns') {
      return <ShippingReturns />;
    }

    // 17. Privacy Policy
    if (path === '/privacy') {
      return <PrivacyPolicy />;
    }

    // 18. Terms and Conditions
    if (path === '/terms') {
      return <TermsConditions />;
    }

    // 19. Admin Dashboard
    if (path === '/admin') {
      return <AdminDashboard />;
    }

    // 20. 404 Not Found
    return <NotFound />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <CompareModal />
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <AppContent />
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </RouterProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
