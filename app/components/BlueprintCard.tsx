'use client';

import { Users, GitFork } from 'lucide-react';

interface BlueprintCardProps {
  title: string;
  description: string;
  creator: string;
  forkCount: number;
  onFork: () => void;
}

export function BlueprintCard({
  title,
  description,
  creator,
  forkCount,
  onFork,
}: BlueprintCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 border border-white/10 hover:border-accent/30 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-2 group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {creator}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {forkCount} forks
            </span>
          </div>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFork();
        }}
        className="w-full py-2 px-4 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm"
      >
        Fork Blueprint
      </button>
    </div>
  );
}
