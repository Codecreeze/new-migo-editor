import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { GoTasklist } from 'react-icons/go';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextTaskList: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Task List" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive('taskList') ? "is-active" : ''}
      >
        <GoTasklist />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextTaskList;
