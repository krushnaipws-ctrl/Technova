import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const AnnouncementBar: React.FC = () => {
  const { navigate } = useRouter();

  // Calculated countdown to end of current week sale
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target 3 days from current time
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59, 0);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-b border-blue-900/40 text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center p-1 bg-blue-500/20 text-blue-400 rounded-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </span>
          <span className="font-semibold tracking-wide text-blue-100">
            MEGA TECH SALE — UP TO 40% OFF SELECTED PRODUCTS
          </span>
        </div>

        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>ENDS IN:</span>
            <div className="flex items-center gap-1 font-bold text-white">
              <span className="bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30">
                {formatNumber(timeLeft.hours)}h
              </span>
              <span>:</span>
              <span className="bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30">
                {formatNumber(timeLeft.minutes)}m
              </span>
              <span>:</span>
              <span className="bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30 text-blue-400">
                {formatNumber(timeLeft.seconds)}s
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/products?deals=true')}
            className="group flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 rounded-md text-xs transition-all shadow-sm hover:shadow-blue-500/20"
          >
            <span>Shop Deals</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
