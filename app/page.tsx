'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Mic, Home, Zap, Users, Settings2, ChevronRight } from 'lucide-react';
import { VoiceCommandInput } from './components/VoiceCommandInput';
import { BlueprintCard } from './components/BlueprintCard';
import { ConnectWalletButton } from './components/ConnectWalletButton';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [userContext, setUserContext] = useState<any>(null);

  useEffect(() => {
    // CRITICAL: Call sdk.actions.ready() to prevent infinite loading
    sdk.actions.ready();

    // Get user context from Farcaster
    const context = sdk.context;
    setUserContext(context);
  }, []);

  const quickActions = [
    { icon: Home, label: 'Smart home controls', color: 'bg-blue-500' },
    { icon: Zap, label: 'Smart home controls', color: 'bg-purple-500' },
  ];

  const featuredBlueprints = [
    {
      id: '1',
      name: 'Good Morning Routine',
      description: 'सुबह की दिनचर्या - Turn on lights, start coffee, read news',
      creator: 'priya.eth',
      forkCount: 234,
      category: 'Morning',
    },
    {
      id: '2',
      name: 'Dinner Time Ambiance',
      description: 'रात का खाना - Dim lights, play music, set temperature',
      creator: 'raj.base',
      forkCount: 189,
      category: 'Evening',
    },
    {
      id: '3',
      name: 'Work Focus Mode',
      description: 'काम का समय - Block notifications, adjust lighting',
      creator: 'ananya.eth',
      forkCount: 156,
      category: 'Productivity',
    },
  ];

  return (
    <main className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-fg">VoiceBound</h1>
              <p className="text-xs text-muted">Hindi AI Control</p>
            </div>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-fg mb-4">
            Control Your World with Hindi Voice
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Secure, user-owned voice commands for your devices and smart home. 
            Create, share, and discover Hindi automation blueprints.
          </p>
        </div>

        {/* Voice Input */}
        <VoiceCommandInput 
          isListening={isListening}
          onToggleListening={() => setIsListening(!isListening)}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-4 bg-surface rounded-lg border border-white/10 hover:border-accent transition-all duration-200 group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-fg">{action.label}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Blueprints */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-fg mb-2">
              Community Blueprints
            </h3>
            <p className="text-muted">
              Discover and fork popular Hindi voice automations
            </p>
          </div>
          <button className="flex items-center gap-2 text-accent hover:text-accent-hover transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">View All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBlueprints.map((blueprint) => (
            <BlueprintCard key={blueprint.id} blueprint={blueprint} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-surface rounded-lg border border-white/10 p-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">2.4K+</div>
              <div className="text-sm text-muted">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">580+</div>
              <div className="text-sm text-muted">Blueprints</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">12K+</div>
              <div className="text-sm text-muted">Commands Run</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-accent">
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted hover:text-fg transition-colors">
              <Zap className="w-6 h-6" />
              <span className="text-xs font-medium">Commands</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted hover:text-fg transition-colors">
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">Community</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted hover:text-fg transition-colors">
              <Settings2 className="w-6 h-6" />
              <span className="text-xs font-medium">Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
