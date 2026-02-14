'use client';

import { useAccount } from 'wagmi';
import { Avatar, Name, Address, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { Settings, Mic, GitFork, Zap, Bell, Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function ProfileView() {
  const { address, isConnected } = useAccount();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('hindi');

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-4">
          <Settings className="w-10 h-10 text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-fg mb-2">Connect Your Wallet</h3>
        <p className="text-sm text-muted text-center max-w-sm">
          Connect your wallet to access your profile, settings, and personalized features.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg p-6 border border-white/10">
        <Identity className="mb-4" hasCopyAddressOnClick>
          <Avatar className="w-16 h-16" />
          <div className="ml-4 flex flex-col gap-2">
            <Name className="text-xl font-semibold text-fg" />
            <Address className="text-sm text-muted" />
            <EthBalance className="text-base font-medium text-accent" />
          </div>
        </Identity>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg p-4 border border-white/10 text-center">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <Mic className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-bold text-fg">127</div>
          <div className="text-xs text-muted mt-1">Commands</div>
        </div>
        <div className="bg-surface rounded-lg p-4 border border-white/10 text-center">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-2">
            <GitFork className="w-5 h-5 text-secondary" />
          </div>
          <div className="text-2xl font-bold text-fg">23</div>
          <div className="text-xs text-muted mt-1">Blueprints</div>
        </div>
        <div className="bg-surface rounded-lg p-4 border border-white/10 text-center">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <Zap className="w-5 h-5 text-accent" />
          </div>
          <div className="text-2xl font-bold text-fg">456</div>
          <div className="text-xs text-muted mt-1">Actions</div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-surface rounded-lg border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-fg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h3>
        </div>

        {/* Language Setting */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-sm font-medium text-fg">Language</div>
              <div className="text-xs text-muted">Voice command language</div>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-bg border border-white/20 rounded-lg px-3 py-2 text-sm text-fg focus:border-accent focus:outline-none transition-colors"
            aria-label="Select language"
          >
            <option value="hindi">हिन्दी (Hindi)</option>
            <option value="english">English</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Theme Setting */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-secondary" />
              ) : (
                <Sun className="w-5 h-5 text-secondary" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-fg">Theme</div>
              <div className="text-xs text-muted">App appearance</div>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 bg-bg border border-white/20 rounded-lg text-sm text-fg hover:border-accent transition-all duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>

        {/* Notifications Setting */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-sm font-medium text-fg">Notifications</div>
              <div className="text-xs text-muted">Command alerts</div>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              notificationsEnabled ? 'bg-accent' : 'bg-bg border border-white/20'
            }`}
            role="switch"
            aria-checked={notificationsEnabled}
            aria-label="Toggle notifications"
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-fg mb-3">About VoiceBound</h3>
        <p className="text-sm text-muted mb-3">
          Version 1.0.0
        </p>
        <p className="text-sm text-muted leading-relaxed">
          VoiceBound is a secure, user-owned Hindi voice AI control system for devices and smart homes, built on Base.
        </p>
      </div>
    </div>
  );
}
