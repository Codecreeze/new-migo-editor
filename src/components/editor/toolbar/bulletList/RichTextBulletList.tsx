import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdFormatListBulleted } from 'react-icons/md';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextBulletList: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Bullet List" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? "is-active" : ''}
      >
        <MdFormatListBulleted />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextBulletList;
