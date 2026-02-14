'use client';

import { useState } from 'react';
import { Mic, MicOff, Volume2, X, Check } from 'lucide-react';

const sampleCommands = [
  'सुबह की चाय बनाओ',
  'लाइट चालू करो',
  'संगीत बजाओ',
  'तापमान 24 डिग्री सेट करो',
];

export function VoiceCommandInput() {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setIsSuccess(false);
      // Simulate voice recognition
      setTimeout(() => {
        const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
        setCommand(randomCommand);
        setIsListening(false);
        setIsProcessing(true);
        
        // Simulate processing
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          setCommandHistory(prev => [randomCommand, ...prev].slice(0, 3));
          
          // Reset success state after 2 seconds
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }, 1000);
      }, 2000);
    }
  };

  const clearCommand = () => {
    setCommand('');
    setIsSuccess(false);
  };

  return (
    <div className="bg-gradient-to-br from-surface/80 to-surface rounded-xl p-8 border border-white/10 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Microphone Button with ripple effect */}
        <div className="relative">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </>
          )}
          <button
            onClick={toggleListening}
            disabled={isProcessing}
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-accent shadow-xl shadow-accent/50 scale-110'
                : isProcessing
                ? 'bg-secondary/50 cursor-not-allowed'
                : 'bg-gradient-to-br from-accent to-secondary hover:scale-105 shadow-lg hover:shadow-accent/30'
            } disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-accent/30`}
            aria-label={isListening ? 'Stop listening' : 'Start voice command'}
            aria-pressed={isListening}
          >
            {isListening ? (
              <MicOff className="w-14 h-14 text-white animate-pulse" />
            ) : isProcessing ? (
              <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white" />
            ) : (
              <Mic className="w-14 h-14 text-white" />
            )}
          </button>
        </div>
        
        {/* Status Text */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-fg mb-2 min-h-[28px]">
            {isListening ? (
              <span className="flex items-center gap-2 justify-center">
                <Volume2 className="w-5 h-5 animate-pulse" />
                Listening...
              </span>
            ) : isProcessing ? (
              'Processing...'
            ) : isSuccess ? (
              <span className="flex items-center gap-2 justify-center text-accent">
                <Check className="w-5 h-5" />
                Success!
              </span>
            ) : (
              'Tap to speak'
            )}
          </h3>
          <p className="text-sm text-muted">
            {command || 'Say a Hindi command'}
          </p>
        </div>

        {/* Recognized Command Display */}
        {command && (
          <div className="w-full bg-bg/50 rounded-lg p-4 border border-accent/30 animate-fade-in backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs text-muted mb-1 uppercase tracking-wide">Recognized Command</p>
                <p className="text-fg font-medium text-lg">{command}</p>
              </div>
              <button
                onClick={clearCommand}
                className="p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Clear command"
              >
                <X className="w-4 h-4 text-muted hover:text-fg" />
              </button>
            </div>
          </div>
        )}

        {/* Command History */}
        {commandHistory.length > 0 && (
          <div className="w-full space-y-2">
            <p className="text-xs text-muted uppercase tracking-wide">Recent Commands</p>
            <div className="space-y-2">
              {commandHistory.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => setCommand(cmd)}
                  className="w-full text-left px-4 py-2 bg-bg/30 rounded-lg text-sm text-muted hover:text-fg hover:bg-bg/50 transition-all duration-200 border border-white/5 hover:border-accent/30"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {!command && !isListening && (
          <div className="w-full">
            <p className="text-xs text-muted mb-2 uppercase tracking-wide">Try saying</p>
            <div className="flex flex-wrap gap-2">
              {sampleCommands.slice(0, 3).map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => setCommand(cmd)}
                  className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-xs rounded-full transition-all duration-200 border border-accent/20 hover:border-accent/40"
                  aria-label={`Use suggestion: ${cmd}`}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
