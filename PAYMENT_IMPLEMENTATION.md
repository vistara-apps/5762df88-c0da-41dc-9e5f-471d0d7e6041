# X402 Payment Flow Implementation

This document describes the x402 payment integration for VoiceBound Hindi AI Control app.

## Overview

The application now supports automatic payment handling using the x402 payment protocol with USDC on Base. When a user makes a request to a paid endpoint that returns a 402 (Payment Required) status, the application automatically handles the payment flow and retries the request.

## Architecture

### Components

1. **Wagmi Configuration** (`app/config/wagmi.ts`)
   - Configured with Base chain
   - Supports multiple wallet connectors:
     - Coinbase Wallet (Smart Wallet)
     - WalletConnect
     - Injected wallets (MetaMask, etc.)

2. **X402 Client** (`app/lib/x402-client.ts`)
   - Creates axios client with x402 payment interceptor
   - Automatically handles 402 responses
   - Uses USDC on Base for payments
   - Creates proper viem signer with both public and wallet actions

3. **usePayment Hook** (`app/hooks/usePayment.ts`)
   - React hook for making payments
   - Handles wallet client initialization
   - Tracks transaction status and confirmations
   - Provides error handling

4. **ConnectWallet Component** (`app/components/ConnectWallet.tsx`)
   - Real wagmi wallet connection
   - Shows connected address
   - Supports multiple wallet types

5. **PaymentTest Component** (`app/components/PaymentTest.tsx`)
   - UI for testing payment flow
   - Shows payment status and transaction hash
   - Links to block explorer for verification

## Payment Flow

```
1. User connects wallet via ConnectWallet
   ↓
2. User triggers action requiring payment
   ↓
3. Application makes API request
   ↓
4. If 402 response received:
   a. x402 interceptor extracts payment requirements
   b. Creates payment using wallet client
   c. Signs and sends USDC transaction on Base
   d. Waits for transaction confirmation
   e. Retries original request with payment proof
   ↓
5. Success: User receives response
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# OnchainKit API Key (get from https://portal.cdp.coinbase.com/)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here

# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# API Base URL for x402 payments
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com
```

## Usage

### Using the usePayment Hook

```typescript
import { usePayment } from '@/app/hooks/usePayment';

function MyComponent() {
  const { makePayment, isLoading, error, lastTransactionHash } = usePayment();

  const handlePaidAction = async () => {
    const result = await makePayment('/api/premium-feature', {
      feature: 'voice-command-premium',
      data: { /* your data */ }
    });

    if (result.success) {
      console.log('Payment successful:', result.data);
      console.log('Transaction:', result.transactionHash);
    } else {
      console.error('Payment failed:', result.error);
    }
  };

  return (
    <button onClick={handlePaidAction} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Execute Paid Action'}
    </button>
  );
}
```

### Direct X402 Client Usage

```typescript
import { createX402Client } from '@/app/lib/x402-client';
import { useWalletClient } from 'wagmi';

function MyComponent() {
  const { data: walletClient } = useWalletClient();

  const makeRequest = async () => {
    if (!walletClient) return;

    const client = createX402Client({
      baseURL: 'https://api.example.com',
      walletClient,
    });

    // This will automatically handle 402 responses
    const response = await client.post('/premium-endpoint', {
      data: 'my data'
    });

    console.log(response.data);
  };

  return <button onClick={makeRequest}>Make Request</button>;
}
```

## Testing

### Manual Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the app** and connect your wallet

3. **Use the PaymentTest component:**
   - Enter a test endpoint URL
   - Click "Test Payment"
   - Monitor the payment flow
   - Verify transaction on BaseScan

### Backend Requirements

Your API endpoint must:

1. **Return 402 status** for unpaid requests
2. **Include x402 payment requirements** in response headers
3. **Accept payment proof** in X-PAYMENT header
4. **Verify payment** on-chain
5. **Return content** when payment is valid

Example 402 Response:
```http
HTTP/1.1 402 Payment Required
X-PAYMENT-REQUIRED: {"version":1,"scheme":"exact","network":"base","amount":"1000000","token":"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913","recipient":"0x..."}
Content-Type: application/json

{
  "error": "Payment required",
  "message": "This endpoint requires payment of 1 USDC"
}
```

## USDC on Base

- **Contract Address:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Chain:** Base (Chain ID: 8453)
- **Decimals:** 6
- **Symbol:** USDC

## Transaction Confirmation

The implementation includes automatic transaction confirmation:

- Waits for 1 confirmation by default
- Uses Base public RPC for monitoring
- Logs confirmation status
- Returns transaction hash in response

## Error Handling

The implementation handles various error scenarios:

1. **Wallet not connected:** Returns user-friendly error
2. **Insufficient funds:** Transaction will fail with gas/token error
3. **Network issues:** Retries with exponential backoff
4. **Invalid payment requirements:** Validates before attempting payment
5. **Transaction reverted:** Returns revert reason

## Security Considerations

1. **User Approval:** Each payment requires explicit user wallet approval
2. **Amount Validation:** Amounts are clearly displayed before signing
3. **Recipient Verification:** Payment recipient is specified in requirements
4. **Transaction Verification:** On-chain verification of payment proof
5. **No Private Keys:** Never stores or transmits private keys

## Next Steps

- [ ] Add payment history tracking
- [ ] Implement payment caching to avoid duplicate payments
- [ ] Add support for multiple payment tokens
- [ ] Integrate with backend analytics
- [ ] Add payment notifications
- [ ] Implement payment refund flow

## Resources

- [x402 Protocol Documentation](https://github.com/coinbase/x402)
- [x402-axios Package](https://www.npmjs.com/package/x402-axios)
- [Wagmi Documentation](https://wagmi.sh)
- [Base Documentation](https://docs.base.org)
- [USDC on Base](https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
