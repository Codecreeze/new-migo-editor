import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { FiLink } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextLink: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const handleSetLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run();
      }
    }
    setDialogOpen(false);
    setLinkText("");
    setLinkUrl("");
  };

  return (
    <>
      <Tooltip title="Insert Link" arrow>
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          <FiLink />
        </IconButton>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              width: "400px",
              maxWidth: "400px",
              borderRadius: "16px",
              padding: "24px",
            },
          },
        }}
        disableEnforceFocus
      >
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                Add Link
              </Typography>
              <IconButton
                size="small"
                onClick={() => setDialogOpen(false)}
                sx={{ padding: "4px" }}
              >
                <MdClose size={20} />
              </IconButton>
            </Box>

            {/* Text Field */}

            <TextField
              fullWidth
              variant="outlined"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Enter Text"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  height: "48px",
                  backgroundColor: "#f8f9fa",
                  border: "2px solid #e9ecef",
                  "&:hover": {
                    borderColor: "#dee2e6",
                  },
                  "&.Mui-focused": {
                    borderColor: "#ff6b35",
                    backgroundColor: "#fff",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 16px",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />

            {/* Link Field */}
            <Box>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      height: "48px",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid #e9ecef",
                      paddingLeft: "48px",
                      "&:hover": {
                        borderColor: "#dee2e6",
                      },
                      "&.Mui-focused": {
                        borderColor: "#ff6b35",
                        backgroundColor: "#fff",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "12px 16px 12px 0",
                      fontSize: "14px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                >
                  <FiLink size={16} />
                </Box>
              </Box>
            </Box>

            {/* Apply Button */}
            <Button
              fullWidth
              onClick={handleSetLink}
              disabled={!linkUrl.trim()}
              sx={{
                backgroundColor: "#ff6b35",
                color: "white",
                fontWeight: 600,
                fontSize: "16px",
                borderRadius: "12px",
                height: "48px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#e55a2b" },
                "&:disabled": { backgroundColor: "#e9ecef", color: "#6c757d" },
              }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RichTextLink;
