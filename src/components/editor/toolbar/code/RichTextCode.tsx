import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useRichTextEditor } from '../RichTextProvider';
import { SiCodecrafters } from "react-icons/si";

export const RichTextCode: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Inline Code" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <SiCodecrafters />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextCode;
