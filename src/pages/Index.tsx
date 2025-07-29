import React, { useState } from 'react';
import { Brain, Zap, Cpu, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import VideoUpload from '@/components/VideoUpload';
import PromptInput from '@/components/PromptInput';
import SoundSelection from '@/components/SoundSelection';
import VideoResult from '@/components/VideoResult';

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedSound, setSelectedSound] = useState<string | File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProcessVideo = async () => {
    if (!selectedVideo) {
      toast({
        title: "◉ VIDEO REQUIRED",
        description: "Please upload a video file to initiate processing.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "◉ PROMPT REQUIRED", 
        description: "Please enter enhancement parameters for AI processing.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResultVideo(null);

    // Simulate advanced AI video processing
    setTimeout(() => {
      const videoUrl = URL.createObjectURL(selectedVideo);
      setResultVideo(videoUrl);
      setIsProcessing(false);
      
      toast({
        title: "◉ ENHANCEMENT COMPLETE",
        description: "Neural enhancement algorithms have successfully processed your video.",
      });
    }, 5000);
  };

  const handleReprocess = () => {
    setResultVideo(null);
    handleProcessVideo();
  };

  const canProcess = selectedVideo && prompt.trim() && !isProcessing;

  return (
    <div className="min-h-screen bg-gradient-bg font-rajdhani matrix-bg">
      {/* Futuristic Header */}
      <header className="relative bg-surface/80 border-b border-neon-cyan/30 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-cyber opacity-5"></div>
        <div className="relative scan-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-cyber flex items-center justify-center shadow-neon animate-pulse-glow">
                  <Brain className="w-7 h-7 text-white animate-neon-flicker" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-cyber opacity-20 animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neon-cyan font-orbitron tracking-wider">
                    VIDEO<span className="text-neon-purple">ENHANCE</span><span className="text-white">.AI</span>
                  </h1>
                  <p className="text-text-secondary font-medium tracking-wide">
                    NEURAL VIDEO ENHANCEMENT PROTOCOL v2.47
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Status Indicators */}
                <div className="hidden md:flex items-center gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-neon-green animate-pulse" />
                    <span className="text-neon-green">ONLINE</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-neon-blue" />
                    <span className="text-text-secondary">GPU: 99%</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleProcessVideo}
                  disabled={!canProcess}
                  className="relative bg-gradient-cyber hover:shadow-intense text-white font-bold px-6 py-3 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 
                           border border-neon-cyan/50 hover:border-neon-cyan font-orbitron tracking-wider
                           animate-float"
                >
                  <Zap className="w-5 h-5 mr-2 animate-neon-flicker" />
                  {isProcessing ? 'PROCESSING...' : 'ENHANCE'}
                  {!isProcessing && (
                    <div className="absolute inset-0 bg-gradient-cyber opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interface Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Neural Input Controls */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-cyber rounded-xl blur opacity-25 animate-pulse"></div>
              <VideoUpload 
                selectedVideo={selectedVideo}
                onVideoSelect={setSelectedVideo}
              />
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-neon rounded-xl blur opacity-20 animate-pulse"></div>
              <PromptInput 
                prompt={prompt}
                onPromptChange={setPrompt}
              />
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-matrix rounded-xl blur opacity-15 animate-pulse"></div>
              <SoundSelection 
                selectedSound={selectedSound}
                onSoundSelect={setSelectedSound}
              />
            </div>
          </div>

          {/* Right Panel - Neural Output */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-cyber rounded-xl blur opacity-30 animate-pulse"></div>
              <VideoResult 
                isProcessing={isProcessing}
                resultVideo={resultVideo}
                onReprocess={handleReprocess}
              />
            </div>
            
            {/* AI Processing Info */}
            {!isProcessing && !resultVideo && (
              <div className="relative bg-surface/60 backdrop-blur-md p-6 rounded-xl border border-neon-cyan/20 
                            shadow-card-sci hover:shadow-glow transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-xl"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-neon-cyan mb-4 font-orbitron tracking-wider">
                    NEURAL ENHANCEMENT PROTOCOL
                  </h3>
                  <div className="space-y-4 text-text-secondary">
                    <div className="flex items-start gap-4 group-hover:text-text-primary transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-cyber text-white text-sm flex items-center justify-center 
                                    font-bold font-mono shadow-neon">01</div>
                      <p className="font-medium">Initialize video data stream via quantum uplink</p>
                    </div>
                    <div className="flex items-start gap-4 group-hover:text-text-primary transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-neon text-white text-sm flex items-center justify-center 
                                    font-bold font-mono shadow-purple">02</div>
                      <p className="font-medium">Configure neural enhancement parameters</p>
                    </div>
                    <div className="flex items-start gap-4 group-hover:text-text-primary transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-matrix text-white text-sm flex items-center justify-center 
                                    font-bold font-mono shadow-glow">03</div>
                      <p className="font-medium">Select audio synthesis matrix or upload custom data</p>
                    </div>
                    <div className="flex items-start gap-4 group-hover:text-text-primary transition-colors duration-300">
                      <div className="w-8 h-8 rounded-full bg-gradient-cyber text-white text-sm flex items-center justify-center 
                                    font-bold font-mono shadow-neon">04</div>
                      <p className="font-medium">Execute deep learning enhancement algorithms</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-surface-glow/30 rounded-lg border border-neon-green/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-neon-green animate-pulse" />
                      <span className="text-neon-green font-mono text-sm font-bold">SYSTEM STATUS</span>
                    </div>
                    <p className="text-text-muted text-sm font-mono">
                      Neural networks: ACTIVE • GPU clusters: READY • Quantum processors: STANDBY
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;