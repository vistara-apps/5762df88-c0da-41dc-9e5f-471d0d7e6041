# VoiceBound: Hindi AI Control

Secure, user-owned Hindi voice AI for device & smart home control on Base.

## Features

- 🎤 **Personalized Hindi Command Profiles** - Create and manage custom voice commands on-chain
- 🌐 **Community Blueprint Library** - Share and discover voice automation blueprints
- 🔗 **Farcaster Integration** - Voice-activated social actions and community features
- 🔐 **Secure & Private** - User-owned voice profiles with on-chain ownership
- ⚡ **Gas Sponsored** - Seamless transactions with Coinbase Paymaster

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2)
- **Identity**: OnchainKit + Farcaster
- **Styling**: Tailwind CSS with Coinbase theme
- **Voice AI**: Hindi voice recognition integration

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── VoiceCommandInput.tsx
│   ├── BlueprintCard.tsx
│   └── ConnectWalletButton.tsx
├── layout.tsx          # Root layout with providers
├── page.tsx            # Main page
├── providers.tsx       # OnchainKit & React Query providers
└── globals.css         # Global styles with Coinbase theme

public/
└── .well-known/
    └── farcaster.json  # Farcaster Mini App manifest
```

## Key Features Implementation

### Voice Command Input
- Real-time listening state with visual feedback
- Animated microphone button
- Example Hindi commands

### Community Blueprints
- Discoverable automation templates
- Fork and customize functionality
- Creator attribution with Farcaster identity

### Farcaster Integration
- User context from MiniKit
- Social sharing capabilities
- Notification system for community engagement

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - OnchainKit API key for Base integration
- `NEXT_PUBLIC_BASE_RPC_URL` - Base mainnet RPC endpoint
- `NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL` - Base Sepolia testnet RPC endpoint

## License

MIT
