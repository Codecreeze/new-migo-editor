import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useRichTextEditor } from "../RichTextProvider";
import { AiOutlineUnderline } from "react-icons/ai";

export const RichTextUnderline: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Underline (Ctrl+U)" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <AiOutlineUnderline />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextUnderline;
