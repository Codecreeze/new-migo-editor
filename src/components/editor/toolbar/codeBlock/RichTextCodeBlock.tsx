import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { BiCodeBlock } from 'react-icons/bi';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextCodeBlock: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Code Block" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? "is-active" : ''}
      >
        <BiCodeBlock />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextCodeBlock;
