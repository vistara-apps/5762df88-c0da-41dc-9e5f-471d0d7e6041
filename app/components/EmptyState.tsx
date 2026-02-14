'use client';

import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-surface/50 flex items-center justify-center mb-6 border border-white/10">
        <div className="text-muted">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-fg mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md mb-6 leading-relaxed">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-red-950/50 flex items-center justify-center mb-6 border border-red-400/20">
        <svg
          className="w-10 h-10 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-fg mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-md mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
