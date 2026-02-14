'use client';

import { Users, GitFork, Star, Play } from 'lucide-react';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  return (
    <div
      className="bg-gradient-to-br from-surface/90 to-surface rounded-xl p-6 border border-white/10 hover:border-accent/40 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-accent/20 hover:shadow-xl backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Blueprint: ${title}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-fg group-hover:text-accent transition-colors duration-200 flex-1">
              {title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsStarred(!isStarred);
              }}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isStarred
                  ? 'bg-accent/20 text-accent'
                  : 'bg-white/5 text-muted hover:bg-white/10 hover:text-accent'
              }`}
              aria-label={isStarred ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="text-sm text-muted mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md">
              <Users className="w-3.5 h-3.5" />
              {creator}
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md">
              <GitFork className="w-3.5 h-3.5" />
              {forkCount} forks
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFork();
          }}
          className="flex-1 py-2.5 px-4 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent/50"
          aria-label={`Fork ${title} blueprint`}
        >
          <GitFork className="w-4 h-4" />
          Fork Blueprint
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Preview blueprint');
          }}
          className={`p-2.5 bg-white/5 hover:bg-accent/20 text-muted hover:text-accent rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent/50 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
          }`}
          aria-label={`Preview ${title} blueprint`}
        >
          <Play className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
