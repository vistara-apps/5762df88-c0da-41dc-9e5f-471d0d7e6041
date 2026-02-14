'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut } from 'lucide-react';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      // Connect with Coinbase Wallet (first connector in our config)
      const coinbaseConnector = connectors.find(c => c.name.includes('Coinbase'));
      if (coinbaseConnector) {
        connect({ connector: coinbaseConnector });
      } else if (connectors[0]) {
        // Fallback to first available connector
        connect({ connector: connectors[0] });
      }
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium text-sm"
    >
      {isConnected ? (
        <>
          <Wallet className="w-4 h-4" />
          <span>{address ? formatAddress(address) : 'Connected'}</span>
          <LogOut className="w-4 h-4" />
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          <span>Connect</span>
        </>
      )}
    </button>
  );
}
