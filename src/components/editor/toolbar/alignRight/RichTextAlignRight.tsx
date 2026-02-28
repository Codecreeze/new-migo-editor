import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaAlignRight } from 'react-icons/fa';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextAlignRight: React.FC = () => {
  const editor = useRichTextEditor();

  const handleAlignRight = () => {
    editor.chain().focus().setTextAlign('right').run();
  };

  return (
    <Tooltip title="Align Right" arrow>
      <IconButton
        size="small"
        onClick={handleAlignRight}
        className={editor.isActive({ textAlign: 'right' }) ? "is-active" : ''}
      >
        <FaAlignRight />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextAlignRight;
