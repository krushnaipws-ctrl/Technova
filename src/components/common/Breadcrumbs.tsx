import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useRouter();

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 py-3" aria-label="Breadcrumb">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-900 truncate max-w-xs">{item.label}</span>
            ) : (
              <button
                onClick={() => item.path && navigate(item.path)}
                className="hover:text-blue-600 transition-colors truncate max-w-xs"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
