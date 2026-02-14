# X402 Payment Flow Testing Guide

## Testing Checklist

### ✅ Implementation Tasks Completed

- [x] Install x402-axios and configure wagmi
- [x] Create x402 axios client with wallet signer integration
- [x] Implement usePayment hook for x402 payment flow
- [x] Update ConnectWallet to use real wagmi wallet connection
- [x] Add PaymentTest component for testing
- [x] Configure USDC on Base integration
- [x] Implement transaction confirmations
- [x] Add comprehensive error handling

### 🔧 Build & Compilation

- [x] TypeScript compilation successful
- [x] No type errors
- [x] Production build successful
- [x] Development server starts without errors

### 📦 Dependencies Installed

- [x] x402-axios (v1.1.0)
- [x] axios (v1.7.9)
- [x] wagmi (v2.14.11+)
- [x] viem (v2.27.2+)
- [x] @coinbase/onchainkit (v0.38.19)

## Manual Testing Instructions

### Prerequisites

1. **Wallet Setup:**
   - Install Coinbase Wallet or MetaMask
   - Switch to Base network
   - Have test USDC on Base
   - Have ETH for gas on Base

2. **Environment Variables:**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_API_BASE_URL=https://your-api.com
   ```

### Test Scenarios

#### 1. Wallet Connection

**Steps:**
1. Open app at http://localhost:3000
2. Click "Connect" button in header
3. Select wallet (Coinbase Wallet recommended)
4. Approve connection in wallet

**Expected Result:**
- Button shows truncated address (0x1234...5678)
- Wallet icon visible
- No console errors

#### 2. Payment UI Rendering

**Steps:**
1. Ensure wallet is connected
2. Scroll to "Payment Testing" section
3. Verify UI elements present

**Expected Result:**
- Test endpoint input field visible
- "Test Payment" button enabled
- Info message about x402 flow displayed

#### 3. Payment Flow (with 402 endpoint)

**Prerequisites:**
- Backend API returning 402 with x402 payment requirements
- Sufficient USDC balance
- Sufficient ETH for gas

**Steps:**
1. Connect wallet
2. Enter 402 endpoint URL in test input
3. Click "Test Payment"
4. Approve transaction in wallet
5. Wait for confirmation

**Expected Result:**
- Loading state shown during transaction
- Success message with transaction hash
- Link to BaseScan
- Response data displayed (if any)

#### 4. Error Handling - No Wallet

**Steps:**
1. Disconnect wallet
2. Try to use payment component

**Expected Result:**
- Message: "Connect your wallet to test the x402 payment flow"
- No crash or console errors

#### 5. Error Handling - Insufficient Funds

**Steps:**
1. Connect wallet with 0 USDC
2. Attempt payment

**Expected Result:**
- Error message displayed
- Transaction fails gracefully
- User-friendly error message

#### 6. Error Handling - Invalid Endpoint

**Steps:**
1. Enter invalid/non-existent endpoint
2. Click "Test Payment"

**Expected Result:**
- Network error caught
- Error message displayed
- No crash

### Integration Points to Verify

#### ✅ Wagmi Integration

```typescript
// Check in browser console
window.wagmi // Should be defined
```

#### ✅ OnchainKit Integration

```typescript
// Providers should be properly nested
// WagmiProvider > QueryClientProvider > OnchainKitProvider
```

#### ✅ X402 Client Creation

```typescript
// Should create client with both public and wallet actions
// walletClient.account should exist
// walletClient.chain should be Base
```

#### ✅ Transaction Confirmation

```typescript
// Should wait for transaction confirmation
// Should log: "Transaction confirmed: {...}"
// Should return transaction hash in response
```

### Verification Steps

#### 1. Check Transaction on BaseScan

After successful payment:
1. Copy transaction hash
2. Visit https://basescan.org/tx/[hash]
3. Verify:
   - Transaction successful
   - USDC transfer occurred
   - Correct amount
   - Correct recipient

#### 2. Check Payment Headers

In browser dev tools:
1. Open Network tab
2. Make payment request
3. Check request headers:
   - Should have `X-PAYMENT` header on retry
4. Check response headers:
   - Initial response has `X-PAYMENT-REQUIRED`
   - Retry response may have `X-PAYMENT-RESPONSE`

#### 3. Check Console Logs

Look for:
```
✅ Payment successful
✅ Transaction confirmed: {blockHash, transactionHash, ...}
✅ No errors
```

Avoid:
```
❌ WalletClient must have an account connected
❌ Failed to create x402 client
❌ Payment failed
```

## Known Limitations

1. **Wallet Requirement:** User must have wallet installed
2. **Base Network:** Only works on Base mainnet
3. **USDC Only:** Currently configured for USDC payments
4. **Manual Testing:** Requires 402-enabled backend
5. **Gas Costs:** User pays Base gas fees

## Mock Testing (Without Backend)

For testing UI/UX without a 402 backend:

```typescript
// Mock 402 response
const mockClient = {
  post: async (url, data) => {
    // Simulate 402 response
    throw {
      response: {
        status: 402,
        headers: {
          'x-payment-required': JSON.stringify({
            version: 1,
            scheme: 'exact',
            network: 'base',
            amount: '1000000', // 1 USDC
            token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            recipient: '0xYourRecipientAddress'
          })
        }
      }
    };
  }
};
```

## Next Testing Steps

When backend is ready:

1. **E2E Payment Flow:**
   - [ ] Connect wallet
   - [ ] Make paid request
   - [ ] Confirm payment
   - [ ] Verify backend receives payment
   - [ ] Verify content delivered

2. **Payment Verification:**
   - [ ] Backend validates payment on-chain
   - [ ] Correct amount transferred
   - [ ] Correct recipient
   - [ ] Payment proof valid

3. **Error Scenarios:**
   - [ ] Insufficient balance
   - [ ] Network congestion
   - [ ] Transaction timeout
   - [ ] User rejection
   - [ ] Invalid payment requirements

4. **Performance:**
   - [ ] Payment flow < 30s total
   - [ ] Transaction confirmation < 10s
   - [ ] No memory leaks
   - [ ] No excessive re-renders

## Troubleshooting

### "WalletClient must have an account connected"

- Ensure wallet is properly connected
- Check `useWalletClient()` returns valid client
- Verify account exists: `walletClient?.account`

### "Failed to create x402 client"

- Check wallet has chain configured
- Verify Base network is selected
- Check console for detailed error

### Transaction Fails

- Check USDC balance sufficient
- Check ETH balance for gas
- Verify Base network active
- Check BaseScan for revert reason

### No 402 Response

- Verify backend API is running
- Check endpoint URL correct
- Verify backend returns proper x402 headers
- Check CORS configuration

## Success Criteria

The x402 payment implementation is considered complete when:

✅ All build checks pass  
✅ Wallet connects successfully  
✅ Payment UI renders correctly  
✅ Payment flow executes end-to-end (with proper backend)  
✅ Transactions confirm on Base  
✅ Error handling works for all scenarios  
✅ Documentation is complete  
✅ Code is committed and pushed  

---

**Status:** ✅ Implementation Complete - Ready for Backend Integration Testing
