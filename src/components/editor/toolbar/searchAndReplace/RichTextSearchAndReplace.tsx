import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { LuReplace } from 'react-icons/lu';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextSearchAndReplace: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const handleSearch = () => {
    if (searchText) {
      // Basic search functionality - highlight text
      const content = editor.getHTML();
      const regex = new RegExp(searchText, 'gi');
      const highlightedContent = content.replace(regex, `<mark>${searchText}</mark>`);
      editor.commands.setContent(highlightedContent);
    }
  };

  const handleReplace = () => {
    if (searchText && replaceText) {
      const content = editor.getText();
      const newContent = content.replace(new RegExp(searchText, 'gi'), replaceText);
      editor.commands.setContent(newContent);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Search & Replace" arrow>
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
        >
          <LuReplace />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        aria-labelledby="search-dialog-title"
        aria-describedby="search-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="search-dialog-title">Search & Replace</DialogTitle>
        <DialogContent id="search-dialog-description">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Search for"
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter text to search"
            />
            <TextField
              label="Replace with"
              fullWidth
              variant="outlined"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Enter replacement text"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} aria-label="Cancel search">Cancel</Button>
          <Button onClick={handleSearch} variant="outlined">Search</Button>
          <Button onClick={handleReplace} variant="contained" aria-label="Replace all text">Replace All</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RichTextSearchAndReplace;
