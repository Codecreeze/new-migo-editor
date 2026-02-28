import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LuEraser } from 'react-icons/lu';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextClear: React.FC = () => {
  const editor = useRichTextEditor();

  const handleClear = () => {
    editor.chain().focus().clearContent().run();
  };

  return (
    <Tooltip title="Clear Formatting" arrow>
      <IconButton
        size="small"
        onClick={handleClear}
      >
        <LuEraser />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextClear;
