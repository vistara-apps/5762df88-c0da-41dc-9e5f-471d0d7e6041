'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Mic, Home as HomeIcon, Zap, Users, Settings2, ChevronRight } from 'lucide-react';
import { ConnectWallet } from './components/ConnectWallet';
import { VoiceCommandInput } from './components/VoiceCommandInput';
import { BlueprintCard } from './components/BlueprintCard';
import { QuickActionCard } from './components/QuickActionCard';
import { ProfileView } from './components/ProfileView';

const blueprintsData = [
  {
    title: "Good Morning Routine",
    description: "सुबह की चाय बनाओ, लाइट चालू करो, समाचार सुनाओ",
    creator: "@priya",
    forkCount: 234,
    category: "morning"
  },
  {
    title: "Dinner Time Ambiance",
    description: "शाम की रोशनी, संगीत चालू करो, तापमान सेट करो",
    creator: "@rahul",
    forkCount: 156,
    category: "evening"
  },
  {
    title: "Bedtime Routine",
    description: "सभी लाइट बंद करो, AC चालू करो, अलार्म सेट करो",
    creator: "@amit",
    forkCount: 198,
    category: "night"
  },
  {
    title: "Movie Night",
    description: "TV चालू करो, लाइट डिम करो, पर्दे बंद करो",
    creator: "@neha",
    forkCount: 142,
    category: "entertainment"
  },
  {
    title: "Workout Mode",
    description: "संगीत तेज करो, लाइट ब्राइट करो",
    creator: "@raj",
    forkCount: 89,
    category: "fitness"
  },
];

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'blueprints' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg" role="main">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-white/10" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
              aria-label="VoiceBound home"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-semibold text-fg">VoiceBound</h1>
                <p className="text-xs text-muted">Hindi AI Control</p>
              </div>
            </button>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in pb-24">
            {/* Voice Command Input */}
            <section aria-label="Voice command input">
              <VoiceCommandInput />
            </section>

            {/* Quick Actions */}
            <section aria-labelledby="quick-actions-heading">
              <h2 id="quick-actions-heading" className="text-lg sm:text-xl font-semibold text-fg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <QuickActionCard
                  icon={<HomeIcon className="w-6 h-6" />}
                  title="Smart Home"
                  subtitle="Controls"
                  onClick={() => console.log('Smart Home')}
                />
                <QuickActionCard
                  icon={<Zap className="w-6 h-6" />}
                  title="Routines"
                  subtitle="Manage"
                  onClick={() => console.log('Routines')}
                />
              </div>
            </section>

            {/* Featured Blueprints */}
            <section aria-labelledby="featured-blueprints-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="featured-blueprints-heading" className="text-lg sm:text-xl font-semibold text-fg">Featured Blueprints</h2>
                <button
                  onClick={() => setActiveTab('blueprints')}
                  className="text-accent text-xs sm:text-sm font-medium flex items-center gap-1 hover:text-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 rounded px-2 py-1"
                  aria-label="View all blueprints"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <BlueprintCard
                  title="Good Morning Routine"
                  description="सुबह की चाय बनाओ, लाइट चालू करो"
                  creator="@priya"
                  forkCount={234}
                  onFork={() => console.log('Fork blueprint')}
                />
                <BlueprintCard
                  title="Dinner Time Ambiance"
                  description="शाम की रोशनी, संगीत चालू करो"
                  creator="@rahul"
                  forkCount={156}
                  onFork={() => console.log('Fork blueprint')}
                />
              </div>
            </section>

            {/* Stats */}
            <section className="bg-surface rounded-lg p-4 sm:p-6 border border-white/10" aria-labelledby="activity-heading">
              <h3 id="activity-heading" className="text-base sm:text-lg font-semibold text-fg mb-4">Your Activity</h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">12</div>
                  <div className="text-xs text-muted mt-1">Commands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">5</div>
                  <div className="text-xs text-muted mt-1">Blueprints</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">89</div>
                  <div className="text-xs text-muted mt-1">Forks</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'blueprints' && (() => {
          const filteredBlueprints = blueprintsData
            .filter(bp => 
              bp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              bp.description.includes(searchQuery) ||
              bp.creator.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => sortBy === 'popular' ? b.forkCount - a.forkCount : 0);

          return (
            <div className="space-y-6 animate-fade-in pb-24">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-fg">Community Blueprints</h2>
                <button
                  onClick={() => setActiveTab('home')}
                  className="text-accent text-sm font-medium hover:text-secondary transition-colors duration-200"
                  aria-label="Back to home"
                >
                  Back to Home
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="search"
                    placeholder="Search blueprints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 pl-10 text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                    aria-label="Search blueprints"
                  />
                  <svg
                    className="w-5 h-5 text-muted absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent')}
                  className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  aria-label="Sort blueprints"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                </select>
              </div>

              {/* Blueprints List */}
              {filteredBlueprints.length > 0 ? (
                <div className="space-y-4">
                  {filteredBlueprints.map((blueprint, idx) => (
                    <BlueprintCard
                      key={idx}
                      title={blueprint.title}
                      description={blueprint.description}
                      creator={blueprint.creator}
                      forkCount={blueprint.forkCount}
                      onFork={() => console.log('Fork blueprint:', blueprint.title)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-surface/50 flex items-center justify-center mb-6 border border-white/10">
                    <svg
                      className="w-10 h-10 text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-2">No blueprints found</h3>
                  <p className="text-sm text-muted max-w-md">
                    Try adjusting your search query or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          );
        })()}

        {activeTab === 'profile' && (
          <ProfileView />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-white/10 z-40 safe-area-inset-bottom" 
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-around py-3 sm:py-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                activeTab === 'home' ? 'text-accent scale-105' : 'text-muted hover:text-fg hover:scale-105'
              }`}
              aria-label="Home"
              aria-current={activeTab === 'home' ? 'page' : undefined}
            >
              <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('blueprints')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                activeTab === 'blueprints' ? 'text-accent scale-105' : 'text-muted hover:text-fg hover:scale-105'
              }`}
              aria-label="Blueprints"
              aria-current={activeTab === 'blueprints' ? 'page' : undefined}
            >
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Blueprints</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition-all duration-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                activeTab === 'profile' ? 'text-accent scale-105' : 'text-muted hover:text-fg hover:scale-105'
              }`}
              aria-label="Profile"
              aria-current={activeTab === 'profile' ? 'page' : undefined}
            >
              <Settings2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-[10px] sm:text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
