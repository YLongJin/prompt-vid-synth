import React, { useState } from 'react';
import { Play, Download, RotateCcw, Loader2, Monitor, Cpu, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VideoResultProps {
  isProcessing: boolean;
  resultVideo: string | null;
  onReprocess: () => void;
}

const VideoResult: React.FC<VideoResultProps> = ({ isProcessing, resultVideo, onReprocess }) => {
  const [progress, setProgress] = useState(0);

  // Simulate neural processing progress
  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 8;
        });
      }, 400);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isProcessing]);

  const handleDownload = () => {
    if (resultVideo) {
      const a = document.createElement('a');
      a.href = resultVideo;
      a.download = 'enhanced-video-neural.mp4';
      a.click();
    }
  };

  return (
    <Card className="relative p-6 bg-surface/60 border border-neon-cyan/30 backdrop-blur-md 
                     transition-all duration-500 hover:shadow-neon hover:border-neon-cyan/60 
                     group overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-neon">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neon-cyan font-orbitron tracking-wider">
              NEURAL OUTPUT STREAM
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent"></div>
          </div>
          
          {resultVideo && (
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReprocess}
                className="text-text-muted hover:text-neon-purple hover:bg-surface/50 
                         border border-transparent hover:border-neon-purple/30 transition-all duration-300
                         font-orbitron font-bold tracking-wide"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                REPROCESS
              </Button>
              <Button
                size="sm"
                onClick={handleDownload}
                className="bg-gradient-cyber hover:shadow-intense text-white font-orbitron font-bold 
                         tracking-wider border border-neon-cyan/50 hover:border-neon-cyan
                         transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                EXTRACT
              </Button>
            </div>
          )}
        </div>

        {isProcessing ? (
          <div className="space-y-8">
            <div className="flex items-center justify-center h-72 bg-surface-hover/40 rounded-xl 
                          border border-neon-cyan/20 backdrop-blur-sm relative overflow-hidden">
              
              {/* Processing animation background */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 animate-pulse"></div>
              
              <div className="relative text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-cyber animate-pulse-glow mx-auto 
                                flex items-center justify-center shadow-intense">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-cyber opacity-30 animate-ping"></div>
                  <div className="absolute -inset-4 rounded-full border-2 border-neon-cyan/20 animate-spin"></div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-2xl font-bold text-neon-cyan font-orbitron tracking-wider">
                    NEURAL PROCESSING ACTIVE
                  </p>
                  <p className="text-text-secondary font-rajdhani font-medium">
                    Deep learning algorithms enhancing audio-visual matrices...
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 text-sm font-mono mt-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-neon-green animate-pulse" />
                      <span className="text-neon-green">GPU: ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-neon-blue animate-neon-flicker" />
                      <span className="text-neon-blue">AI: PROCESSING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-text-muted">NEURAL ENHANCEMENT PROGRESS</span>
                <span className="text-neon-cyan font-bold">{Math.round(progress)}% COMPLETE</span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-3 bg-surface-hover border border-neon-cyan/20"
                />
                <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-full"></div>
              </div>
              
              <div className="p-3 bg-surface-glow/20 rounded-lg border border-neon-green/20">
                <p className="text-xs text-text-muted font-mono">
                  <span className="text-neon-green">◉</span> QUANTUM PROCESSORS: ENGAGED • 
                  <span className="text-neon-blue">◉</span> NEURAL NETWORKS: COMPUTING • 
                  <span className="text-neon-purple">◉</span> SYNTHESIS MATRIX: ACTIVE
                </p>
              </div>
            </div>
          </div>
        ) : resultVideo ? (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-neon-cyan/30 shadow-neon">
              <video
                src={resultVideo}
                controls
                className="w-full"
                style={{ maxHeight: '400px' }}
              />
              <div className="absolute inset-0 border border-neon-cyan/40 rounded-xl pointer-events-none"></div>
            </div>
            
            <div className="p-6 bg-gradient-surface rounded-xl border border-neon-green/20 
                          hover:border-neon-green/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse shadow-glow"></div>
                <span className="text-lg font-bold text-neon-green font-orbitron tracking-wide">
                  ENHANCEMENT PROTOCOL COMPLETE
                </span>
              </div>
              <p className="text-text-secondary font-rajdhani font-medium">
                Neural enhancement algorithms have successfully processed your video stream. 
                Advanced AI synthesis has been applied with quantum-level precision. 
                Download the enhanced output or initiate reprocessing with modified parameters.
              </p>
              
              <div className="mt-4 flex items-center gap-4 text-sm font-mono text-text-muted">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                  <span>QUALITY: ENHANCED</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                  <span>SYNTHESIS: COMPLETE</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span>STATUS: READY</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-72 bg-surface-hover/40 rounded-xl 
                        border-2 border-dashed border-border-glow backdrop-blur-sm 
                        hover:border-neon-cyan/50 transition-all duration-500">
            <div className="text-center space-y-4">
              <div className="relative w-20 h-20 rounded-full bg-surface border-2 border-border-glow mx-auto 
                            flex items-center justify-center group-hover:border-neon-cyan/50 
                            transition-all duration-500">
                <Play className="w-10 h-10 text-text-muted group-hover:text-neon-cyan transition-colors duration-500" />
                <div className="absolute inset-0 rounded-full border border-transparent 
                              group-hover:border-neon-cyan/20 group-hover:animate-pulse"></div>
              </div>
              <div>
                <p className="text-xl font-bold text-text-muted font-orbitron tracking-wide mb-2">
                  AWAITING INPUT STREAM
                </p>
                <p className="text-text-muted font-rajdhani">
                  Configure neural parameters and initiate enhancement protocol
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoResult;