import React, { useState, useRef } from 'react';
import { Upload, Video, X, Zap, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoSelect, selectedVideo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));

    if (videoFile) {
      onVideoSelect(videoFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
  };

  const removeVideo = () => {
    onVideoSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="relative p-6 bg-surface/60 border border-neon-cyan/30 backdrop-blur-md 
                     transition-all duration-500 hover:shadow-neon hover:border-neon-cyan/60 
                     group overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-cyber opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center shadow-neon">
            <Database className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-neon-cyan font-orbitron tracking-wider">
            VIDEO INPUT STREAM
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent"></div>
        </div>

        {selectedVideo ? (
          <div className="space-y-4">
            <div className="relative p-4 bg-surface-hover/60 rounded-xl border border-neon-blue/20 
                           backdrop-blur-sm group-hover:border-neon-blue/40 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center shadow-purple">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary font-rajdhani">{selectedVideo.name}</p>
                    <p className="text-sm text-neon-green font-mono">
                      SIZE: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB • 
                      TYPE: {selectedVideo.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeVideo}
                  className="text-text-muted hover:text-neon-pink hover:bg-surface/50 
                           border border-transparent hover:border-neon-pink/30 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {selectedVideo.type.startsWith('video/') && (
              <div className="relative rounded-xl overflow-hidden border border-neon-cyan/20 shadow-glow">
                <video
                  src={URL.createObjectURL(selectedVideo)}
                  controls
                  className="w-full"
                />
                <div className="absolute inset-0 border border-neon-cyan/30 rounded-xl pointer-events-none"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-500 cursor-pointer ${
              isDragging
                ? 'border-neon-cyan bg-neon-cyan/10 scale-105 shadow-intense'
                : 'border-border-glow hover:border-neon-cyan/50 hover:bg-surface-hover/30'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-6">
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                isDragging 
                  ? 'bg-gradient-cyber shadow-intense animate-pulse-glow' 
                  : 'bg-surface-hover border-2 border-neon-cyan/30'
              }`}>
                <Upload className={`w-10 h-10 transition-all duration-500 ${
                  isDragging ? 'text-white animate-float' : 'text-neon-cyan'
                }`} />
              </div>
              
              <div>
                <p className="text-xl font-bold text-text-primary mb-2 font-orbitron tracking-wide">
                  {isDragging ? 'RELEASING VIDEO STREAM' : 'INITIALIZE DATA UPLOAD'}
                </p>
                <p className="text-text-secondary font-rajdhani font-medium">
                  Drag & drop your video file or{' '}
                  <span className="text-neon-cyan font-bold cursor-pointer hover:text-neon-blue transition-colors">
                    browse quantum storage
                  </span>
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm font-mono">
                  <Zap className="w-4 h-4 text-neon-green" />
                  <span className="text-text-muted">SUPPORTED FORMATS:</span>
                </div>
                <p className="text-sm text-neon-green font-mono font-bold">
                  MP4 • MOV • AVI • WebM • Maximum 100MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoUpload;