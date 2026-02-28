import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { MdSubscript } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextSubscript: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Subscript" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active" : ""}
      >
        <MdSubscript />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextSubscript;
