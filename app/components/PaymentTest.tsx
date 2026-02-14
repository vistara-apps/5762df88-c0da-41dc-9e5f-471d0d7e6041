'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { usePayment } from '../hooks/usePayment';
import { DollarSign, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function PaymentTest() {
  const { isConnected } = useAccount();
  const { makePayment, isLoading, error, lastTransactionHash } = usePayment();
  const [testEndpoint, setTestEndpoint] = useState('/api/premium-feature');
  const [result, setResult] = useState<any>(null);

  const handleTestPayment = async () => {
    setResult(null);
    
    const response = await makePayment(testEndpoint, {
      feature: 'voice-command-premium',
      timestamp: Date.now(),
    });

    setResult(response);
  };

  if (!isConnected) {
    return (
      <div className="bg-surface rounded-lg p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-semibold text-fg">Payment Testing</h3>
        </div>
        <p className="text-muted text-sm">
          Connect your wallet to test the x402 payment flow
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign className="w-6 h-6 text-accent" />
        <h3 className="text-lg font-semibold text-fg">Payment Testing</h3>
      </div>

      <div className="space-y-4">
        {/* Test Endpoint Input */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Test Endpoint
          </label>
          <input
            type="text"
            value={testEndpoint}
            onChange={(e) => setTestEndpoint(e.target.value)}
            className="w-full px-4 py-2 bg-bg border border-white/10 rounded-lg text-fg focus:outline-none focus:border-accent transition-colors"
            placeholder="/api/premium-feature"
          />
        </div>

        {/* Test Button */}
        <button
          onClick={handleTestPayment}
          disabled={isLoading || !testEndpoint}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-secondary text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              <span>Test Payment</span>
            </>
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-500 mb-1">Payment Failed</p>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Success Display */}
        {result && result.success && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-500 mb-1">Payment Successful</p>
                {result.transactionHash && (
                  <div className="mt-2">
                    <p className="text-xs text-muted mb-1">Transaction Hash:</p>
                    <a
                      href={`https://basescan.org/tx/${result.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-secondary font-mono break-all transition-colors"
                    >
                      {result.transactionHash}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Response Data */}
            {result.data && (
              <div className="p-4 bg-bg border border-white/10 rounded-lg">
                <p className="text-xs text-muted mb-2">Response Data:</p>
                <pre className="text-xs text-fg font-mono overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Last Transaction Hash */}
        {lastTransactionHash && !result && (
          <div className="p-4 bg-bg border border-white/10 rounded-lg">
            <p className="text-xs text-muted mb-2">Last Transaction:</p>
            <a
              href={`https://basescan.org/tx/${lastTransactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:text-secondary font-mono break-all transition-colors"
            >
              {lastTransactionHash}
            </a>
          </div>
        )}

        {/* Info */}
        <div className="p-4 bg-bg border border-accent/30 rounded-lg">
          <p className="text-xs text-muted leading-relaxed">
            <strong className="text-fg">How it works:</strong> When you click "Test Payment", 
            the app will make a request to the endpoint. If it returns a 402 status, 
            the x402 interceptor will automatically initiate a USDC payment on Base 
            and retry the request after payment is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
}
