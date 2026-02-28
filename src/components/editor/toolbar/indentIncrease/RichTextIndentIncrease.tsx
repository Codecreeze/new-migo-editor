import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MdFormatIndentIncrease } from 'react-icons/md';
import { useRichTextEditor } from '../RichTextProvider';

export const RichTextIndentIncrease: React.FC = () => {
  const editor = useRichTextEditor();

  const handleIndentIncrease = () => {
    editor.chain().focus().sinkListItem('listItem').run();
  };

  return (
    <Tooltip title="Increase Indent" arrow>
      <IconButton
        size="small"
        onClick={handleIndentIncrease}
        disabled={!editor.can().sinkListItem('listItem')}
      >
        <MdFormatIndentIncrease />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextIndentIncrease;
