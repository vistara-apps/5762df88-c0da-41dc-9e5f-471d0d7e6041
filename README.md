# VoiceBound: Hindi AI Control

A Base Mini App for secure, user-owned Hindi voice AI control of devices and smart homes.

## Features

- 🎤 **Personalized Hindi Command Profiles**: Create and manage custom voice commands on-chain
- 📚 **Community Blueprint Library**: Share and discover voice automation scripts
- 🔗 **Farcaster Integration**: Voice-activated social actions and community features
- 🔐 **Secure & Private**: User-owned voice profiles with on-chain ownership
- 🏠 **Smart Home Control**: Integrate with your devices and home automation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet**: OnchainKit + Coinbase Wallet
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
├── components/          # React components
│   ├── Providers.tsx   # OnchainKit & React Query providers
│   ├── ConnectWallet.tsx
│   ├── VoiceCommandInput.tsx
│   ├── BlueprintCard.tsx
│   └── QuickActionCard.tsx
├── layout.tsx          # Root layout
├── page.tsx            # Main page
└── globals.css         # Global styles

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
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

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_CHAIN_ID`: Base chain ID (8453 for mainnet, 84532 for testnet)
- `NEXT_PUBLIC_RPC_URL`: Base RPC endpoint

## License

MIT
