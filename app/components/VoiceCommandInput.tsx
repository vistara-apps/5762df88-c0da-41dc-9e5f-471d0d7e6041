'use client';

import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export function VoiceCommandInput() {
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCommand('सुबह की चाय बनाओ');
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-8 border border-white/10 shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={toggleListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening
              ? 'bg-accent animate-pulse shadow-lg shadow-accent/50'
              : 'bg-gradient-to-br from-accent to-secondary hover:scale-105'
          }`}
        >
          {isListening ? (
            <MicOff className="w-12 h-12 text-white" />
          ) : (
            <Mic className="w-12 h-12 text-white" />
          )}
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-fg mb-2">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </h3>
          <p className="text-sm text-muted">
            {command || 'Say a Hindi command'}
          </p>
        </div>

        {command && (
          <div className="w-full bg-bg rounded-lg p-4 border border-accent/30 animate-fade-in">
            <p className="text-sm text-muted mb-1">Recognized Command:</p>
            <p className="text-fg font-medium">{command}</p>
          </div>
        )}
      </div>
    </div>
  );
}
