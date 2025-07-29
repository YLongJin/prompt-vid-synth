import React, { useState, useRef } from 'react';
import { Upload, Video, X } from 'lucide-react';
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
    <Card className="p-6 bg-video-surface border-video-border transition-all duration-300 hover:shadow-card-video">
      <div className="flex items-center gap-3 mb-4">
        <Video className="w-5 h-5 text-video-primary" />
        <h3 className="text-lg font-semibold text-video-text">Video Input</h3>
      </div>

      {selectedVideo ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-video-surface-hover rounded-lg border border-video-border">
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-video-primary" />
              <div>
                <p className="font-medium text-video-text">{selectedVideo.name}</p>
                <p className="text-sm text-video-text-muted">
                  {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeVideo}
              className="text-video-text-muted hover:text-video-text hover:bg-video-surface"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {selectedVideo.type.startsWith('video/') && (
            <video
              src={URL.createObjectURL(selectedVideo)}
              controls
              className="w-full rounded-lg border border-video-border"
            />
          )}
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-video-primary bg-video-primary/10 scale-105'
              : 'border-video-border hover:border-video-primary/50 hover:bg-video-surface-hover'
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
          
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDragging ? 'bg-gradient-primary shadow-glow' : 'bg-video-surface-hover'
            }`}>
              <Upload className={`w-8 h-8 transition-colors duration-300 ${
                isDragging ? 'text-white' : 'text-video-primary'
              }`} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-video-text mb-1">
                {isDragging ? 'Drop your video here' : 'Drag & drop your video'}
              </p>
              <p className="text-video-text-muted">
                or <span className="text-video-primary">click to browse</span>
              </p>
            </div>
            
            <p className="text-sm text-video-text-muted">
              Supports MP4, MOV, AVI, WebM (Max: 100MB)
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default VideoUpload;