import type { ProductReview } from '../types';

export const SAMPLE_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-iphone-17-pro',
    userId: 'user-marcus',
    userName: 'Marcus Sterling',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Unbelievable optical zoom & thermal efficiency',
    comment: 'The vapor chamber cooling is a game changer for long 4K ProRes recordings. No overheating whatsoever, and the titanium finish feels exceptionally solid in the hand.',
    verifiedPurchase: true,
    createdAt: '2026-10-18T14:32:00Z',
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    productId: 'prod-macbook-pro-16',
    userId: 'user-elena',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Blistering compilation speeds for Machine Learning',
    comment: 'Render times in DaVinci Resolve dropped by more than 60% compared to my M1 Max. Battery lasts two full working days with heavy Docker containers running in the background.',
    verifiedPurchase: true,
    createdAt: '2026-10-22T09:15:00Z',
    helpfulCount: 38
  },
  {
    id: 'rev-3',
    productId: 'prod-sony-wh1000xm6',
    userId: 'user-david',
    userName: 'David Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Silent flights and incredible spatial imaging',
    comment: 'Took these on an 11-hour flight to Tokyo. The active noise cancelling made the airplane roar completely disappear. The carbon fiber domes bring out subtle jazz acoustic details.',
    verifiedPurchase: true,
    createdAt: '2026-10-25T19:40:00Z',
    helpfulCount: 29
  },
  {
    id: 'rev-4',
    productId: 'prod-playstation-5-pro',
    userId: 'user-jordan',
    userName: 'Jordan Miller',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'PSSR brings 60fps 4K ray tracing to life',
    comment: 'Finally true 60fps with ray tracing enabled. The image clarity on my 65-inch OLED TV is jaw-dropping. High speed 2TB SSD is huge for holding modern AAA libraries.',
    verifiedPurchase: true,
    createdAt: '2026-10-28T11:20:00Z',
    helpfulCount: 51
  }
];
