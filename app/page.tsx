'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Mic, Home as HomeIcon, Zap, Users, Settings2, ChevronRight } from 'lucide-react';
import { ConnectWallet } from './components/ConnectWallet';
import { VoiceCommandInput } from './components/VoiceCommandInput';
import { BlueprintCard } from './components/BlueprintCard';
import { QuickActionCard } from './components/QuickActionCard';
import { PaymentTest } from './components/PaymentTest';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'blueprints' | 'profile'>('home');

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
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-fg">VoiceBound</h1>
                <p className="text-xs text-muted">Hindi AI Control</p>
              </div>
            </div>
            <ConnectWallet />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            {/* Voice Command Input */}
            <section>
              <VoiceCommandInput />
            </section>

            {/* Payment Testing */}
            <section>
              <PaymentTest />
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-xl font-semibold text-fg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
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
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-fg">Featured Blueprints</h2>
                <button
                  onClick={() => setActiveTab('blueprints')}
                  className="text-accent text-sm font-medium flex items-center gap-1 hover:text-secondary transition-colors duration-200"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
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
            <section className="bg-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-fg mb-4">Your Activity</h3>
              <div className="grid grid-cols-3 gap-4">
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

        {activeTab === 'blueprints' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-fg">Community Blueprints</h2>
              <button
                onClick={() => setActiveTab('home')}
                className="text-accent text-sm font-medium hover:text-secondary transition-colors duration-200"
              >
                Back to Home
              </button>
            </div>
            <div className="space-y-4">
              <BlueprintCard
                title="Good Morning Routine"
                description="सुबह की चाय बनाओ, लाइट चालू करो, समाचार सुनाओ"
                creator="@priya"
                forkCount={234}
                onFork={() => console.log('Fork blueprint')}
              />
              <BlueprintCard
                title="Dinner Time Ambiance"
                description="शाम की रोशनी, संगीत चालू करो, तापमान सेट करो"
                creator="@rahul"
                forkCount={156}
                onFork={() => console.log('Fork blueprint')}
              />
              <BlueprintCard
                title="Bedtime Routine"
                description="सभी लाइट बंद करो, AC चालू करो, अलार्म सेट करो"
                creator="@amit"
                forkCount={198}
                onFork={() => console.log('Fork blueprint')}
              />
              <BlueprintCard
                title="Movie Night"
                description="TV चालू करो, लाइट डिम करो, पर्दे बंद करो"
                creator="@neha"
                forkCount={142}
                onFork={() => console.log('Fork blueprint')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-around py-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                activeTab === 'home' ? 'text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('blueprints')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                activeTab === 'blueprints' ? 'text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">Blueprints</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                activeTab === 'profile' ? 'text-accent' : 'text-muted hover:text-fg'
              }`}
            >
              <Settings2 className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
