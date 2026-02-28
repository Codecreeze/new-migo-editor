import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useRichTextEditor } from "../RichTextProvider";
import { HiOutlineStrikethrough } from "react-icons/hi2";

export const RichTextStrike: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Strikethrough" arrow>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <HiOutlineStrikethrough />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextStrike;
