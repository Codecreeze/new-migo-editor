import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { MdSuperscript } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextSuperscript: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Superscript" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active" : ""}
      >
        <MdSuperscript />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextSuperscript;
