import React, { useState } from 'react';
import { Play, Download, RotateCcw, Loader2 } from 'lucide-react';
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

  // Simulate processing progress
  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isProcessing]);

  const handleDownload = () => {
    if (resultVideo) {
      const a = document.createElement('a');
      a.href = resultVideo;
      a.download = 'processed-video.mp4';
      a.click();
    }
  };

  return (
    <Card className="p-6 bg-video-surface border-video-border transition-all duration-300 hover:shadow-card-video">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Play className="w-5 h-5 text-video-primary" />
          <h3 className="text-lg font-semibold text-video-text">Result Video</h3>
        </div>
        
        {resultVideo && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReprocess}
              className="text-video-text-muted hover:text-video-text hover:bg-video-surface-hover"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reprocess
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="bg-gradient-primary hover:opacity-90 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </div>

      {isProcessing ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center h-64 bg-video-surface-hover rounded-lg border border-video-border">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-primary animate-pulse mx-auto flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-ping"></div>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-video-text">Processing Your Video</p>
                <p className="text-video-text-muted">Adding sound effects and enhancing audio...</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-video-text-muted">Progress</span>
              <span className="text-video-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-video-surface-hover"
            />
            <p className="text-xs text-video-text-muted">
              This may take a few minutes depending on video length and complexity
            </p>
          </div>
        </div>
      ) : resultVideo ? (
        <div className="space-y-4">
          <video
            src={resultVideo}
            controls
            className="w-full rounded-lg border border-video-border shadow-video"
            style={{ maxHeight: '400px' }}
          />
          
          <div className="p-4 bg-gradient-surface rounded-lg border border-video-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-video-text">Processing Complete</span>
            </div>
            <p className="text-sm text-video-text-muted">
              Your video has been successfully enhanced with the selected audio. 
              You can preview it above or download the final result.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-video-surface-hover rounded-lg border border-video-border">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-video-surface border-2 border-video-border mx-auto flex items-center justify-center">
              <Play className="w-8 h-8 text-video-text-muted" />
            </div>
            <div>
              <p className="text-lg font-medium text-video-text-muted">No Result Yet</p>
              <p className="text-video-text-muted">Upload a video and configure settings to get started</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VideoResult;