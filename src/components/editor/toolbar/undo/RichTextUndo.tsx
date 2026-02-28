import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { GrUndo } from "react-icons/gr";
import { useRichTextEditor } from "../RichTextProvider";


export const RichTextUndo: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Undo (Ctrl+Z)" arrow>
      <span>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <GrUndo />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default RichTextUndo;
