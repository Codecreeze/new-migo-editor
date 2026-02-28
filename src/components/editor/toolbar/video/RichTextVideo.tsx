import React, { useState, useRef } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tabs, Tab, Box } from '@mui/material';
import { RiVideoOnAiLine } from 'react-icons/ri';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextVideo: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoTab, setVideoTab] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's a valid video file
      if (file.type.startsWith('video/')) {
        const videoUrl = URL.createObjectURL(file);
        setVideoUrl(videoUrl);
      } else {
        alert('Please select a valid video file.');
      }
    }
  };

  const handleInsertVideo = () => {
    if (videoUrl) {
      // Extract YouTube video ID if it's a YouTube URL
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = videoUrl.match(youtubeRegex);
      
      if (match) {
        // Use YouTube extension for YouTube URLs
        editor.chain().focus().setYoutubeVideo({
          src: videoUrl,
          width: 640,
          height: 480,
        }).run();
      } else if (videoUrl.startsWith('blob:')) {
        // For local video files, create a proper video element
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;
        videoElement.style.maxWidth = '100%';
        videoElement.style.height = 'auto';
        videoElement.style.borderRadius = '8px';
        videoElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        videoElement.preload = 'metadata';
        
        // Insert the video element directly
        editor.chain().focus().insertContent({
          type: 'paragraph',
          content: [{
            type: 'text',
            text: ' '
          }]
        }).run();
        
        // Get the current position and insert HTML
        const videoHtml = `<div style="text-align: center; margin: 16px 0;"><video src="${videoUrl}" controls style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" preload="metadata"></video></div>`;
        editor.chain().focus().insertContent(videoHtml).run();
      } else if (videoUrl.includes('vimeo.com')) {
        // Handle Vimeo URLs
        const vimeoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
        if (vimeoId) {
          const vimeoHtml = `<iframe src="https://player.vimeo.com/video/${vimeoId}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          editor.chain().focus().insertContent(vimeoHtml).run();
        }
      } else {
        // For other video URLs, try to detect if it's a direct video file or embed URL
        const isDirectVideo = /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?.*)?$/i.test(videoUrl);
        
        if (isDirectVideo) {
          // Direct video file URL
          const videoHtml = `<div style="text-align: center; margin: 16px 0;"><video src="${videoUrl}" controls style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" preload="metadata"></video></div>`;
          editor.chain().focus().insertContent(videoHtml).run();
        } else {
          // Assume it's an embed URL for iframe
          const videoHtml = `
            <div style="text-align: center; margin: 16px 0;">
              <iframe 
                src="${videoUrl}" 
                width="640" 
                height="480" 
                frameborder="0" 
                allowfullscreen
                style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
              ></iframe>
            </div>
          `;
          editor.chain().focus().insertContent(videoHtml).run();
        }
      }
    }
    setDialogOpen(false);
    setVideoUrl('');
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Tooltip title="Insert Video" arrow>
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
        >
          <RiVideoOnAiLine />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        aria-labelledby="video-dialog-title"
        aria-describedby="video-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="video-dialog-title">Insert Video</DialogTitle>
        <DialogContent id="video-dialog-description">
          <Tabs value={videoTab} onChange={(_, newValue) => setVideoTab(newValue)} sx={{ mb: 2 }}>
            <Tab label="Upload File" />
            <Tab label="YouTube/URL" />
          </Tabs>

          {videoTab === 0 && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleFileUploadClick}
                fullWidth
                sx={{ mb: 2 }}
              >
                Choose Video File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleVideoFileChange}
              />
              {videoUrl && videoUrl.startsWith('blob:') && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <video
                    src={videoUrl}
                    controls
                    style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
                  />
                </Box>
              )}
            </Box>
          )}

          {videoTab === 1 && (
            <TextField
              autoFocus
              margin="dense"
              label="Video URL"
              fullWidth
              variant="outlined"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              helperText="Supports YouTube URLs and other video embed URLs"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} aria-label="Cancel video insertion">Cancel</Button>
          <Button onClick={handleInsertVideo} variant="contained" disabled={!videoUrl} aria-label="Insert video into editor">
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RichTextVideo;
