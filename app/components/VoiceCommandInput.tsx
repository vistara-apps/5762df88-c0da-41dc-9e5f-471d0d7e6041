'use client';

import { Mic, MicOff } from 'lucide-react';

interface VoiceCommandInputProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceCommandInput({ isListening, onToggleListening }: VoiceCommandInputProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Listening Animation */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-accent/20 animate-pulse" />
            <div className="absolute w-24 h-24 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="absolute w-16 h-16 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        {/* Microphone Button */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <button
            onClick={onToggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-accent shadow-lg shadow-accent/50 scale-110'
                : 'bg-surface border-2 border-accent hover:bg-accent/10'
            }`}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 text-white" />
            ) : (
              <Mic className="w-10 h-10 text-accent" />
            )}
          </button>

          <div className="text-center">
            <p className="text-lg font-medium text-fg mb-2">
              {isListening ? 'Listening...' : 'Hindi commands'}
            </p>
            <p className="text-sm text-muted">
              {isListening 
                ? 'Say your command in Hindi' 
                : 'Tap the microphone to start'}
            </p>
          </div>
        </div>
      </div>

      {/* Example Commands */}
      {!isListening && (
        <div className="mt-8 space-y-3">
          <p className="text-sm font-medium text-muted text-center mb-4">
            Try saying:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              'सुबह की चाय बनाओ',
              'लाइट बंद करो',
              'फार्कस्टर पर पोस्ट करो',
            ].map((command, index) => (
              <button
                key={index}
                className="px-4 py-3 bg-surface rounded-lg border border-white/10 text-sm text-fg hover:border-accent transition-all duration-200 text-left"
              >
                "{command}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
