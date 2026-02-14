'use client';

export function SkeletonCard() {
  return (
    <div className="bg-surface rounded-xl p-6 border border-white/10 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
          <div className="flex gap-4 mt-4">
            <div className="h-6 bg-white/10 rounded w-20"></div>
            <div className="h-6 bg-white/10 rounded w-24"></div>
          </div>
        </div>
      </div>
      <div className="h-10 bg-white/10 rounded"></div>
    </div>
  );
}

export function SkeletonQuickAction() {
  return (
    <div className="bg-surface rounded-xl p-6 border border-white/10 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="w-14 h-14 bg-white/10 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="space-y-6 pb-24 animate-pulse">
      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-white/10 rounded w-48"></div>
            <div className="h-4 bg-white/10 rounded w-64"></div>
            <div className="h-5 bg-white/10 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface rounded-lg p-4 border border-white/10">
            <div className="w-10 h-10 bg-white/10 rounded-lg mx-auto mb-2"></div>
            <div className="h-6 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-2/3 mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-lg border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <div className="h-6 bg-white/10 rounded w-32"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-32"></div>
                <div className="h-3 bg-white/10 rounded w-48"></div>
              </div>
            </div>
            <div className="h-10 bg-white/10 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonVoiceInput() {
  return (
    <div className="bg-surface rounded-xl p-8 border border-white/10 animate-pulse">
      <div className="flex flex-col items-center gap-6">
        <div className="w-28 h-28 bg-white/10 rounded-full"></div>
        <div className="text-center space-y-2">
          <div className="h-6 bg-white/10 rounded w-32 mx-auto"></div>
          <div className="h-4 bg-white/10 rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
