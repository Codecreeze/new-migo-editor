import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaAlignCenter } from 'react-icons/fa';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextAlignCenter: React.FC = () => {
  const editor = useRichTextEditor();

  const handleAlignCenter = () => {
    editor.chain().focus().setTextAlign('center').run();
  };

  return (
    <Tooltip title="Align Center" arrow>
      <IconButton
        size="small"
        onClick={handleAlignCenter}
        className={editor.isActive({ textAlign: 'center' }) ? "is-active" : ''}
      >
        <FaAlignCenter />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextAlignCenter;
