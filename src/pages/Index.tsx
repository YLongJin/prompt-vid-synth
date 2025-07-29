import React, { useState } from 'react';
import { Wand2, Zap } from 'lucide-react';
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
        title: "Video Required",
        description: "Please upload a video file first.",
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description of how you want to enhance your video.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResultVideo(null);

    // Simulate video processing
    setTimeout(() => {
      // For demo purposes, use the original video as result
      const videoUrl = URL.createObjectURL(selectedVideo);
      setResultVideo(videoUrl);
      setIsProcessing(false);
      
      toast({
        title: "Processing Complete!",
        description: "Your video has been successfully enhanced with audio.",
      });
    }, 5000);
  };

  const handleReprocess = () => {
    setResultVideo(null);
    handleProcessVideo();
  };

  const canProcess = selectedVideo && prompt.trim() && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-video-surface border-b border-video-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-video-text">VideoEnhance AI</h1>
                <p className="text-video-text-muted">Transform your videos with intelligent audio enhancement</p>
              </div>
            </div>
            
            <Button
              onClick={handleProcessVideo}
              disabled={!canProcess}
              className="bg-gradient-primary hover:opacity-90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-video"
            >
              <Zap className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Enhance Video'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Controls */}
          <div className="space-y-6">
            <VideoUpload 
              selectedVideo={selectedVideo}
              onVideoSelect={setSelectedVideo}
            />
            
            <PromptInput 
              prompt={prompt}
              onPromptChange={setPrompt}
            />
            
            <SoundSelection 
              selectedSound={selectedSound}
              onSoundSelect={setSelectedSound}
            />
          </div>

          {/* Right Column - Result */}
          <div className="space-y-6">
            <VideoResult 
              isProcessing={isProcessing}
              resultVideo={resultVideo}
              onReprocess={handleReprocess}
            />
            
            {/* Processing Info */}
            {!isProcessing && !resultVideo && (
              <div className="bg-gradient-surface p-6 rounded-xl border border-video-border">
                <h3 className="text-lg font-semibold text-video-text mb-3">How it works</h3>
                <div className="space-y-3 text-video-text-muted">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-video-primary text-white text-sm flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
                    <p>Upload your video file using drag & drop or file picker</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-video-primary text-white text-sm flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
                    <p>Describe how you want to enhance your video with audio</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-video-primary text-white text-sm flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
                    <p>Choose a preset sound or upload your own audio file</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-video-primary text-white text-sm flex items-center justify-center mt-0.5 flex-shrink-0">4</div>
                    <p>Click "Enhance Video" and let our AI work its magic</p>
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