import { useState, useCallback, useMemo } from 'react';
import { useWalletClient, useAccount, usePublicClient } from 'wagmi';
import { createX402Client, type AxiosInstance } from '../lib/x402-client';
import type { WalletClient } from 'viem';

export interface PaymentResponse {
  success: boolean;
  data?: any;
  error?: string;
  transactionHash?: string;
}

export interface UsePaymentReturn {
  makePayment: (url: string, data?: any) => Promise<PaymentResponse>;
  isLoading: boolean;
  error: string | null;
  lastTransactionHash: string | null;
  client: AxiosInstance | null;
}

/**
 * Hook for making x402 payments with USDC on Base
 * Automatically handles wallet client initialization and payment flow
 */
export function usePayment(apiBaseUrl?: string): UsePaymentReturn {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastTransactionHash, setLastTransactionHash] = useState<string | null>(null);

  // Create x402 client when wallet is connected
  const client = useMemo(() => {
    if (!walletClient || !isConnected) {
      return null;
    }

    try {
      return createX402Client({
        baseURL: apiBaseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || '',
        walletClient: walletClient as WalletClient,
      });
    } catch (err) {
      console.error('Failed to create x402 client:', err);
      return null;
    }
  }, [walletClient, isConnected, apiBaseUrl]);

  /**
   * Make a payment request
   * The x402 interceptor will automatically handle 402 responses
   */
  const makePayment = useCallback(
    async (url: string, data?: any): Promise<PaymentResponse> => {
      if (!client) {
        return {
          success: false,
          error: 'Wallet not connected or client not initialized',
        };
      }

      if (!address) {
        return {
          success: false,
          error: 'No wallet address found',
        };
      }

      setIsLoading(true);
      setError(null);

      try {
        // Make the request - x402 interceptor handles payment automatically
        const response = await client.post(url, data);

        // Check if there's a transaction hash in the response
        const txHash = response.headers['x-transaction-hash'] || response.data?.transactionHash;
        
        if (txHash) {
          setLastTransactionHash(txHash);
          
          // Wait for transaction confirmation if we have a public client
          if (publicClient) {
            try {
              const receipt = await publicClient.waitForTransactionReceipt({
                hash: txHash,
                confirmations: 1,
              });
              
              console.log('Transaction confirmed:', receipt);
            } catch (confirmError) {
              console.warn('Failed to wait for transaction confirmation:', confirmError);
              // Don't fail the whole payment if confirmation checking fails
            }
          }
        }

        setIsLoading(false);
        return {
          success: true,
          data: response.data,
          transactionHash: txHash,
        };
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
        setError(errorMessage);
        setIsLoading(false);
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [client, address, publicClient]
  );

  return {
    makePayment,
    isLoading,
    error,
    lastTransactionHash,
    client,
  };
}
