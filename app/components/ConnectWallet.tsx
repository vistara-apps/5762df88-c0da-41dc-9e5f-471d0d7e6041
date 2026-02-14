'use client';

import {
  ConnectWallet as OnchainKitConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export function ConnectWallet() {
  return (
    <div className="flex items-center">
      <Wallet>
        <OnchainKitConnectWallet className="bg-accent hover:bg-secondary text-white font-medium rounded-lg transition-all duration-200 px-4 py-2">
          <Avatar className="h-6 w-6" />
          <Name />
        </OnchainKitConnectWallet>
        <WalletDropdown className="bg-surface border border-white/10 rounded-lg shadow-xl">
          <Identity className="px-4 py-3 border-b border-white/10" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownDisconnect className="hover:bg-accent/10 px-4 py-2 text-sm text-fg font-medium transition-colors" />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
