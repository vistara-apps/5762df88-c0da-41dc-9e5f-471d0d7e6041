'use client';

import { Wallet } from 'lucide-react';

export function ConnectWalletButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors duration-200">
      <Wallet className="w-4 h-4" />
      <span>Connect</span>
    </button>
  );
}
