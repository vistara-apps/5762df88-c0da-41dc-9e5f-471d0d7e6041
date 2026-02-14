import axios, { AxiosInstance } from 'axios';
import { withPaymentInterceptor } from 'x402-axios';
import type { WalletClient, Account, Chain, Transport } from 'viem';
import { createClient, http, publicActions, walletActions } from 'viem';

export interface X402ClientConfig {
  baseURL: string;
  walletClient: WalletClient;
}

/**
 * Creates an axios client with x402 payment interceptor
 * This client automatically handles payment requests when a 402 response is received
 */
export function createX402Client(config: X402ClientConfig): AxiosInstance {
  const { baseURL, walletClient } = config;

  // Ensure wallet client has an account
  if (!walletClient.account) {
    throw new Error('WalletClient must have an account connected');
  }

  // Ensure wallet client has a chain
  if (!walletClient.chain) {
    throw new Error('WalletClient must have a chain configured');
  }

  // Create a viem client with both public and wallet actions
  // This is required by x402 which expects a SignerWallet type
  const signerClient = createClient({
    account: walletClient.account,
    chain: walletClient.chain,
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions);

  // Create axios instance
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add x402 payment interceptor
  // The interceptor will automatically handle 402 responses by:
  // 1. Extracting payment requirements
  // 2. Creating payment using the signer client
  // 3. Retrying the request with payment header
  return withPaymentInterceptor(client, signerClient);
}

export type { AxiosInstance };
