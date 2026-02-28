import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { FiLink } from 'react-icons/fi';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextLink: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  const handleSetLink = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      }
    }
    setDialogOpen(false);
    setLinkText('');
    setLinkUrl('');
  };

  return (
    <>
      <Tooltip title="Insert Link" arrow>
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <FiLink />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        aria-labelledby="link-dialog-title"
        aria-describedby="link-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="link-dialog-title">Insert Link</DialogTitle>
        <DialogContent id="link-dialog-description">
          <TextField
            autoFocus
            margin="dense"
            label="Link URL"
            fullWidth
            variant="outlined"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <TextField
            margin="dense"
            label="Link Text (optional)"
            fullWidth
            variant="outlined"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            placeholder="Click here"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} aria-label="Cancel link insertion">Cancel</Button>
          <Button onClick={handleSetLink} variant="contained" aria-label="Insert link into editor">Insert</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RichTextLink;
