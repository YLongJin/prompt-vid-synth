import React, { useState, useRef } from 'react';
import { Music, Upload, Play, Pause, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SoundSelectionProps {
  selectedSound: string | File | null;
  onSoundSelect: (sound: string | File) => void;
}

const SoundSelection: React.FC<SoundSelectionProps> = ({ selectedSound, onSoundSelect }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const presetSounds = [
    { id: 'epic-orchestral', name: 'Epic Orchestral', description: 'Dramatic orchestral music' },
    { id: 'ambient-nature', name: 'Ambient Nature', description: 'Peaceful nature sounds' },
    { id: 'electronic-beat', name: 'Electronic Beat', description: 'Modern electronic music' },
    { id: 'cinematic-tension', name: 'Cinematic Tension', description: 'Suspenseful background music' },
    { id: 'upbeat-pop', name: 'Upbeat Pop', description: 'Energetic pop music' },
    { id: 'vintage-jazz', name: 'Vintage Jazz', description: 'Classic jazz atmosphere' },
    { id: 'sci-fi-ambient', name: 'Sci-Fi Ambient', description: 'Futuristic soundscape' },
    { id: 'acoustic-guitar', name: 'Acoustic Guitar', description: 'Gentle acoustic melody' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onSoundSelect(file);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getDisplayName = (sound: string | File | null) => {
    if (!sound) return '';
    if (typeof sound === 'string') {
      const preset = presetSounds.find(p => p.id === sound);
      return preset ? preset.name : sound;
    }
    return sound.name;
  };

  const getAudioSrc = (sound: string | File | null) => {
    if (!sound) return '';
    if (typeof sound === 'string') {
      // For demo purposes, return a placeholder audio URL
      return `https://example.com/audio/${sound}.mp3`;
    }
    return URL.createObjectURL(sound);
  };

  return (
    <Card className="p-6 bg-video-surface border-video-border transition-all duration-300 hover:shadow-card-video">
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-5 h-5 text-video-primary" />
        <h3 className="text-lg font-semibold text-video-text">Sound Selection</h3>
      </div>

      <Tabs defaultValue="presets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-video-surface-hover">
          <TabsTrigger value="presets" className="data-[state=active]:bg-video-primary data-[state=active]:text-white">
            Preset Sounds
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-video-primary data-[state=active]:text-white">
            Upload Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="space-y-4">
          <Select value={typeof selectedSound === 'string' ? selectedSound : ''} onValueChange={onSoundSelect}>
            <SelectTrigger className="bg-video-surface-hover border-video-border text-video-text">
              <SelectValue placeholder="Choose a preset sound..." />
            </SelectTrigger>
            <SelectContent className="bg-video-surface border-video-border">
              {presetSounds.map((sound) => (
                <SelectItem 
                  key={sound.id} 
                  value={sound.id}
                  className="text-video-text hover:bg-video-surface-hover focus:bg-video-surface-hover"
                >
                  <div>
                    <div className="font-medium">{sound.name}</div>
                    <div className="text-sm text-video-text-muted">{sound.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-video-border rounded-lg p-6 text-center hover:border-video-primary/50 transition-colors duration-300">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-video-surface-hover flex items-center justify-center">
                <Upload className="w-6 h-6 text-video-primary" />
              </div>
              
              <div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-primary hover:opacity-90 text-white"
                >
                  Choose Audio File
                </Button>
                <p className="text-sm text-video-text-muted mt-2">
                  Supports MP3, WAV, AAC, OGG
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {selectedSound && (
        <div className="mt-4 p-4 bg-video-surface-hover rounded-lg border border-video-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-video-primary" />
              <div>
                <p className="font-medium text-video-text">{getDisplayName(selectedSound)}</p>
                {typeof selectedSound === 'object' && (
                  <p className="text-sm text-video-text-muted">
                    {(selectedSound.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePlayback}
              className="text-video-text hover:text-video-primary hover:bg-video-surface"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          <audio
            ref={audioRef}
            src={getAudioSrc(selectedSound)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setIsPlaying(false)}
          />
        </div>
      )}
    </Card>
  );
};

export default SoundSelection;