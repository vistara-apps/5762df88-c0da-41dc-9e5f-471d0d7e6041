import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

// WalletConnect Project ID - should be set in environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'VoiceBound',
      appLogoUrl: undefined,
      preference: 'smartWalletOnly', // Use Coinbase Smart Wallet for better UX
    }),
    walletConnect({ 
      projectId,
      showQrModal: true,
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});
