import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
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
    "Add epic cinematic music",
    "Create a dramatic intro",
    "Add futuristic sound effects",
    "Make it sound vintage",
    "Add nature ambience"
  ];

  return (
    <Card className="p-6 bg-video-surface border-video-border transition-all duration-300 hover:shadow-card-video">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-5 h-5 text-video-primary" />
        <h3 className="text-lg font-semibold text-video-text">Prompt</h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe how you want to enhance your video with sound... For example: 'Add epic orchestral music that builds up during action scenes' or 'Create ambient nature sounds for a peaceful atmosphere'"
            className="min-h-32 bg-video-surface-hover border-video-border text-video-text placeholder:text-video-text-muted resize-none focus:border-video-primary focus:ring-video-primary/20 transition-all duration-300"
            maxLength={maxLength}
          />
          <div className="absolute bottom-3 right-3">
            <span className={`text-xs transition-colors duration-300 ${
              remainingChars < 50 ? 'text-yellow-400' : remainingChars < 20 ? 'text-red-400' : 'text-video-text-muted'
            }`}>
              {remainingChars} chars left
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-video-accent" />
            <span className="text-sm font-medium text-video-text">Quick suggestions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((suggestion, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer bg-video-surface-hover border-video-border text-video-text hover:bg-gradient-primary hover:text-white transition-all duration-300 hover:scale-105"
                onClick={() => onPromptChange(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PromptInput;