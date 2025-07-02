
import React, { useEffect } from 'react';
import { Button } from './button';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className }) => {
  const { isSupported, isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript, resetTranscript]);

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={isListening ? stopListening : startListening}
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10",
        isListening ? "text-red-400 animate-pulse" : "text-gray-400",
        className
      )}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </Button>
  );
};
