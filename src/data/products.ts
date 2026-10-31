import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // SMARTPHONES
  {
    id: 'prod-iphone-17-pro',
    name: 'Apple iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 1199,
    originalPrice: 1299,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 342,
    stockCount: 45,
    inStock: true,
    sku: 'APL-IP17PM-256',
    description: 'The pinnacle of smartphone innovation. Powered by the next-generation A19 Pro 2nm chip with thermal vapor cooling, Super Retina XDR 120Hz ProMotion display with ultra-narrow titanium bezels, and the breakthrough 48MP quad-prism telephoto zoom system.',
    shortDescription: '6.9" Super Retina XDR, A19 Pro Bionic, Titanium Ceramic Shield, Quad 48MP Camera.',
    features: [
      'Aerospace-Grade Grade 5 Titanium Frame with Ceramic Shield Gen 3',
      'A19 Pro 2nm Silicon with 6-core GPU and hardware ray tracing',
      'Pro Camera System: 48MP Main, 48MP Ultra-Wide, 48MP 5x Periscope Telephoto',
      'Up to 33 hours video playback with intelligent power distribution',
      'Action Button 2.0 with haptic pressure glide'
    ],
    specifications: {
      'Display': '6.9-inch Super Retina XDR OLED (2868 x 1320), 1-120Hz ProMotion',
      'Processor': 'Apple A19 Pro (2nm architecture)',
      'Storage': '256GB / 512GB / 1TB / 2TB NVMe',
      'Cameras': 'Triple 48MP rear setup + LiDAR scanner + 18MP TrueDepth Front',
      'Battery': '4,685 mAh, 35W wired fast charging, 25W MagSafe',
      'Water Resistance': 'IP68 (6 meters for up to 30 mins)',
      'Weight': '221 grams'
    },
    colors: [
      { name: 'Natural Titanium', hex: '#9E9D99' },
      { name: 'Desert Gold', hex: '#D4AF37' },
      { name: 'Deep Space Black', hex: '#212124' },
      { name: 'Titanium Blue', hex: '#3B4856' }
    ],
    variants: [
      { id: 'v-256gb', name: '256GB', sku: 'APL-17P-256', priceModifier: 0, stock: 25 },
      { id: 'v-512gb', name: '512GB', sku: 'APL-17P-512', priceModifier: 200, stock: 15 },
      { id: 'v-1tb', name: '1TB', sku: 'APL-17P-1TB', priceModifier: 400, stock: 5 }
    ],
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Official AppleCare+ Global Hardware Warranty',
    shippingInfo: 'Free Next-Day Air Shipping & Express Delivery available.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 5G',
    brand: 'Samsung',
    category: 'smartphones',
    price: 1249,
    originalPrice: 1399,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 289,
    stockCount: 38,
    inStock: true,
    sku: 'SAM-S25U-512',
    description: 'Galaxy AI redefined with Snapdragon 8 Elite for Galaxy. Featuring the embedded Bluetooth S-Pen stylus, 200MP Nightography engine, anti-reflective Gorilla Armor 2 glass, and 7 years of major OS updates.',
    shortDescription: '6.8" Dynamic AMOLED 2X, Snapdragon 8 Elite, 200MP Camera, Integrated S-Pen.',
    features: [
      'Embedded Precision S-Pen with low-latency gesture control',
      '200MP Ultra Vision sensor with Space Zoom 100x AI ISP',
      'Dynamic AMOLED 2X flat display with 3,000 nits peak brightness',
      'Advanced cooling vapor chamber for sustained AAA gaming performance'
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X, Quad HD+ (3120 x 1440), 120Hz',
      'Processor': 'Snapdragon 8 Elite for Galaxy (3nm)',
      'RAM & Storage': '16GB RAM + 512GB UFS 4.1',
      'Battery': '5,000 mAh with 45W Fast Charging 2.0',
      'Camera': '200MP Main + 50MP Periscope (5x) + 10MP (3x) + 50MP Ultrawide',
      'Weight': '219 grams'
    },
    colors: [
      { name: 'Titanium Gray', hex: '#686B73' },
      { name: 'Titanium Black', hex: '#1C1D1F' },
      { name: 'Titanium Jade Green', hex: '#445E56' }
    ],
    variants: [
      { id: 'v-256', name: '256GB / 12GB', sku: 'SAM-S25-256', priceModifier: -100, stock: 20 },
      { id: 'v-512', name: '512GB / 16GB', sku: 'SAM-S25-512', priceModifier: 0, stock: 12 },
      { id: 'v-1tb', name: '1TB / 16GB', sku: 'SAM-S25-1TB', priceModifier: 250, stock: 6 }
    ],
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Samsung Care+ Included',
    shippingInfo: 'Free 2-day domestic delivery with signature on delivery.',
    isNew: true,
    isFeatured: true
  },
  {
    id: 'prod-pixel-10-pro',
    name: 'Google Pixel 10 Pro',
    brand: 'Google',
    category: 'smartphones',
    price: 999,
    originalPrice: 1099,
    discountPercent: 9,
    rating: 4.7,
    reviewCount: 195,
    stockCount: 22,
    inStock: true,
    sku: 'GOOG-PX10-256',
    description: 'The purest Android experience powered by Google Tensor G5 manufactured on TSMC 3nm silicon. Enhanced with on-device Gemini Nano multimodal intelligence, Magic Studio editing suite, and benchmark telephoto computational zoom.',
    shortDescription: '6.7" Super Actua Display, Tensor G5, Pro triple camera, Gemini Nano.',
    features: [
      'Tensor G5 custom TPU engineered for generative AI at zero latency',
      'Super Actua display boasting 3,000 nits outdoor visibility',
      'Video Boost 2.0 with real-time Night Sight 4K60 HDR',
      '7 full years of Google Pixel drops and security updates'
    ],
    specifications: {
      'Display': '6.7-inch LTPO OLED (1344 x 2992), 1-120Hz',
      'Processor': 'Google Tensor G5 + Titan M2 security coprocessor',
      'RAM': '16GB LPDDR5X',
      'Cameras': '50MP Octa PD main, 48MP Quad PD telephoto (5x optical), 48MP ultrawide',
      'Battery': '5,050 mAh with 30W wireless Fast Qi2 support'
    },
    colors: [
      { name: 'Obsidian Black', hex: '#202124' },
      { name: 'Porcelain White', hex: '#F1F1F0' },
      { name: 'Hazel Green', hex: '#606C5D' }
    ],
    variants: [
      { id: 'v-128', name: '128GB', sku: 'PX10-128', priceModifier: -100, stock: 10 },
      { id: 'v-256', name: '256GB', sku: 'PX10-256', priceModifier: 0, stock: 12 }
    ],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Google Hardware Guarantee',
    shippingInfo: 'Free carbon-neutral standard delivery.',
    isDeal: true,
    dealEndsAt: '2026-11-05T23:59:59Z'
  },
  {
    id: 'prod-oneplus-13',
    name: 'OnePlus 13 Hasselblad Edition',
    brand: 'OnePlus',
    category: 'smartphones',
    price: 799,
    originalPrice: 899,
    discountPercent: 11,
    rating: 4.6,
    reviewCount: 142,
    stockCount: 19,
    inStock: true,
    sku: '1P-13-512',
    description: 'Extreme speed and Hasselblad color science calibration. Featuring 6000mAh Glacier battery, 100W SUPERVOOC charging, and Snapdragon 8 Elite computing.',
    shortDescription: '6.82" 2K Oriental Screen, Snapdragon 8 Elite, 6000mAh, 100W Fast Charge.',
    features: [
      'Hasselblad 5th-Gen Natural Color calibration matrix',
      '6,000 mAh Silicon-Carbon Glacier Battery',
      '100W wired charge: 1% to 100% in just 26 minutes',
      'Rain Water Smart Touch 2.0 display technology'
    ],
    specifications: {
      'Display': '6.82-inch 2K 120Hz ProXDR with Dolby Vision',
      'SoC': 'Qualcomm Snapdragon 8 Elite',
      'RAM / ROM': '16GB RAM + 512GB Storage',
      'Battery': '6000 mAh Silicon-Carbon'
    },
    colors: [
      { name: 'Midnight Black', hex: '#171717' },
      { name: 'Emerald Green', hex: '#1C3F3A' }
    ],
    variants: [
      { id: 'v-256', name: '256GB / 12GB', sku: '1P-256', priceModifier: -80, stock: 10 },
      { id: 'v-512', name: '512GB / 16GB', sku: '1P-512', priceModifier: 0, stock: 9 }
    ],
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '1-Year Global Manufacturer Warranty',
    shippingInfo: 'Dispatched within 24 hours.'
  },

  // LAPTOPS
  {
    id: 'prod-macbook-pro-16',
    name: 'Apple MacBook Pro 16" M4 Max',
    brand: 'Apple',
    category: 'laptops',
    price: 3499,
    originalPrice: 3899,
    discountPercent: 10,
    rating: 4.95,
    reviewCount: 412,
    stockCount: 14,
    inStock: true,
    sku: 'APL-MBP16-M4M',
    description: 'Supercharged by Apple M4 Max with 16-core CPU, 40-core GPU, and 128GB unified memory bandwidth. Liquid Retina XDR screen with nano-texture glass option and unprecedented 24 hours battery life.',
    shortDescription: '16.2" Liquid Retina XDR, M4 Max (16C/40C), 48GB Unified RAM, 1TB SSD.',
    features: [
      'M4 Max with 16-core CPU and 40-core GPU hardware ray tracing',
      'Liquid Retina XDR: 1600 nits peak HDR brightness and 1,000,000:1 contrast',
      'Six-speaker sound system with force-cancelling woofers and Spatial Audio',
      'Thunderbolt 5 ports delivering up to 120Gb/s bi-directional data transfer',
      'MagSafe 3, HDMI 2.1, and SDXC high-speed card slot'
    ],
    specifications: {
      'Display': '16.2-inch Liquid Retina XDR (3456 x 2234), ProMotion 120Hz',
      'Chip': 'Apple M4 Max (16 CPU / 40 GPU / 16 Neural Engine)',
      'Memory': '48GB Unified Memory (configurable to 128GB)',
      'Storage': '1TB PCIe 4.0 SSD (up to 7.4GB/s)',
      'Battery': '100-watt-hour lithium-polymer, up to 24 hrs playback',
      'Weight': '2.14 kg'
    },
    colors: [
      { name: 'Space Black', hex: '#242527' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    variants: [
      { id: 'v-mbp-1tb', name: '48GB RAM / 1TB SSD', sku: 'MBP16-48-1', priceModifier: 0, stock: 8 },
      { id: 'v-mbp-2tb', name: '64GB RAM / 2TB SSD', sku: 'MBP16-64-2', priceModifier: 600, stock: 4 },
      { id: 'v-mbp-4tb', name: '128GB RAM / 4TB SSD', sku: 'MBP16-128-4', priceModifier: 1400, stock: 2 }
    ],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '3-Year Premium Hardware Warranty & AppleCare Support',
    shippingInfo: 'Complimentary White Glove courier delivery.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-dell-xps-16',
    name: 'Dell XPS 16 9640 OLED InfinityEdge',
    brand: 'Dell',
    category: 'laptops',
    price: 2399,
    originalPrice: 2699,
    discountPercent: 11,
    rating: 4.7,
    reviewCount: 167,
    stockCount: 18,
    inStock: true,
    sku: 'DELL-XPS16-4K',
    description: 'Seamless glass touchpad, capacitive touch function keys, CNC machined aluminum chassis, and 4K+ OLED InfinityEdge touch screen driven by Intel Core Ultra 9 with RTX 4070 graphic power.',
    shortDescription: '16.3" 4K+ OLED Touch, Core Ultra 9 185H, RTX 4070, 32GB RAM, 1TB SSD.',
    features: [
      'Precision CNC milled aluminum and Gorilla Glass 3 seamless palm rest',
      '16.3" 4K+ 120Hz OLED InfinityEdge touch display with 100% DCI-P3 color',
      'NVIDIA GeForce RTX 4070 (8GB GDDR6) Studio certified graphics',
      'Intel Core Ultra 9 with integrated AI NPU accelerator'
    ],
    specifications: {
      'Display': '16.3" UHD+ 4K OLED (3840 x 2400), 120Hz Touchscreen, 400 nits',
      'CPU': 'Intel Core Ultra 9 185H (16 Cores, up to 5.1 GHz)',
      'GPU': 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      'Memory': '32GB LPDDR5x 7467 MT/s',
      'Storage': '1TB M.2 PCIe NVMe SSD',
      'Weight': '2.13 kg'
    },
    colors: [
      { name: 'Platinum Silver', hex: '#D1D5DB' },
      { name: 'Graphite Navy', hex: '#1E293B' }
    ],
    variants: [
      { id: 'v-xps-32', name: '32GB RAM / 1TB SSD', sku: 'XPS16-32-1', priceModifier: 0, stock: 12 },
      { id: 'v-xps-64', name: '64GB RAM / 2TB SSD', sku: 'XPS16-64-2', priceModifier: 500, stock: 6 }
    ],
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Dell ProSupport Plus with Accidental Damage Cover',
    shippingInfo: 'Free 2-Day Air Express Shipping.',
    isFeatured: true
  },
  {
    id: 'prod-asus-rog-zephyrus-g16',
    name: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop',
    brand: 'ASUS',
    category: 'laptops',
    price: 2199,
    originalPrice: 2499,
    discountPercent: 12,
    rating: 4.85,
    reviewCount: 228,
    stockCount: 16,
    inStock: true,
    sku: 'ASUS-ROG-G16',
    description: 'Ultra-thin aerospace CNC aluminum gaming beast. ROG Nebula 2.5K 240Hz OLED display, slash lighting on lid, AMD Ryzen AI 9 processor and RTX 4080 graphics in a razor-thin 1.85kg body.',
    shortDescription: '16" 2.5K 240Hz OLED Nebula, AMD Ryzen AI 9, RTX 4080, 32GB RAM.',
    features: [
      'ROG Nebula Display: 2.5K OLED, 240Hz/0.2ms, G-SYNC, DisplayHDR True Black 500',
      'Slash Lighting: 7 custom animations with 15 dynamic modes across the CNC lid',
      'ROG Intelligent Cooling with vapor chamber and liquid metal thermal paste',
      'Lightweight 1.85kg and 1.49cm profile'
    ],
    specifications: {
      'Display': '16.0" 2.5K (2560 x 1600) OLED 240Hz 0.2ms response',
      'CPU': 'AMD Ryzen AI 9 HX 370 (12 cores / 24 threads, 50 TOPs NPU)',
      'GPU': 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6',
      'RAM': '32GB LPDDR5X-7500',
      'Storage': '2TB PCIe 4.0 NVMe M.2 Performance SSD'
    },
    colors: [
      { name: 'Eclipse Gray', hex: '#374151' },
      { name: 'Platinum White', hex: '#F9FAFB' }
    ],
    variants: [
      { id: 'v-rog-32', name: '32GB / 2TB SSD / RTX 4080', sku: 'G16-4080', priceModifier: 0, stock: 16 }
    ],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year ASUS Perfect Warranty Protection',
    shippingInfo: 'Ships same day when ordered before 3PM.'
  },
  {
    id: 'prod-lenovo-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'laptops',
    price: 1849,
    originalPrice: 2099,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 154,
    stockCount: 20,
    inStock: true,
    sku: 'LEN-X1C-G12',
    description: 'The definitive business executive ultrabook. Ultra-light carbon fiber chassis weighing just 1.09kg, MIL-STD 810H durability, legendary spill-resistant keyboard with TrackPoint, and all-day 18-hour battery.',
    shortDescription: '14" 2.8K OLED 120Hz, Intel Core Ultra 7, 32GB RAM, 1TB SSD, 1.09kg.',
    features: [
      'Ultra-durable carbon fiber and recycled magnesium alloy build',
      'Computer Vision presence sensing: auto-locks when you step away',
      'Sensory Communication Bar with FHD+IR webcam and privacy shutter',
      'Legendary ThinkPad ergonomics with dual-function TrackPoint Quick Menu'
    ],
    specifications: {
      'Display': '14.0" 2.8K (2880 x 1800) OLED, anti-glare, 120Hz, 400 nits',
      'Processor': 'Intel Core Ultra 7 165H (16 Cores)',
      'Memory': '32GB LPDDR5X-6400MHz',
      'Storage': '1TB SSD M.2 2280 PCIe Gen4 Performance',
      'Weight': '1.09 kg'
    },
    colors: [
      { name: 'Deep ThinkPad Matte Black', hex: '#111827' }
    ],
    variants: [
      { id: 'v-x1-16', name: '16GB RAM / 512GB SSD', sku: 'X1-16', priceModifier: -200, stock: 8 },
      { id: 'v-x1-32', name: '32GB RAM / 1TB SSD', sku: 'X1-32', priceModifier: 0, stock: 12 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '3-Year Premier Support Onsite Service',
    shippingInfo: 'Free business courier dispatch.',
    isDeal: true,
    dealEndsAt: '2026-11-04T18:00:00Z'
  },

  // AUDIO & HEADPHONES
  {
    id: 'prod-sony-wh1000xm6',
    name: 'Sony WH-1000XM6 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'audio',
    price: 399,
    originalPrice: 449,
    discountPercent: 11,
    rating: 4.9,
    reviewCount: 680,
    stockCount: 60,
    inStock: true,
    sku: 'SNY-WH1000XM6-BLK',
    description: 'Industry-leading noise cancellation engineered with Sony HD Noise Cancelling Processor QN2 and 12 beamforming microphones. Hi-Res Wireless Audio with LDAC, 40 hours battery life with quick 3-min top-up for 3 hours playback.',
    shortDescription: 'Dual Processor QN2 Noise Cancelling, LDAC Hi-Res Audio, 40-hr battery.',
    features: [
      'Dual proprietary noise cancelling processors (QN2 & V2) with auto NC optimizer',
      '30mm carbon-fiber dome drivers for unmatched acoustic clarity',
      'Multipoint connection: seamlessly swap between phone, tablet, and PC',
      'Speak-to-Chat function auto-pauses music when you begin talking'
    ],
    specifications: {
      'Driver Unit': '30mm, Carbon Fiber Composite Dome',
      'Frequency Response': '4 Hz - 40,000 Hz (Hi-Res certified)',
      'Battery Life': '40 hours (NC ON), 50 hours (NC OFF)',
      'Bluetooth': 'v5.4 with LDAC, AAC, SBC, LC3',
      'Weight': '248 grams'
    },
    colors: [
      { name: 'Midnight Black', hex: '#18181B' },
      { name: 'Silver Platinum', hex: '#E4E4E7' },
      { name: 'Smoky Blue', hex: '#1E3A8A' }
    ],
    variants: [
      { id: 'v-wh6-std', name: 'Standard Edition with Hard Case', sku: 'WH6-STD', priceModifier: 0, stock: 60 }
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Official Sony Electronics Warranty',
    shippingInfo: 'Free 2-day express shipping.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-apple-airpods-pro-3',
    name: 'Apple AirPods Pro (3rd Generation)',
    brand: 'Apple',
    category: 'audio',
    price: 249,
    originalPrice: 279,
    discountPercent: 11,
    rating: 4.85,
    reviewCount: 520,
    stockCount: 75,
    inStock: true,
    sku: 'APL-APP3-USB-C',
    description: 'Breakthrough H3 chip provides 2x more Active Noise Cancellation. Featuring Live Translation audio, Personalized Spatial Audio with dynamic head tracking, heart-rate monitoring, and MagSafe USB-C case with speaker & U2 Find My.',
    shortDescription: 'Next-Gen H3 chip, 2x ANC, Spatial Audio, Heart Rate Sensor, USB-C Case.',
    features: [
      'Active Noise Cancellation enhanced with H3 audio computation',
      'Adaptive Audio seamlessly blends ANC and Transparency in varying noise levels',
      'Personalized Spatial Audio with dynamic head tracking',
      'MagSafe charging case (USB-C) with built-in speaker and lanyard loop'
    ],
    specifications: {
      'Audio Chip': 'Apple H3 headphone chip',
      'Battery': 'Up to 7 hours listening on a single charge; 32 hours total with case',
      'Sensors': 'Skin-detect, Optical in-ear, Motion accelerometer, Heart Rate',
      'Sweat & Water': 'IP54 dust, sweat, and water resistant'
    },
    colors: [
      { name: 'Gloss White', hex: '#FAFAFA' }
    ],
    variants: [
      { id: 'v-app3', name: 'AirPods Pro 3 + MagSafe Case', sku: 'APP3-STD', priceModifier: 0, stock: 75 }
    ],
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '1-Year Apple Limited Hardware Warranty',
    shippingInfo: 'Free expedited delivery on all orders.',
    isBestSeller: true
  },
  {
    id: 'prod-bose-qc-ultra',
    name: 'Bose QuietComfort Ultra Wireless Headphones',
    brand: 'Bose',
    category: 'audio',
    price: 379,
    originalPrice: 429,
    discountPercent: 12,
    rating: 4.8,
    reviewCount: 310,
    stockCount: 30,
    inStock: true,
    sku: 'BOSE-QCU-BLK',
    description: 'World-class active noise cancellation with revolutionary Bose Immersive Audio spatialization. CustomTune sound calibration personalizes audio performance to the unique shape of your ears.',
    shortDescription: 'Bose Immersive Audio, CustomTune technology, Quiet/Aware modes, 24h play.',
    features: [
      'Bose Immersive Audio pushes spatial sound boundaries',
      'CustomTune technology analyzes ear canal for custom frequency curve',
      'Ultra-soft protein leather ear cushions for all-day comfort without fatigue',
      'Crystal-clear calls powered by revolutionary noise-rejecting microphone array'
    ],
    specifications: {
      'Battery Life': 'Up to 24 hours (18 hours with Immersive Audio)',
      'Charging': 'USB-C; 15-minute quick charge yields up to 2.5 hours',
      'Weight': '252 grams',
      'Connectivity': 'Bluetooth 5.3 with multipoint'
    },
    colors: [
      { name: 'Black', hex: '#18181B' },
      { name: 'White Smoke', hex: '#E5E7EB' },
      { name: 'Sandstone Gold', hex: '#D6C7A1' }
    ],
    variants: [
      { id: 'v-bose-qc', name: 'Bose QC Ultra Headset', sku: 'BOS-QCU', priceModifier: 0, stock: 30 }
    ],
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Bose Factory Warranty',
    shippingInfo: 'Free standard shipping.'
  },
  {
    id: 'prod-jbl-boombox-3',
    name: 'JBL Boombox 3 Wi-Fi & Bluetooth Speaker',
    brand: 'JBL',
    category: 'audio',
    price: 499,
    originalPrice: 599,
    discountPercent: 17,
    rating: 4.75,
    reviewCount: 220,
    stockCount: 25,
    inStock: true,
    sku: 'JBL-BB3-WIFI',
    description: 'Massive sound and monstrous bass everywhere. High-definition 3-way acoustic architecture, Wi-Fi 6 streaming with AirPlay & Dolby Atmos 3D audio, IP67 waterproof/dustproof rugged build, and 24 hours of playtime.',
    shortDescription: 'Massive JBL Original Pro Sound, Dolby Atmos over Wi-Fi, 24-hr battery, IP67.',
    features: [
      '3-way speaker design delivering higher acoustic sensitivity and deeper bass',
      'Dual Wi-Fi and Bluetooth connectivity for uninterrupted home streaming',
      'Built-in power bank to charge smartphones on the go',
      'Self-tuning: calibrates sound automatically to room acoustics'
    ],
    specifications: {
      'Output Power': '1x 80W RMS Subwoofer + 2x 40W RMS Midrange + 2x 10W RMS Tweeter',
      'Battery Playtime': 'Up to 24 hours',
      'Waterproof': 'IP67 rated waterproof and dustproof',
      'Weight': '6.7 kg'
    },
    colors: [
      { name: 'Squad Black', hex: '#111827' },
      { name: 'Camouflage Forest', hex: '#3F4E4F' }
    ],
    variants: [
      { id: 'v-jbl-bb3', name: 'JBL Boombox 3 Wi-Fi', sku: 'JBL-BB3', priceModifier: 0, stock: 25 }
    ],
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year JBL Official Replacement Warranty',
    shippingInfo: 'Heavy-duty protective delivery.',
    isDeal: true,
    dealEndsAt: '2026-11-06T12:00:00Z'
  },

  // GAMING
  {
    id: 'prod-playstation-5-pro',
    name: 'Sony PlayStation 5 Pro Console',
    brand: 'Sony',
    category: 'gaming',
    price: 699,
    originalPrice: 749,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 480,
    stockCount: 30,
    inStock: true,
    sku: 'SNY-PS5-PRO-2TB',
    description: 'Witness unrivaled visual fidelity with PlayStation Spectral Super Resolution (PSSR) AI-driven upscaling, 67% more GPU compute units, and advanced Ray Tracing at rock-solid 60fps and 120fps 4K gaming.',
    shortDescription: '2TB High-Speed SSD, PSSR AI Upscaling, 4K 120fps, Advanced Ray Tracing.',
    features: [
      'PlayStation Spectral Super Resolution (PSSR) machine-learning upscaling',
      'Enhanced GPU computing with up to 45% faster graphic rendering',
      'Advanced ray tracing reflections and dynamic illumination at double speed',
      'Includes DualSense wireless controller with adaptive triggers & haptic feedback'
    ],
    specifications: {
      'CPU': 'AMD Ryzen Zen 2, 8 Cores / 16 Threads at 3.5 GHz',
      'GPU': 'RDNA-based graphics engine with 16.7 TFLOPs',
      'Storage': '2TB Custom Ultra-High Speed NVMe SSD (5.5GB/s raw)',
      'Video Output': 'HDMI 2.1 support for 4K 120Hz, 8K, and VRR',
      'Audio': 'Tempest 3D AudioTech engine'
    },
    colors: [
      { name: 'Cosmic Glacier White', hex: '#FFFFFF' }
    ],
    variants: [
      { id: 'v-ps5pro-console', name: 'PS5 Pro 2TB Console', sku: 'PS5-PRO', priceModifier: 0, stock: 20 },
      { id: 'v-ps5pro-bundle', name: 'PS5 Pro + Extra DualSense Controller', sku: 'PS5-PRO-BUN', priceModifier: 70, stock: 10 }
    ],
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Official Sony Interactive Entertainment Warranty',
    shippingInfo: 'Express tracked delivery with adult signature required.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-xbox-series-x',
    name: 'Microsoft Xbox Series X 2TB Galaxy Black',
    brand: 'Microsoft',
    category: 'gaming',
    price: 599,
    originalPrice: 649,
    discountPercent: 8,
    rating: 4.8,
    reviewCount: 310,
    stockCount: 20,
    inStock: true,
    sku: 'MS-XBSX-2TB',
    description: 'The fastest, most powerful Xbox ever. Featuring 12 teraflops of raw graphic processing power, DirectX Raytracing, Quick Resume for multiple titles, and Xbox Velocity Architecture with huge 2TB internal storage.',
    shortDescription: '12 TFLOPS, 2TB Custom SSD, True 4K Gaming, 120 FPS, Quick Resume.',
    features: [
      '12 Teraflops GPU with DirectX Raytracing for photorealistic lighting',
      'Quick Resume: switch instantly between multiple games in suspended states',
      'Xbox Velocity Architecture ensures negligible loading times',
      'Smart Delivery: always play the best version of your games at no extra cost'
    ],
    specifications: {
      'SOC': 'Custom AMD Zen 2 CPU (8x @ 3.8 GHz) & RDNA 2 GPU (52 CUs @ 1.825 GHz)',
      'Memory': '16GB GDDR6 with 320-bit bus',
      'Storage': '2TB Custom NVMe SSD with expansion card slot',
      'Target Performance': 'True 4K at 60 FPS, up to 120 FPS'
    },
    colors: [
      { name: 'Galaxy Black Special Edition', hex: '#0B0F19' }
    ],
    variants: [
      { id: 'v-xbox-2tb', name: 'Xbox Series X 2TB Console', sku: 'XBX-2TB', priceModifier: 0, stock: 20 }
    ],
    images: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Microsoft Limited Warranty',
    shippingInfo: 'Free 2-day domestic dispatch.'
  },
  {
    id: 'prod-logitech-g-pro-superlight',
    name: 'Logitech G PRO X Superlight 2 Wireless Mouse',
    brand: 'Logitech',
    category: 'gaming',
    price: 159,
    originalPrice: 179,
    discountPercent: 11,
    rating: 4.88,
    reviewCount: 345,
    stockCount: 40,
    inStock: true,
    sku: 'LOGI-GPX2-WHT',
    description: 'The champion esports mouse engineered with top tournament pros. Weighing under 60 grams, featuring LIGHTFORCE hybrid optical-mechanical switches, HERO 2 sensor with 32,000 DPI, and true 4,000Hz polling rate.',
    shortDescription: 'Sub-60g ultra-lightweight, HERO 2 32K Sensor, 4KHz Polling, 95h battery.',
    features: [
      'LIGHTFORCE optical-mechanical switches: instant optical actuation with tactile click',
      'HERO 2 32,000 DPI sensor tracking at over 500 IPS',
      'True 4,000Hz wireless polling via LIGHTSPEED technology',
      'Zero-additive PTFE mouse feet for frictionless glide'
    ],
    specifications: {
      'Weight': '60 grams',
      'DPI': '100 - 32,000 DPI',
      'Battery Life': '95 hours continuous motion',
      'Polling Rate': 'Up to 4,000Hz (0.25ms response)'
    },
    colors: [
      { name: 'Matte White', hex: '#FFFFFF' },
      { name: 'Phantom Black', hex: '#18181B' },
      { name: 'Magenta Pink', hex: '#DB2777' }
    ],
    variants: [
      { id: 'v-gpx2', name: 'G PRO X Superlight 2', sku: 'GPX2-STD', priceModifier: 0, stock: 40 }
    ],
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Logitech Limited Hardware Warranty',
    shippingInfo: 'In stock and ready to ship.'
  },

  // SMARTWATCHES
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    brand: 'Apple',
    category: 'smartwatches',
    price: 799,
    originalPrice: 849,
    discountPercent: 6,
    rating: 4.92,
    reviewCount: 410,
    stockCount: 28,
    inStock: true,
    sku: 'APL-AWU2-49',
    description: 'The ultimate sports and adventure watch. Rugged titanium 49mm casing, 3000 nits brightest Apple display, dual-frequency precision GPS, Depth gauge with EN13319 scuba certification, and up to 72 hours battery life in Low Power Mode.',
    shortDescription: '49mm Titanium, 3000 nits, Dual-Frequency GPS, 100m Water Resistance.',
    features: [
      'S9 SiP with Double Tap gesture control and on-device Siri',
      'Precision Dual-Frequency GPS (L1 and L5) with advanced mapping',
      'Depth gauge and water temperature sensor certified for diving to 40 meters',
      'Built-in 86-decibel Emergency Siren audible up to 180 meters'
    ],
    specifications: {
      'Case': '49mm aerospace-grade titanium with raised bezel',
      'Display': 'Always-On Retina OLED, 3,000 nits peak',
      'Battery': 'Up to 36 hours normal use; up to 72 hours in Low Power Mode',
      'Water Resistance': '100m water resistant, high-speed water sports certified',
      'Sensors': 'ECG app, Blood Oxygen, Temperature sensing, Cycle Tracking'
    },
    colors: [
      { name: 'Natural Titanium', hex: '#C0C0C0' },
      { name: 'Titanium Black Edition', hex: '#262626' }
    ],
    variants: [
      { id: 'v-trail-loop', name: 'Trail Loop (Orange/Beige)', sku: 'AWU2-TRL', priceModifier: 0, stock: 15 },
      { id: 'v-ocean-band', name: 'Ocean Band (Navy Blue)', sku: 'AWU2-OCN', priceModifier: 0, stock: 13 }
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Official AppleCare+ Global Protection',
    shippingInfo: 'Free priority air delivery.',
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: 'prod-samsung-galaxy-watch-7-ultra',
    name: 'Samsung Galaxy Watch Ultra 47mm LTE',
    brand: 'Samsung',
    category: 'smartwatches',
    price: 649,
    originalPrice: 699,
    discountPercent: 7,
    rating: 4.78,
    reviewCount: 198,
    stockCount: 22,
    inStock: true,
    sku: 'SAM-GWU-47',
    description: 'Forged from Grade 4 titanium for extreme expeditions. 3nm Exynos processor, BioActive sensor tracking Energy Score and AGEs index, dual-frequency GPS, and 100 hours power-saving mode.',
    shortDescription: '47mm Grade 4 Titanium, 3nm Exynos W1000, 100h battery, Sapphire Crystal.',
    features: [
      'Exynos W1000 3nm 5-core processor with 3x faster app launching',
      'Dual-frequency GPS (L1+L5) with Track Back hiking route navigation',
      'BioActive Sensor: continuous ECG, blood pressure, body composition analysis',
      'Quick Button for instant multi-sport triathlon workout tracking'
    ],
    specifications: {
      'Case': '47mm Titanium Grade 4 with Sapphire Crystal glass',
      'Battery': '590 mAh; up to 100 hours in Exercise Power Saving',
      'Durability': '10ATM + IP68 + MIL-STD-810H',
      'OS': 'Wear OS Powered by Samsung (One UI 6 Watch)'
    },
    colors: [
      { name: 'Titanium Gray with Orange Accent', hex: '#4B5563' },
      { name: 'Titanium White', hex: '#F3F4F6' }
    ],
    variants: [
      { id: 'v-gwu-marine', name: 'Marine Rugged Band', sku: 'GWU-MAR', priceModifier: 0, stock: 12 },
      { id: 'v-gwu-trail', name: 'Trail Fabric Band', sku: 'GWU-TRL', priceModifier: 0, stock: 10 }
    ],
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Samsung Manufacturer Warranty',
    shippingInfo: 'Dispatched within 24 hours.'
  },
  {
    id: 'prod-garmin-fenix-8',
    name: 'Garmin Fenix 8 Pro Solar Sapphire 51mm',
    brand: 'Garmin',
    category: 'smartwatches',
    price: 1099,
    originalPrice: 1199,
    discountPercent: 8,
    rating: 4.95,
    reviewCount: 156,
    stockCount: 14,
    inStock: true,
    sku: 'GAR-FEN8-51',
    description: 'The pinnacle of multisport GPS watches. Power Sapphire solar charging lens providing up to 48 days battery life in smartwatch mode, dive-rated leak-proof inductive buttons, integrated LED flashlight, and offline TopoActive topo maps.',
    shortDescription: '51mm Power Sapphire Solar, 48-Day Battery, Dive Rated, TopoActive Maps.',
    features: [
      'Power Sapphire lens harvests sunlight for indefinite endurance',
      'Integrated multi-LED variable intensity flashlight with red safety beacon',
      'Built-in speaker and mic for voice commands and off-grid voice notes',
      'Preloaded worldwide ski resort and TopoActive multi-continent maps'
    ],
    specifications: {
      'Lens Material': 'Power Sapphire with Titanium Bezel',
      'Battery Life': 'Smartwatch: Up to 48 days with solar; GPS: Up to 149 hours',
      'Display': '1.4" Sunlight-visible transflective memory-in-pixel (MIP)',
      'Water Rating': '10 ATM (Dive rated to 40 meters)'
    },
    colors: [
      { name: 'Carbon Gray DLC Titanium', hex: '#1F2937' }
    ],
    variants: [
      { id: 'v-fenix-51', name: '51mm Sapphire Solar Edition', sku: 'FEN8-51', priceModifier: 0, stock: 14 }
    ],
    images: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Garmin Global Explorer Warranty',
    shippingInfo: 'Insured courier shipping.'
  },

  // CAMERAS
  {
    id: 'prod-sony-alpha-7r-v',
    name: 'Sony Alpha 7R V Full-Frame Mirrorless Camera',
    brand: 'Sony',
    category: 'cameras',
    price: 3899,
    originalPrice: 4199,
    discountPercent: 7,
    rating: 4.93,
    reviewCount: 178,
    stockCount: 12,
    inStock: true,
    sku: 'SNY-ILCE-7RM5',
    description: '61.0 MP back-illuminated Exmor R CMOS sensor paired with an AI processing unit dedicated to subject recognition autofocus (humans, animals, birds, insects, vehicles, airplanes). 8-step in-body image stabilization and 8K 24p cinematic recording.',
    shortDescription: '61.0MP Full-Frame, Dedicated AI Autofocus, 8-stop IBIS, 8K 24p Video.',
    features: [
      'Dedicated AI processing unit recognizes subject poses, eyes, and contours',
      '61.0 Megapixels 35mm full-frame Exmor R BSI CMOS sensor',
      '8.0 stops of in-body optical 5-axis image stabilization',
      '4-axis multi-angle LCD monitor combines tilt and side-opening flip'
    ],
    specifications: {
      'Sensor': '61.0 MP Full-Frame Exmor R BSI CMOS',
      'Autofocus Points': '693 phase-detection points covering 79% of image area',
      'Video': '8K 24p/25p, 4K 60p 10-bit 4:2:2 All-Intra internal',
      'Viewfinder': '9.44 million-dot Quad-XGA OLED EVF (0.90x magnification)',
      'Weight': '723 grams (Body only)'
    },
    colors: [
      { name: 'Pro Matte Black', hex: '#111827' }
    ],
    variants: [
      { id: 'v-a7r5-body', name: 'Body Only', sku: 'A7R5-BODY', priceModifier: 0, stock: 8 },
      { id: 'v-a7r5-lens-kit', name: 'Body + FE 24-70mm F2.8 GM II Lens', sku: 'A7R5-2470', priceModifier: 2200, stock: 4 }
    ],
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '3-Year Sony Pro Imaging Global Warranty',
    shippingInfo: 'High-value insured white glove shipping.',
    isFeatured: true
  },
  {
    id: 'prod-canon-eos-r5-ii',
    name: 'Canon EOS R5 Mark II 8K Cinema Camera',
    brand: 'Canon',
    category: 'cameras',
    price: 4299,
    originalPrice: 4599,
    discountPercent: 7,
    rating: 4.9,
    reviewCount: 134,
    stockCount: 9,
    inStock: true,
    sku: 'CAN-R5M2-BODY',
    description: '45MP back-illuminated stacked sensor with Accelerated Capture processing engine. Eye Control Autofocus, pre-continuous shooting at 30fps electronic shutter, in-camera Neural Network upscaling to 179MP, and 8K 60p RAW video.',
    shortDescription: '45MP Stacked Sensor, DIGIC Accelerator, 8K 60p RAW, Eye Control AF.',
    features: [
      'Accelerated Capture system: DIGIC Accelerator + DIGIC X processor',
      'Eye Control AF: moves the autofocus point wherever you look in the EVF',
      'Action Priority AF recognizes soccer, basketball, and volleyball plays',
      'In-camera deep-learning Neural Network upscales photos to 179 megapixels'
    ],
    specifications: {
      'Sensor': '45.0 Megapixel Full-Frame Back-Illuminated Stacked CMOS',
      'Continuous Shooting': 'Up to 30 fps with electronic shutter and zero blackout',
      'Video Capabilities': '8K 60p RAW internal, 4K 120p, Canon Log 2/3',
      'Stabilization': 'Up to 8.5 stops Coordinated Control IS'
    },
    colors: [
      { name: 'Weather-Sealed Black', hex: '#0F172A' }
    ],
    variants: [
      { id: 'v-r5m2-body', name: 'EOS R5 Mark II Body', sku: 'R52-BODY', priceModifier: 0, stock: 9 }
    ],
    images: [
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Canon Care Enterprise Protection',
    shippingInfo: 'Next-day tracked priority service.'
  },
  {
    id: 'prod-dji-pocket-3',
    name: 'DJI Osmo Pocket 3 Creator Combo',
    brand: 'DJI',
    category: 'cameras',
    price: 669,
    originalPrice: 719,
    discountPercent: 7,
    rating: 4.88,
    reviewCount: 290,
    stockCount: 35,
    inStock: true,
    sku: 'DJI-OP3-CC',
    description: 'Pocket-sized powerhouse with a huge 1-inch CMOS sensor. 2-inch rotatable OLED touchscreen for quick vertical/horizontal vlog recording, 4K 120fps slow motion, 3-axis mechanical gimbal stabilization, and DJI Mic 2 transmitter.',
    shortDescription: '1-inch CMOS Sensor, 4K/120fps, 3-Axis Gimbal, 2" Rotatable Touchscreen.',
    features: [
      '1-inch CMOS sensor captures rich shadows and highlights in low light',
      '2-inch rotatable OLED touch display switches between horizontal and vertical',
      'ActiveTrack 6.0 with face auto-detect and dynamic framing',
      'Includes DJI Mic 2 transmitter with built-in 32-bit float audio recording'
    ],
    specifications: {
      'Sensor': '1-inch CMOS (Equivalent 20mm f/2.0)',
      'ISO Range': '50 - 6400 (Low-light video up to 16,000)',
      'Video Resolution': '4K (16:9): 3840x2160 @ 120fps; 3K (1:1/9:16): 3072x3072',
      'Battery': '1300 mAh with 80% charge in 16 mins (166 mins playtime)'
    },
    colors: [
      { name: 'Matte Graphite', hex: '#334155' }
    ],
    variants: [
      { id: 'v-pocket3-standard', name: 'Standard Single Unit', sku: 'OP3-STD', priceModifier: -150, stock: 20 },
      { id: 'v-pocket3-combo', name: 'Creator Combo with DJI Mic 2', sku: 'OP3-CC', priceModifier: 0, stock: 15 }
    ],
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '1-Year DJI Care Refresh Included',
    shippingInfo: 'Fast dispatch from regional hub.',
    isDeal: true,
    dealEndsAt: '2026-11-03T23:59:59Z'
  },

  // SMART HOME
  {
    id: 'prod-nest-hub-max',
    name: 'Google Nest Hub Max 2 Smart Display',
    brand: 'Google',
    category: 'smart-home',
    price: 229,
    originalPrice: 269,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 380,
    stockCount: 40,
    inStock: true,
    sku: 'GOOG-NHM2-WHT',
    description: 'The smart command center for your modern connected home. 10-inch HD touchscreen, stereo speakers with subwoofer, built-in Nest Cam with Face Match personalization, and Thread border router support.',
    shortDescription: '10" HD Touchscreen, Stereo Speakers + Woofer, Nest Cam with Face Match.',
    features: [
      '10-inch HD display that dynamically adjusts color temperature to ambient lighting',
      'Face Match recognizes your profile and serves your tailored calendar and updates',
      'Matter and Thread smart home hub controlling lights, locks, and climate',
      'Quick Gestures: pause music or timers simply by holding up your hand'
    ],
    specifications: {
      'Display': '10-inch HD touchscreen (1280 x 800)',
      'Camera': '6.5MP camera with 127° wide field of view and auto-framing',
      'Audio': '2x 18mm 10W tweeters + 1x 75mm 30W bass woofer',
      'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, Thread, Matter'
    },
    colors: [
      { name: 'Chalk White', hex: '#E5E7EB' },
      { name: 'Charcoal Black', hex: '#1F2937' }
    ],
    variants: [
      { id: 'v-nest-hub', name: 'Nest Hub Max 2', sku: 'NHM2-STD', priceModifier: 0, stock: 40 }
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '2-Year Google Hardware Guarantee',
    shippingInfo: 'Free 2-day delivery.'
  },
  {
    id: 'prod-philips-hue-starter-kit',
    name: 'Philips Hue Smart Lighting Starter Kit (4 E26 Bulbs + Bridge)',
    brand: 'Philips',
    category: 'smart-home',
    price: 199,
    originalPrice: 229,
    discountPercent: 13,
    rating: 4.82,
    reviewCount: 420,
    stockCount: 50,
    inStock: true,
    sku: 'PHI-HUE-KIT4',
    description: 'Transform your home with 16 million colors and shades of white light. Sync your smart lights with movies, gaming, and music via Spotify integration or Apple HomeKit and Google Assistant.',
    shortDescription: '16 Million Colors, Hue Bridge Included, Music & Movie Sync, 1100 Lumens.',
    features: [
      'Includes 4 White & Color Ambiance E26 bulbs + Hue Smart Bridge',
      '1100 lumens of vivid brightness per bulb with instant dimming',
      'Sync with gaming and TV scenes via Hue Sync PC / TV box',
      'Automated sunrise wake-up cycles and vacation security routines'
    ],
    specifications: {
      'Bulb Base': 'Standard E26, 10.5W LED equivalent to 75W',
      'Color Temperature': '2000K - 6500K + 16 Million Colors',
      'Lifetime': '25,000 hours',
      'Compatibility': 'Apple HomeKit, Google Assistant, Amazon Alexa, Matter'
    },
    colors: [
      { name: 'Color Ambiance', hex: '#A855F7' }
    ],
    variants: [
      { id: 'v-hue-starter', name: '4 Bulbs + Bridge Kit', sku: 'HUE-KIT-4', priceModifier: 0, stock: 50 }
    ],
    images: [
      'https://images.unsplash.com/photo-1550985543-f47f38aeee65?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '3-Year Philips Lighting Limited Warranty',
    shippingInfo: 'Ships within 24 hours.'
  },

  // ACCESSORIES
  {
    id: 'prod-anker-prime-240w',
    name: 'Anker Prime 240W 4-Port GaN Desktop Charging Station',
    brand: 'Anker',
    category: 'accessories',
    price: 149,
    originalPrice: 199,
    discountPercent: 25,
    rating: 4.89,
    reviewCount: 312,
    stockCount: 65,
    inStock: true,
    sku: 'ANK-PRIME-240',
    description: 'Powered by Anker GaNPrime technology. Charges 2 laptops simultaneously at high speeds with up to 140W single-port USB-C PD 3.1 output. Features ActiveShield 2.0 real-time temperature monitoring 3 million times per day.',
    shortDescription: '240W Max Output, GaNPrime Technology, 3 USB-C + 1 USB-A, ActiveShield 2.0.',
    features: [
      '240W ultra-high total output charges up to 4 devices simultaneously',
      'Single USB-C port outputs up to 140W to fast charge 16" MacBook Pro to 50% in 28 mins',
      'ActiveShield 2.0 intelligent thermal safety monitoring',
      'Compact vertical stand saves desk space with detachable base'
    ],
    specifications: {
      'Total Output': '240 Watts',
      'Ports': '3x USB-C (PD 3.1), 1x USB-A',
      'Dimensions': '10.4 x 7.8 x 3.4 cm',
      'Weight': '650 grams'
    },
    colors: [
      { name: 'Space Gray Metallic', hex: '#4B5563' }
    ],
    variants: [
      { id: 'v-anker-240', name: '240W GaN Station + 140W Cable', sku: 'ANK-240-STD', priceModifier: 0, stock: 65 }
    ],
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '24-Month Hassle-Free Anker Replacement Guarantee',
    shippingInfo: 'Free 2-day delivery.',
    isDeal: true,
    dealEndsAt: '2026-11-05T20:00:00Z',
    isBestSeller: true
  },
  {
    id: 'prod-samsung-t9-ssd-4tb',
    name: 'Samsung T9 4TB Rugged Portable SSD (2,000MB/s)',
    brand: 'Samsung',
    category: 'accessories',
    price: 349,
    originalPrice: 399,
    discountPercent: 12,
    rating: 4.91,
    reviewCount: 240,
    stockCount: 32,
    inStock: true,
    sku: 'SAM-T9-4TB',
    description: 'Blazing fast USB 3.2 Gen 2x2 transfer speeds up to 2,000 MB/s. Heavy-duty non-slip silicone exterior resists 3-meter drops and thermal throttling with Dynamic Thermal Guard.',
    shortDescription: '2,000 MB/s Read & Write, 4TB Capacity, USB 3.2 Gen 2x2, 3m Drop Resistance.',
    features: [
      'USB 3.2 Gen 2x2 protocol achieves sequential speeds up to 2,000 MB/s',
      'Dynamic Thermal Guard keeps device at optimal temperature under sustained heavy loads',
      'Compatible with Mac, PC, Android, iPhone 15/16/17 ProRes video recording',
      'Drop resistant up to 3 meters (9.8 feet) with AES 256-bit hardware encryption'
    ],
    specifications: {
      'Capacity': '4 Terabytes (4,000 GB)',
      'Interface': 'USB 3.2 Gen 2x2 (20 Gbps)',
      'Sequential Read/Write': 'Up to 2,000 MB/s',
      'Security': 'Samsung Magician Software with AES 256-bit encryption'
    },
    colors: [
      { name: 'Carbon Black', hex: '#1F2937' }
    ],
    variants: [
      { id: 'v-t9-1tb', name: '1TB', sku: 'T9-1TB', priceModifier: -220, stock: 20 },
      { id: 'v-t9-2tb', name: '2TB', sku: 'T9-2TB', priceModifier: -140, stock: 25 },
      { id: 'v-t9-4tb', name: '4TB', sku: 'T9-4TB', priceModifier: 0, stock: 32 }
    ],
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '5-Year Samsung Limited Manufacturer Warranty',
    shippingInfo: 'Immediate dispatch.'
  },
  {
    id: 'prod-keychron-q1-pro',
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    brand: 'Keychron',
    category: 'accessories',
    price: 199,
    originalPrice: 229,
    discountPercent: 13,
    rating: 4.87,
    reviewCount: 185,
    stockCount: 24,
    inStock: true,
    sku: 'KEY-Q1P-RED',
    description: 'Full CNC machined 6063 aluminum body with double-gasket acoustic mount design. QMK/VIA programmable, hot-swappable Keychron K Pro switches, South-facing RGB lighting, and Mac/Windows switchable layout.',
    shortDescription: '75% Layout, Full CNC Aluminum, Double-Gasket, Hot-Swappable, QMK/VIA.',
    features: [
      'Full CNC machined aluminum body anodized and polished to perfection',
      'Double-gasket design significantly reduces acoustic resonance and enhances typing flex',
      'QMK & VIA support: remap every key and create custom rotary knob macros',
      'Broadcom Bluetooth 5.1 seamlessly connects up to 3 devices simultaneously'
    ],
    specifications: {
      'Layout': '75% with programmable rotary encoder knob',
      'Switches': 'Keychron K Pro Mechanical (Hot-swappable)',
      'Keycaps': 'KSA double-shot PBT keycaps',
      'Battery': '4000 mAh rechargeable li-polymer (up to 300 hrs typing)'
    },
    colors: [
      { name: 'Carbon Black', hex: '#1F2937' },
      { name: 'Silver Gray', hex: '#9CA3AF' },
      { name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    variants: [
      { id: 'v-q1-red', name: 'K Pro Red (Smooth Linear)', sku: 'Q1P-RED', priceModifier: 0, stock: 12 },
      { id: 'v-q1-brown', name: 'K Pro Brown (Gentle Tactile)', sku: 'Q1P-BRN', priceModifier: 0, stock: 12 }
    ],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80'
    ],
    warranty: '1-Year Keychron Hardware Warranty',
    shippingInfo: 'Dispatched in premium protective packaging.'
  }
];

export const BRANDS = [
  'Apple',
  'Samsung',
  'Sony',
  'Dell',
  'HP',
  'Lenovo',
  'ASUS',
  'JBL',
  'Logitech',
  'Canon',
  'Google',
  'OnePlus',
  'Bose',
  'Microsoft',
  'Garmin',
  'DJI',
  'Philips',
  'Anker',
  'Keychron'
];
