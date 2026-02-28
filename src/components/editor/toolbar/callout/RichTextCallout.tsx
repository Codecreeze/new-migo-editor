import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LuNotebookPen } from 'react-icons/lu';
import { useRichTextEditor } from '../RichTextProvider';


const CALLOUT_TYPES = [
  { value: 'info', label: 'Info', color: '#2196f3', emoji: 'ℹ️' },
  { value: 'warning', label: 'Warning', color: '#ff9800', emoji: '⚠️' },
  { value: 'error', label: 'Error', color: '#f44336', emoji: '❌' },
  { value: 'success', label: 'Success', color: '#4caf50', emoji: '✅' },
  { value: 'note', label: 'Note', color: '#9c27b0', emoji: '📝' },
];

export const RichTextCallout: React.FC = () => {
  const editor = useRichTextEditor();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [calloutType, setCalloutType] = useState('info');
  const [calloutTitle, setCalloutTitle] = useState('');
  const [calloutContent, setCalloutContent] = useState('');

  const handleInsertCallout = () => {
    const selectedType = CALLOUT_TYPES.find(type => type.value === calloutType);
    if (!selectedType) return;

    const calloutHtml = `
      <div data-callout="${calloutType}" style="
        border-left: 4px solid ${selectedType.color};
        background: ${selectedType.color}15;
        border-radius: 8px;
        padding: 16px;
        margin: 16px 0;
        position: relative;
      ">
        <div style="
          font-weight: 600;
          color: ${selectedType.color};
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <span style="font-size: 16px;">${selectedType.emoji}</span>
          ${calloutTitle || selectedType.label}
        </div>
        <div style="color: #333; line-height: 1.5;">
          ${calloutContent || 'Enter your callout content here...'}
        </div>
      </div>
    `;

    editor.chain().focus().insertContent(calloutHtml).run();
    setDialogOpen(false);
    setCalloutTitle('');
    setCalloutContent('');
    setCalloutType('info');
  };

  return (
    <>
      <Tooltip title="Insert Callout" arrow>
        <IconButton
          size="small"
          onClick={() => setDialogOpen(true)}
          >
          <LuNotebookPen />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        aria-labelledby="callout-dialog-title"
        aria-describedby="callout-dialog-description"
        disableEnforceFocus
      >
        <DialogTitle id="callout-dialog-title">Insert Callout</DialogTitle>
        <DialogContent id="callout-dialog-description">
          <FormControl fullWidth margin="dense">
            <InputLabel>Callout Type</InputLabel>
            <Select
              value={calloutType}
              onChange={(e) => setCalloutType(e.target.value)}
              label="Callout Type"
            >
              {CALLOUT_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {type.emoji} {type.label}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Title (optional)"
            fullWidth
            value={calloutTitle}
            onChange={(e) => setCalloutTitle(e.target.value)}
            placeholder="Custom title for your callout"
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={3}
            value={calloutContent}
            onChange={(e) => setCalloutContent(e.target.value)}
            placeholder="Enter your callout content..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} aria-label="Cancel callout insertion">Cancel</Button>
          <Button onClick={handleInsertCallout} variant="contained" aria-label="Insert callout into editor">Insert</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RichTextCallout;
