'use client';

import { type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export function QuickActionCard({
  icon,
  title,
  subtitle,
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-br from-surface/90 to-surface rounded-xl p-6 border border-white/10 hover:border-accent/40 transition-all duration-300 text-left group shadow-lg hover:shadow-accent/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label={`${title} - ${subtitle}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-3 flex-1">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center text-accent group-hover:from-accent group-hover:to-secondary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-fg group-hover:text-accent transition-colors duration-200 mb-1">
              {title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{subtitle}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
