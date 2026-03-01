import React, { useState, useCallback } from "react";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LuReplace } from "react-icons/lu";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdClose,
} from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextSearchAndReplace: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  // Read data directly from editor storage
  const totalMatches =
    (editor.storage as any)?.searchAndReplace?.totalMatches || 0;
  const currentMatch =
    ((editor.storage as any)?.searchAndReplace?.activeMatchIndex || 0) + 1;
  const matches = (editor.storage as any)?.searchAndReplace?.matches || [];

  const handleSearch = useCallback(
    (searchTerm: string = searchText, useCaseSensitive: boolean = caseSensitive) => {
      if (!searchTerm.trim()) {
        (editor.commands as any).updateSearch({
          searchTerm: "",
          caseSensitive: useCaseSensitive,
        });
        return;
      }

      // Update search term and store replace term in extension storage
      if ((editor.storage as any).searchAndReplace) {
        (editor.storage as any).searchAndReplace.replaceTerm = replaceText;
      }
      (editor.commands as any).updateSearch({ searchTerm, caseSensitive: useCaseSensitive });
    },
    [editor, searchText, replaceText, caseSensitive],
  );

  const handleResetSearch = () => {
    setSearchText("");
    setReplaceText("");
    setCaseSensitive(false);
    (editor.commands as any).updateSearch({
      searchTerm: "",
      caseSensitive: false,
    });
    // Clear storage completely
    if ((editor.storage as any).searchAndReplace) {
      (editor.storage as any).searchAndReplace.searchTerm = "";
      (editor.storage as any).searchAndReplace.replaceTerm = "";
      (editor.storage as any).searchAndReplace.matches = [];
      (editor.storage as any).searchAndReplace.totalMatches = 0;
      (editor.storage as any).searchAndReplace.activeMatchIndex = 0;
    }
  };


  const handleClearOnly = () => {
    setSearchText("");
    setReplaceText("");
    setCaseSensitive(false);
    (editor.commands as any).updateSearch({
      searchTerm: "",
      caseSensitive: false,
    });
    // Clear storage completely
    if ((editor.storage as any).searchAndReplace) {
      (editor.storage as any).searchAndReplace.searchTerm = "";
      (editor.storage as any).searchAndReplace.replaceTerm = "";
      (editor.storage as any).searchAndReplace.matches = [];
      (editor.storage as any).searchAndReplace.totalMatches = 0;
      (editor.storage as any).searchAndReplace.activeMatchIndex = 0;
    }
  };

  const handleDialogClose = () => {
    handleResetSearch();
    setDialogOpen(false);
  };

  const handleReplace = () => {
    if (!searchText || !replaceText) return;

    // Set replace term in storage before replacing
    if ((editor.storage as any).searchAndReplace) {
      (editor.storage as any).searchAndReplace.replaceTerm = replaceText;
    }
    (editor.commands as any).replaceFirst();

    // Update search to refresh matches after replacement
    (editor.commands as any).updateSearch({
      searchTerm: searchText,
      caseSensitive,
    });
  };

  const handleReplaceAll = () => {
    if (!searchText || !replaceText) return;

    // Set replace term in storage before replacing
    if ((editor.storage as any).searchAndReplace) {
      (editor.storage as any).searchAndReplace.replaceTerm = replaceText;
    }
    (editor.commands as any).replaceAll();

    // Clear search after replace all
    handleResetSearch();
  };

  const handlePrevious = () => {
    if (matches.length > 0 && currentMatch > 1) {
      const newIndex = (currentMatch - 2 + matches.length) % matches.length;
      (editor.commands as any).setActiveMatch(newIndex);
    }
  };

  const handleNext = () => {
    if (matches.length > 0 && currentMatch < totalMatches) {
      const newIndex = currentMatch % matches.length;
      (editor.commands as any).setActiveMatch(newIndex);
    }
  };

  return (
    <>
      <Tooltip title="Search & Replace" arrow>
        <IconButton size="small" onClick={() => setDialogOpen(true)}>
          <LuReplace />
        </IconButton>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              width: "400px",
              maxWidth: "400px",
              borderRadius: "12px",
              padding: "16px",
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
                mb: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                Search & Replace
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", fontSize: "14px" }}
                >
                  {totalMatches > 0 ? `${currentMatch}/${totalMatches}` : "0/0"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleDialogClose}
                  sx={{ padding: "4px" }}
                >
                  <MdClose size={16} />
                </IconButton>
              </Box>
            </Box>

            {/* Search Input with Navigation */}
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch(e.target.value);
                }}
                placeholder="Text"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    paddingRight: "80px",
                    height: "40px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px 12px",
                    fontSize: "14px",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  gap: "4px",
                }}
              >
                <IconButton
                  size="small"
                  onClick={handlePrevious}
                  disabled={currentMatch <= 1}
                  sx={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#ff6b35",
                    color: "white",
                    "&:hover": { backgroundColor: "#e55a2b" },
                    "&:disabled": { backgroundColor: "#ccc", color: "#999" },
                  }}
                >
                  <MdKeyboardArrowUp size={16} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleNext}
                  disabled={currentMatch >= totalMatches}
                  sx={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#ff6b35",
                    color: "white",
                    "&:hover": { backgroundColor: "#e55a2b" },
                    "&:disabled": { backgroundColor: "#ccc", color: "#999" },
                  }}
                >
                  <MdKeyboardArrowDown size={16} />
                </IconButton>
                <Button
                  size="small"
                  onClick={handleClearOnly}
                  sx={{
                    minWidth: "48px",
                    height: "24px",
                    backgroundColor: "#ff6b35",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    "&:hover": { backgroundColor: "#e55a2b" },
                  }}
                >
                  Clear
                </Button>
              </Box>
            </Box>

            {/* Replace Section */}
            <Box>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 500, fontSize: "14px" }}
              >
                Replace
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Text"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    height: "40px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "8px 12px",
                    fontSize: "14px",
                  },
                }}
              />
            </Box>

            {/* Case Sensitive Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={caseSensitive}
                  onChange={(e) => {
                    const newCaseSensitive = e.target.checked;
                    setCaseSensitive(newCaseSensitive);
                    if (searchText.trim()) {
                      handleSearch(searchText, newCaseSensitive);
                    }
                  }}
                  size="small"
                  sx={{
                    color: "#ff6b35",
                    "&.Mui-checked": {
                      color: "#ff6b35",
                    },
                  }}
                />
              }
              label="Case Sensitive"
              sx={{
                margin: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "#333",
                },
              }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button
                fullWidth
                onClick={handleReplace}
                disabled={!searchText || !replaceText}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                  borderRadius: "8px",
                  height: "40px",
                  "&:hover": { backgroundColor: "#e55a2b" },
                  "&:disabled": { backgroundColor: "#ccc", color: "#999" },
                }}
              >
                Replace
              </Button>
              <Button
                fullWidth
                onClick={handleReplaceAll}
                disabled={!searchText || !replaceText}
                sx={{
                  backgroundColor: "#ff6b35",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                  borderRadius: "8px",
                  height: "40px",
                  "&:hover": { backgroundColor: "#e55a2b" },
                  "&:disabled": { backgroundColor: "#ccc", color: "#999" },
                }}
              >
                Replace All
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RichTextSearchAndReplace;
