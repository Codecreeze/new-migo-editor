import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MeaxoEditor from "./MeaxoEditor";

interface EditorDialogProps {
  open: boolean;
  onClose: () => void;
  initialContent?: string;
  title?: string;
}

export const EditorDialog: React.FC<EditorDialogProps> = ({
  open,
  onClose,
  initialContent = "",
  title = "Rich Text Editor",
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    console.log("📝 Saved Content (HTML):", content);
    console.log("📄 Content Length:", content.length, "characters");
    onClose();
  };

  const handleClose = () => {
    const hasContent = content.trim().length > 0 && content !== "<p></p>";

    if (hasContent) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to close?",
      );
      if (!confirmClose) return;
    }

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      aria-labelledby="editor-dialog-title"
      aria-describedby="editor-dialog-description"
      disableEnforceFocus
      slotProps={{
        paper: {
          sx: {
            height: "90vh",
            maxHeight: "900px",
          },
        },
      }}
    >
      <DialogTitle
        id="editor-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }} id="editor-dialog-description">
        <Box sx={{ height: "100%" }}>
          <MeaxoEditor
            content={initialContent}
            onChange={setContent}
            placeholder="Start writing your content here..."
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} variant="outlined" aria-label="Cancel and close editor">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          aria-label="Save content and close editor"
        >
          Save Content
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditorDialog;
