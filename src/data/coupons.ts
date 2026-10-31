import type { Coupon } from '../types';

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'TECHNOVA10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 100,
    description: '10% OFF all premium electronics over $100',
    expiryDate: '2026-12-31'
  },
  {
    code: 'SAVE50',
    discountType: 'fixed',
    discountValue: 50,
    minSpend: 500,
    description: '$50 instant reduction on flagship laptops & consoles over $500',
    expiryDate: '2026-12-31'
  },
  {
    code: 'CYBER15',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 250,
    description: '15% Mega Sale discount on accessories & audio gear',
    expiryDate: '2026-11-30'
  },
  {
    code: 'WELCOME20',
    discountType: 'fixed',
    discountValue: 20,
    minSpend: 80,
    description: '$20 OFF first purchase for new club members',
    expiryDate: '2026-12-31'
  }
];
