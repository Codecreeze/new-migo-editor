import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaAlignLeft } from 'react-icons/fa';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextAlignLeft: React.FC = () => {
  const editor = useRichTextEditor();

  const handleAlignLeft = () => {
    editor.chain().focus().setTextAlign('left').run();
  };

  return (
    <Tooltip title="Align Left" arrow>
      <IconButton
        size="small"
        onClick={handleAlignLeft}
        className={editor.isActive({ textAlign: 'left' }) ? "is-active" : ''}
      >
        <FaAlignLeft />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextAlignLeft;
