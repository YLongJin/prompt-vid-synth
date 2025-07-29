import React, { useState, useRef } from 'react';
import { Music, Upload, Play, Pause, Volume2, Waves, Radio } from 'lucide-react';
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
    { id: 'neural-orchestral', name: 'Neural Orchestral', description: 'AI-generated epic symphonic matrices' },
    { id: 'quantum-ambient', name: 'Quantum Ambient', description: 'Subatomic soundscape harmonics' },
    { id: 'cyber-pulse', name: 'Cyber Pulse', description: 'Digital rhythmic enhancement algorithms' },
    { id: 'matrix-tension', name: 'Matrix Tension', description: 'Suspenseful neural network patterns' },
    { id: 'synthetic-energy', name: 'Synthetic Energy', description: 'High-frequency motivational waves' },
    { id: 'retro-simulation', name: 'Retro Simulation', description: 'Vintage temporal processing units' },
    { id: 'void-echo', name: 'Void Echo', description: 'Deep space atmospheric synthesis' },
    { id: 'bio-harmonics', name: 'Bio Harmonics', description: 'Organic frequency modulation' }
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
      return `https://example.com/audio/${sound}.mp3`;
    }
    return URL.createObjectURL(sound);
  };

  return (
    <Card className="relative p-6 bg-surface/60 border border-neon-green/30 backdrop-blur-md 
                     transition-all duration-500 hover:shadow-glow hover:border-neon-green/60 
                     group overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-matrix opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-matrix flex items-center justify-center shadow-glow">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-neon-green font-orbitron tracking-wider">
            AUDIO SYNTHESIS MATRIX
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-neon-green/50 to-transparent"></div>
        </div>

        <Tabs defaultValue="presets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-surface-hover/60 border border-neon-green/20">
            <TabsTrigger 
              value="presets" 
              className="data-[state=active]:bg-gradient-matrix data-[state=active]:text-white 
                       font-orbitron font-bold tracking-wide transition-all duration-300
                       data-[state=active]:shadow-glow"
            >
              <Radio className="w-4 h-4 mr-2" />
              NEURAL PRESETS
            </TabsTrigger>
            <TabsTrigger 
              value="upload" 
              className="data-[state=active]:bg-gradient-matrix data-[state=active]:text-white
                       font-orbitron font-bold tracking-wide transition-all duration-300
                       data-[state=active]:shadow-glow"
            >
              <Upload className="w-4 h-4 mr-2" />
              QUANTUM UPLOAD
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <Select value={typeof selectedSound === 'string' ? selectedSound : ''} onValueChange={onSoundSelect}>
              <SelectTrigger className="bg-surface-hover/60 border border-neon-green/20 text-text-primary 
                                     hover:border-neon-green/40 transition-all duration-300 backdrop-blur-sm
                                     font-rajdhani font-medium">
                <SelectValue placeholder="Select neural audio protocol..." />
              </SelectTrigger>
              <SelectContent className="bg-surface border border-neon-green/20 backdrop-blur-md">
                {presetSounds.map((sound) => (
                  <SelectItem 
                    key={sound.id} 
                    value={sound.id}
                    className="text-text-primary hover:bg-surface-hover focus:bg-surface-hover 
                             hover:text-neon-green transition-all duration-300 font-rajdhani"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                      <div>
                        <div className="font-bold">{sound.name}</div>
                        <div className="text-sm text-text-muted">{sound.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-neon-green/30 rounded-xl p-6 text-center 
                          hover:border-neon-green/60 transition-all duration-300 bg-surface-hover/20">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-surface-hover border-2 border-neon-green/30 
                              flex items-center justify-center group-hover:border-neon-green/60 
                              transition-all duration-300">
                  <Upload className="w-8 h-8 text-neon-green" />
                </div>
                
                <div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-matrix hover:shadow-glow text-white font-orbitron font-bold 
                             tracking-wider border border-neon-green/50 hover:border-neon-green
                             transition-all duration-300"
                  >
                    INITIALIZE UPLOAD
                  </Button>
                  <p className="text-sm text-text-muted mt-3 font-mono">
                    COMPATIBLE: MP3 • WAV • AAC • OGG • FLAC
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {selectedSound && (
          <div className="mt-6 p-4 bg-surface-hover/40 rounded-xl border border-neon-blue/20 
                        backdrop-blur-sm space-y-3 hover:border-neon-blue/40 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-neon">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-text-primary font-rajdhani">{getDisplayName(selectedSound)}</p>
                  {typeof selectedSound === 'object' && (
                    <p className="text-sm text-neon-cyan font-mono">
                      SIZE: {(selectedSound.size / (1024 * 1024)).toFixed(2)} MB • 
                      TYPE: {selectedSound.type.split('/')[1].toUpperCase()}
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlayback}
                className="text-text-primary hover:text-neon-cyan hover:bg-surface/50 
                         border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
              <span>AUDIO STREAM: READY</span>
              <div className="w-1 h-1 rounded-full bg-neon-green"></div>
              <span>SYNTHESIS: STANDBY</span>
            </div>

            <audio
              ref={audioRef}
              src={getAudioSrc(selectedSound)}
              onEnded={() => setIsPlaying(false)}
              onError={() => setIsPlaying(false)}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SoundSelection;