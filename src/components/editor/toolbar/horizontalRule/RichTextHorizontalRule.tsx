import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdHorizontalRule } from 'react-icons/md';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextHorizontalRule: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Horizontal Rule" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <MdHorizontalRule />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextHorizontalRule;
