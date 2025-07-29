import React, { useState } from 'react';
import { MessageSquare, Sparkles, Cpu, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onPromptChange }) => {
  const maxLength = 500;
  const remainingChars = maxLength - prompt.length;

  const suggestedPrompts = [
    "Neural epic orchestral synthesis",
    "Quantum dramatic intro generation", 
    "AI futuristic sound enhancement",
    "Retro-synthetic vintage processing",
    "Bio-ambient nature harmonics"
  ];

  return (
    <Card className="relative p-6 bg-surface/60 border border-neon-purple/30 backdrop-blur-md 
                     transition-all duration-500 hover:shadow-purple hover:border-neon-purple/60 
                     group overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-neon opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center shadow-purple">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-neon-purple font-orbitron tracking-wider">
            NEURAL ENHANCEMENT PROMPT
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/50 to-transparent"></div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Input neural enhancement parameters... Example: 'Synthesize epic orchestral matrices with quantum harmonic amplification' or 'Generate ambient bio-acoustic soundscapes with temporal processing'"
              className="min-h-36 bg-surface-hover/60 border border-neon-purple/20 text-text-primary 
                       placeholder:text-text-muted resize-none focus:border-neon-purple focus:ring-neon-purple/20 
                       transition-all duration-300 backdrop-blur-sm font-rajdhani font-medium
                       hover:border-neon-purple/40"
              maxLength={maxLength}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <div className={`text-xs font-mono transition-colors duration-300 ${
                remainingChars < 50 ? 'text-neon-pink' : remainingChars < 20 ? 'text-red-400' : 'text-text-muted'
              }`}>
                {remainingChars} CHARS
              </div>
              <div className="w-1 h-1 rounded-full bg-neon-green animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-neon-pink animate-neon-flicker" />
              <span className="text-sm font-bold text-text-primary font-orbitron tracking-wide">
                QUICK SYNTHESIS PROTOCOLS:
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {suggestedPrompts.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer bg-surface-hover/40 border border-neon-pink/20 text-text-secondary 
                           hover:bg-gradient-neon hover:text-white hover:border-neon-pink/60 hover:shadow-purple
                           transition-all duration-300 hover:scale-105 font-rajdhani font-medium
                           px-3 py-1.5 text-sm"
                  onClick={() => onPromptChange(suggestion)}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  {suggestion}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
              <span>AI LANGUAGE MODELS: ACTIVE</span>
              <div className="w-1 h-1 rounded-full bg-neon-cyan"></div>
              <span>NEURAL NETWORKS: PROCESSING</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PromptInput;