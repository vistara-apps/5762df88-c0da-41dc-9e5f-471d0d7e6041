'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';

export function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // In production, this would use OnchainKit's ConnectWallet component
    setIsConnected(!isConnected);
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm"
    >
      <Wallet className="w-4 h-4" />
      {isConnected ? 'Connected' : 'Connect'}
    </button>
  );
}
