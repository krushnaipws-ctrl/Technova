import React from 'react';
import { useRouter } from '../../context/RouterContext';

interface BrandItem {
  name: string;
  category: string;
  count: number;
}

const FEATURED_BRANDS: BrandItem[] = [
  { name: 'Apple', category: 'Smartphones & MacBooks', count: 5 },
  { name: 'Samsung', category: 'Galaxy & Displays', count: 4 },
  { name: 'Sony', category: 'PlayStation & Audio', count: 4 },
  { name: 'Dell', category: 'XPS Ultrabooks', count: 2 },
  { name: 'Lenovo', category: 'ThinkPad Workstations', count: 2 },
  { name: 'ASUS', category: 'ROG Gaming Laptops', count: 2 },
  { name: 'JBL', category: 'Pro Audio & Speakers', count: 2 },
  { name: 'Logitech', category: 'Esports Peripherals', count: 2 },
  { name: 'Canon', category: 'Cinema Cameras', count: 2 },
  { name: 'Google', category: 'Pixel & Nest Hubs', count: 3 },
];

export const BrandsGrid: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
            Official Authorized Retailer
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Featured Technology Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Direct partnerships guaranteeing genuine equipment, factory seals, and global manufacturer warranties.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {FEATURED_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => navigate(`/products?brand=${encodeURIComponent(brand.name)}`)}
              className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-center flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-lg font-black tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{brand.category}</div>
              <span className="mt-2 text-[10px] font-bold text-blue-600/80 group-hover:text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {brand.count} Products
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
