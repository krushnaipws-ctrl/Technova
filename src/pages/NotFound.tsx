import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-md space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto font-black text-3xl font-mono">
          404
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            The page you are looking for does not exist or may have been relocated in the TECHNOVA catalog.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => navigate('/products')}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Explore All Electronics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
