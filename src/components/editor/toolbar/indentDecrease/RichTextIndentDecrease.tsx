import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdFormatIndentDecrease } from 'react-icons/md';
import { useRichTextEditor } from '../RichTextProvider';

export const RichTextIndentDecrease: React.FC = () => {
  const editor = useRichTextEditor();

  const handleIndentDecrease = () => {
    editor.chain().focus().liftListItem('listItem').run();
  };

  return (
    <Tooltip title="Decrease Indent" arrow>
      <IconButton
        size="small"
        onClick={handleIndentDecrease}
        disabled={!editor.can().liftListItem('listItem')}
      >
        <MdFormatIndentDecrease />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextIndentDecrease;
