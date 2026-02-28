import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { TbBlockquote } from 'react-icons/tb';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextBlockquote: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Blockquote" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? "is-active" : ''}
      >
        <TbBlockquote />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextBlockquote;
