'use client';

import { type ReactNode } from 'react';

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
      className="bg-surface rounded-lg p-6 border border-white/10 hover:border-accent/30 transition-all duration-200 text-left group"
    >
      <div className="flex flex-col gap-3">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-200">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-fg mb-1">{title}</h3>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}
