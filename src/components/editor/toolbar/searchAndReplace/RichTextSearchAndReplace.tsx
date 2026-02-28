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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LuReplace } from "react-icons/lu";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextSearchAndReplace: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  const handleSearch = () => {
    if (!searchText) return;
    const text = editor.getText();
    // console.log('text', text)
    const flags = caseSensitive ? "g" : "gi";
    console.log('flags', flags)
    const regex = new RegExp(searchText, flags);
    console.log('regex', regex)
    const matches = text.match(regex);
    console.log('matches', matches);
    if (matches) {
      setTotalMatches(matches.length);
      setCurrentMatch(1);
    } else {
      setTotalMatches(0);
      setCurrentMatch(0);
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    setCurrentMatch(0);
    setTotalMatches(0);
    setDialogOpen(false);
  };

  const handleReplace = () => {
    if (!searchText || !replaceText) return;
    const html = editor.getHTML();
    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(searchText, flags);
    const newHtml = html.replace(regex, replaceText);
    editor.commands.setContent(newHtml);
    handleResetSearch();
  };

  const handleReplaceAll = () => {
    if (!searchText || !replaceText) return;
    const html = editor.getHTML();
    const flags = caseSensitive ? "g" : "gi";
    const regex = new RegExp(searchText, flags);
    const newHtml = html.replace(regex, replaceText);
    editor.commands.setContent(newHtml);
    handleResetSearch();
  };

  const handlePrevious = () => {
    if (currentMatch > 1) {
      setCurrentMatch(currentMatch - 1);
    }
  };

  const handleNext = () => {
    if (currentMatch < totalMatches) {
      setCurrentMatch(currentMatch + 1);
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
        onClose={() => setDialogOpen(false)}
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
                Search
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontSize: "14px" }}
              >
                {totalMatches > 0 ? `${currentMatch}/${totalMatches}` : "1/0"}
              </Typography>
            </Box>

            {/* Search Input with Navigation */}
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (e.target.value) handleSearch();
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
                  onClick={() => {
                    setSearchText("");
                    setCurrentMatch(0);
                    setTotalMatches(0);
                  }}
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
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  size="small"
                  sx={{
                    color: "#ff6b35",
                    "&.Mui-checked": { color: "#ff6b35" },
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
