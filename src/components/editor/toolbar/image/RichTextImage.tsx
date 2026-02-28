import React, { useState, useRef } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { RiImageAiLine } from "react-icons/ri";
import { useRichTextEditor } from "../RichTextProvider";

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
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    }
    setDialogOpen(false);
    setImageUrl("");
    setImageAlt("");
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
        maxWidth="sm"
        fullWidth
        aria-labelledby="image-dialog-title"
        aria-describedby="image-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="image-dialog-title">Insert Image</DialogTitle>
        <DialogContent id="image-dialog-description">
          <Tabs
            value={imageTab}
            onChange={(_, newValue) => setImageTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Upload File" />
            <Tab label="URL" />
          </Tabs>

          {imageTab === 0 && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleFileUploadClick}
                fullWidth
                sx={{ mb: 2 }}
              >
                Choose Image File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageFileChange}
              />
              {imageUrl && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}

          {imageTab === 1 && (
            <Box sx={{ mt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Image URL"
                fullWidth
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {imageUrl && (
                <Box sx={{ mt: 2, textAlign: "center", justifyContent: "center" }}>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      borderRadius: "4px",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", imageUrl);
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </Box>
              )}
            </Box>
          )}

          <TextField
            margin="dense"
            label="Alt Text"
            fullWidth
            variant="outlined"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Description of the image"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            aria-label="Cancel image insertion"
          >
            Cancel
          </Button>
          <Button
            onClick={handleInsertImage}
            variant="contained"
            disabled={!imageUrl}
            aria-label="Insert image into editor"
          >
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RichTextImage;
