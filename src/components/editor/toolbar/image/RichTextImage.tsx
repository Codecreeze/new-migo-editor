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
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
} from "@mui/material";
import { RiImageAiLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";
import ImageBubbleMenu from "./ImageBubbleMenu";

export const RichTextImage: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageTab, setImageTab] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        // Insert image directly into editor
        editor
          .chain()
          .focus()
          .setImageExtended({ src: base64, alt: imageAlt })
          .run();
        // Close dialog and reset
        setDialogOpen(false);
        setImageUrl("");
        setImageAlt("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      editor
        .chain()
        .focus()
        .setImageExtended({ src: imageUrl, alt: imageAlt })
        .run();
      setDialogOpen(false);
      setImageUrl("");
      setImageAlt("");
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Tooltip title="Insert Image" arrow>
        <IconButton size="small" onClick={() => setDialogOpen(true)}>
          <RiImageAiLine />
        </IconButton>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              width: "500px",
              maxWidth: "500px",
              maxHeight: "350px",
              borderRadius: "16px",
              padding: "24px",
            },
          },
        }}
        disableEnforceFocus
      >
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                Add an image
              </Typography>
              <IconButton
                size="small"
                onClick={() => setDialogOpen(false)}
                sx={{ padding: "4px" }}
              >
                <MdClose size={20} />
              </IconButton>
            </Box>

            {/* Tab Selection with 3D MUI Tabs */}
            <Tabs
              value={imageTab}
              onChange={(_, newValue) => setImageTab(newValue)}
              sx={{
                "& .MuiTabs-root": {
                  minHeight: "36px",
                },
                "& .MuiTabs-flexContainer": {
                  gap: "4px",
                  padding: "5px",
                },
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
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab label="Upload" />
              <Tab label="Url" />
            </Tabs>

            {/* Upload Tab */}
            {imageTab === 0 && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={false}
                      size="small"
                      sx={{
                        color: "#ff6b35",
                        "&.Mui-checked": { color: "#ff6b35" },
                        padding: 0,
                      }}
                    />
                  }
                  label="Inline"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "#333",
                    },
                    margin: "2px 0",
                    gap: "8px",
                    width: "max-content",
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Alt Text"
                  sx={{
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

                <Box sx={{ display: "flex", gap: 2 }}>
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
                    Upload & Crop
                  </Button>
                </Box>
              </>
            )}

            {/* URL Tab */}
            {imageTab === 1 && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={false}
                      size="small"
                      sx={{
                        color: "#ff6b35",
                        "&.Mui-checked": { color: "#ff6b35" },
                      }}
                    />
                  }
                  label="Inline"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "#333",
                    },
                    margin: "2px 0",
                    gap: "8px",
                    width: "max-content",
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder=""
                  sx={{
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

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
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
                    onClick={handleInsertImage}
                    disabled={!imageUrl.trim()}
                    sx={{
                      backgroundColor: "#ff6b35",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      borderRadius: "12px",
                      height: "48px",
                      minWidth: "80px",
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
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageFileChange}
            />
          </Box>
        </DialogContent>
      </Dialog>
      {editor && <ImageBubbleMenu editor={editor} />}
    </>
  );
};

export default RichTextImage;
