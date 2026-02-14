'use client';

import { Users, GitFork, ChevronRight } from 'lucide-react';

interface Blueprint {
  id: string;
  name: string;
  description: string;
  creator: string;
  forkCount: number;
  category: string;
}

interface BlueprintCardProps {
  blueprint: Blueprint;
}

export function BlueprintCard({ blueprint }: BlueprintCardProps) {
  return (
    <div className="bg-surface rounded-lg border border-white/10 p-6 hover:border-accent transition-all duration-200 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded">
              {blueprint.category}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-fg mb-2 group-hover:text-accent transition-colors">
            {blueprint.name}
          </h4>
          <p className="text-sm text-muted line-clamp-2">
            {blueprint.description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors flex-shrink-0" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Users className="w-4 h-4" />
          <span>{blueprint.creator}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          <GitFork className="w-4 h-4" />
          <span>{blueprint.forkCount}</span>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors duration-200">
        Fork Blueprint
      </button>
    </div>
  );
}
