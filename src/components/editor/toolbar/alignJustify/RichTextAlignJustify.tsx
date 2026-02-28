import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaAlignJustify } from 'react-icons/fa';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextAlignJustify: React.FC = () => {
  const editor = useRichTextEditor();

  const handleAlignJustify = () => {
    editor.chain().focus().setTextAlign('justify').run();
  };

  return (
    <Tooltip title="Align Justify" arrow>
      <IconButton
        size="small"
        onClick={handleAlignJustify}
        className={editor.isActive({ textAlign: 'justify' }) ? "is-active" : ''}
      >
        <FaAlignJustify />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextAlignJustify;
