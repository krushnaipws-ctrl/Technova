# TECHNOVA — Premium Electronics E-Commerce Platform

> "Technology That Moves You."

TECHNOVA is a production-grade, full-stack electronics e-commerce web application combining the usability of Amazon, the minimalist precision of Apple, and the technical discovery experience of Best Buy.

---

## 🌟 Key Features & Website Structure

### Storefront & Navigation
- **3-Level Sticky Header**:
  - **Top Announcement Bar**: Live countdown timer calculated against sale target dates with quick "Shop Deals" CTA.
  - **Main Navigation Bar**: TECHNOVA brand mark, full-text product search with instant autocomplete, recent search history, customer account menu, live wishlist badge, and live cart badge.
  - **Department Bar & Mega Menus**: Desktop hover mega-menus showing top picks and featured brand filters for Smartphones, Laptops, Audio, Gaming, Smartwatches, Cameras, Smart Home, Accessories, and Deals.
  - **Mobile Responsive Drawer**: Touch-friendly navigation drawer.

### 20 Dedicated Accessible Routes
1. `/` — **Homepage** (Hero carousel, 8 category cards, best sellers grid, promo upgrade banner, new arrivals carousel, flash deals with live countdowns, brand showcase, customer testimonials, and newsletter).
2. `/products` — **Product Catalog & Search Results** (Sidebar filters for category, brand, price slider, rating, in-stock, and on-sale toggles; sorting by price, rating, newest, and best-selling; grid vs. list switcher).
3. `/category/:category` — **Category Department Pages** (Filtered views for Smartphones, Laptops, Audio, Gaming, Smartwatches, Cameras, Accessories, Smart Home).
4. `/product/:id` — **Product Details** (Image thumbnail gallery, interactive zoom, full-screen high-res viewer, color picker, hardware configuration variants, stock status, specs table, verified customer reviews form, shipping timescales, and related hardware).
5. `/cart` — **Shopping Cart** (Quantity adjustments, coupon code validation, free shipping progress bar, taxes & shipping calculation, Save for Later list, and Move to Wishlist).
6. `/checkout` — **6-Step Checkout Flow** (Contact info, shipping address, shipping speed selector, simulated tokenized payment methods, order review, and order placement with confetti celebration).
7. `/login` — **Customer Login** (Google Sign-In with Firebase Auth, email authentication, and quick demo logins).
8. `/register` — **Registration** (Account creation with terms consent and Firebase Google signup).
9. `/forgot-password` — **Password Recovery** (Email recovery dispatch simulation).
10. `/account` — **Customer Account Dashboard** (Order history with live tracking links, saved shipping addresses manager, and personal profile).
11. `/wishlist` — **Wishlist** (Saved products grid, live counter, batch move to cart, and remove items).
12. `/order-tracking` — **Live Order Tracking** (Lookup by order number or tracking code, 6-checkpoint shipment progress timeline, carrier details, and estimated delivery dates).
13. `/about` — **About TECHNOVA** (Company origins, engineering mission, trust scores, and authorized retailer credentials).
14. `/contact` — **Contact & Support** (Customer support channels, toll-free hotline, and interactive inquiry form).
15. `/faq` — **Frequently Asked Questions** (Searchable accordion questions categorized by orders, shipping, warranty, returns, and payment security).
16. `/shipping-returns` — **Shipping Information & Returns** (Free shipping thresholds, delivery speeds, 30-day RMA instructions).
17. `/privacy` — **Privacy Policy** (GDPR and CCPA compliant disclosures, zero raw card storage, and data rights).
18. `/terms` — **Terms & Conditions** (Sale terms, manufacturer warranty backing, and IP disclosures).
19. `/admin` — **Executive Control Console** (RBAC protected admin console: gross revenue KPI cards, low-stock alerts, catalog inventory manager to add/delete hardware, order fulfillment status updater, and promotional coupon voucher generator).
20. `*` — **Custom 404 Page** (Page not found fallback with quick search and return home links).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React, Canvas-Confetti.
- **Backend & Database**: Firebase Firestore Enterprise (custom security rules deployed via `fax.DeployRules`), Firebase Authentication (Google Sign-In with popup).
- **Security & Authorization**: Attribute-Based Access Control (ABAC), Zero-Trust rules, client input sanitization, and administrator authorization for `krushna.ipws@gmail.com`.

---

## 🎟️ Active Demo Promotional Codes
- `TECHNOVA10` — 10% OFF all electronics over $100
- `SAVE50` — $50 instant discount on orders over $500
- `CYBER15` — 15% Mega Sale discount
- `WELCOME20` — $20 OFF first purchase for new club members
