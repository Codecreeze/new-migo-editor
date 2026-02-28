import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineItalic } from "react-icons/ai";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextItalic: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Italic" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <AiOutlineItalic />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextItalic;
