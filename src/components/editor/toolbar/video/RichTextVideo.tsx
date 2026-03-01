import React, { useState, useRef } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { RiVideoOnAiLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

const DIRECT_VIDEO_REGEX = /(\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?.*)?$)/i;
const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
const VIMEO_REGEX = /vimeo\.com\/(\d+)/;

const DEFAULT_VIDEO_DIMENSIONS = {
  width: "500px",
  height: "400px",
};

const normalizeVideoSource = (rawSource: string) => {
  const trimmedSource = rawSource.trim();
  if (!trimmedSource) {
    return null;
  }

  if (
    trimmedSource.startsWith("blob:") ||
    DIRECT_VIDEO_REGEX.test(trimmedSource)
  ) {
    return { src: trimmedSource, ...DEFAULT_VIDEO_DIMENSIONS };
  }

  const youtubeMatch = trimmedSource.match(YOUTUBE_REGEX);
  if (youtubeMatch) {
    return {
      src: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      ...DEFAULT_VIDEO_DIMENSIONS,
    };
  }

  const vimeoMatch = trimmedSource.match(VIMEO_REGEX);
  if (vimeoMatch) {
    return {
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      ...DEFAULT_VIDEO_DIMENSIONS,
    };
  }

  return { src: trimmedSource, ...DEFAULT_VIDEO_DIMENSIONS };
};

export const RichTextVideo: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoTab, setVideoTab] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertVideoContent = (source: string) => {
    const normalized = normalizeVideoSource(source);
    if (!normalized) {
      return;
    }

    editor
      .chain()
      .focus()
      .setVideo({
        src: normalized.src,
        width: normalized.width,
        height: normalized.height,
      })
      .run();
  };

  const handleVideoFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        const objectUrl = URL.createObjectURL(file);
        insertVideoContent(objectUrl);
        setDialogOpen(false);
        setVideoUrl("");
        event.target.value = "";
      } else {
        alert("Please select a valid video file.");
      }
    }
  };

  const handleInsertVideo = () => {
    if (!videoUrl.trim()) {
      return;
    }
    insertVideoContent(videoUrl);
    setDialogOpen(false);
    setVideoUrl("");
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Tooltip title="Insert Video" arrow>
        <IconButton size="small" onClick={() => setDialogOpen(true)}>
          <RiVideoOnAiLine />
        </IconButton>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              width: "450px",
              maxWidth: "450px",
              borderRadius: "16px",
              padding: "24px",
            },
          },
        }}
        disableEnforceFocus
      >
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "18px", color: "#333" }}
              >
                Embed or upload a video
              </Typography>
              <IconButton
                size="small"
                onClick={() => setDialogOpen(false)}
                sx={{ padding: "4px" }}
              >
                <MdClose size={20} />
              </IconButton>
            </Box>

            {/* Tab Selection */}
            <Tabs
              value={videoTab}
              onChange={(_, newValue) => setVideoTab(newValue)}
              sx={{
                "& .MuiTabs-root": { minHeight: "36px" },
                "& .MuiTabs-flexContainer": { gap: "4px", padding: "5px" },
                "& .MuiTab-root": {
                  flex: 1,
                  minHeight: "36px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#333",
                  backgroundColor: "#f8f9fa",
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#e9ecef",
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
                    transform: "translateY(-1px)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#333",
                    color: "white",
                    border: "none",
                    boxShadow:
                      "inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(0,0,0,0.2)",
                    transform: "translateY(1px)",
                  },
                },
                "& .MuiTabs-indicator": { display: "none" },
              }}
            >
              <Tab label="Upload" />
              <Tab label="Link" />
            </Tabs>

            {/* Upload Tab */}
            {videoTab === 0 && (
              <Button
                fullWidth
                onClick={handleFileUploadClick}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  borderRadius: "12px",
                  height: "48px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#e55a2b" },
                }}
              >
                Upload
              </Button>
            )}

            {/* Link Tab */}
            {videoTab === 1 && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Link"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        height: "48px",
                        backgroundColor: "#f8f9fa",
                        border: "2px solid #e9ecef",
                        "&:hover": { borderColor: "#dee2e6" },
                        "&.Mui-focused": {
                          borderColor: "#ff6b35",
                          backgroundColor: "#fff",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "12px 16px",
                        fontSize: "14px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }}
                  />

                  <Button
                    onClick={handleInsertVideo}
                    disabled={!videoUrl.trim()}
                    sx={{
                      backgroundColor: "#ff6b35",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      borderRadius: "12px",
                      height: "48px",
                      minWidth: "88px",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#e55a2b" },
                      "&:disabled": {
                        backgroundColor: "#e9ecef",
                        color: "#6c757d",
                      },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoFileChange}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RichTextVideo;
