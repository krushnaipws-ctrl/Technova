import type { ProductCategory } from '../types';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  featuredBrands: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    tagline: 'Flagship Performance & Cinematic Cameras',
    description: 'Explore the latest iPhone, Galaxy, and Pixel devices with generative AI coprocessors and pro optics.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
    featuredBrands: ['Apple', 'Samsung', 'Google', 'OnePlus']
  },
  {
    id: 'laptops',
    name: 'Laptops & Computers',
    tagline: 'Pro Workstations & OLED Gaming Rigs',
    description: 'Supercharged computing with Apple Silicon, Intel Core Ultra, and RTX gaming hardware.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
    featuredBrands: ['Apple', 'Dell', 'ASUS', 'Lenovo']
  },
  {
    id: 'audio',
    name: 'Headphones & Audio',
    tagline: 'Studio Acoustic Fidelity & Class-Leading ANC',
    description: 'Immersive soundscapes, lossless wireless LDAC transmission, and tailored noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
    featuredBrands: ['Sony', 'Apple', 'Bose', 'JBL']
  },
  {
    id: 'gaming',
    name: 'Gaming Consoles & Gear',
    tagline: 'Next-Gen 4K 120FPS & Esports Peripherals',
    description: 'PS5 Pro, Xbox Series X, tournament mechanical keyboards, and sub-60g precision mice.',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
    featuredBrands: ['Sony', 'Microsoft', 'Logitech']
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches & Fitness',
    tagline: 'Titanium Durability & Precision Biometrics',
    description: 'Expedition-grade titanium watches with multi-band GPS, diving ratings, and ECG analysis.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
    featuredBrands: ['Apple', 'Samsung', 'Garmin']
  },
  {
    id: 'cameras',
    name: 'Cameras & Video',
    tagline: '8K Cinema & Full-Frame AI Autofocus',
    description: 'Mirrorless flagships and compact 3-axis gimbal vlogging tools with high dynamic range.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
    featuredBrands: ['Sony', 'Canon', 'DJI']
  },
  {
    id: 'smart-home',
    name: 'Smart Home Devices',
    tagline: 'Seamless Automation with Matter & Thread',
    description: 'Smart displays, dynamic ambient lighting, and connected voice assistants.',
    image: 'https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=800&q=80',
    itemCount: 2,
    featuredBrands: ['Google', 'Philips']
  },
  {
    id: 'accessories',
    name: 'Accessories & Power',
    tagline: 'GaN Ultra-Fast Charging & High-Speed NVMe',
    description: '240W desktop power stations, 2,000MB/s rugged SSDs, and custom mechanical keyboards.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
    featuredBrands: ['Anker', 'Samsung', 'Keychron']
  }
];
