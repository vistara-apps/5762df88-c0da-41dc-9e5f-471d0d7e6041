# VoiceBound: Hindi AI Control

A Base Mini App for secure, user-owned Hindi voice AI control of devices and smart homes.

## Features

- 🎤 **Personalized Hindi Command Profiles**: Create and manage custom voice commands on-chain
- 📚 **Community Blueprint Library**: Share and discover voice automation scripts
- 🔗 **Farcaster Integration**: Voice-activated social actions and community features
- 🔐 **Secure & Private**: User-owned voice profiles with on-chain ownership
- 🏠 **Smart Home Control**: Integrate with your devices and home automation
- 💳 **X402 Payment Flow**: Automatic USDC payments on Base for premium features

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: Wagmi + OnchainKit + Coinbase Wallet
- **Payments**: x402 Protocol with USDC on Base
- **Social**: Farcaster Mini App SDK
- **Styling**: Tailwind CSS with Coinbase theme
- **Language**: TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Configure environment variables in `.env.local`:
```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # React components
│   ├── Providers.tsx       # Wagmi + OnchainKit providers
│   ├── ConnectWallet.tsx   # Wallet connection
│   ├── PaymentTest.tsx     # X402 payment testing
│   ├── VoiceCommandInput.tsx
│   ├── BlueprintCard.tsx
│   ├── QuickActionCard.tsx
│   └── ThemeProvider.tsx
├── config/
│   └── wagmi.ts           # Wagmi configuration
├── hooks/
│   └── usePayment.ts      # X402 payment hook
├── lib/
│   └── x402-client.ts     # X402 axios client
├── layout.tsx             # Root layout
├── page.tsx               # Main page
└── globals.css            # Global styles

public/
└── .well-known/
    └── farcaster.json     # Mini App manifest
```

## Key Features Implementation

### Voice Command Input
- Real-time Hindi voice recognition
- Visual feedback during listening
- Command history and suggestions

### Blueprint System
- Community-shared automation scripts
- Fork and customize existing blueprints
- Creator attribution and fork tracking

### Farcaster Integration
- Voice-activated casts
- Social sharing of blueprints
- Community discovery

### X402 Payment System
- Automatic payment handling for premium features
- USDC payments on Base network
- Transaction confirmation and tracking
- Comprehensive error handling
- See [PAYMENT_IMPLEMENTATION.md](./PAYMENT_IMPLEMENTATION.md) for details

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key from [Coinbase Portal](https://portal.cdp.coinbase.com/)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- `NEXT_PUBLIC_API_BASE_URL`: Your API base URL for x402 payments

## Documentation

- [Payment Implementation Guide](./PAYMENT_IMPLEMENTATION.md) - X402 payment flow documentation
- [Testing Guide](./TESTING.md) - Testing instructions and checklist

## License

MIT
