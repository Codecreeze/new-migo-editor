import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineBold } from "react-icons/ai";
import { useRichTextEditor } from "../RichTextProvider";

export const RichTextBold: React.FC = () => {
  const editor = useRichTextEditor();

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  return (
    <Tooltip title="Bold" arrow>
      <IconButton
        size="small"
        onClick={handleBold}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <AiOutlineBold />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextBold;
