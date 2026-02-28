import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdFormatListNumbered } from 'react-icons/md';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextOrderedList: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Ordered List" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? "is-active" : ''}
      >
        <MdFormatListNumbered />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextOrderedList;
