import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { GrRedo } from "react-icons/gr";
import { useRichTextEditor } from "../RichTextProvider";


export const RichTextRedo: React.FC = () => {
  const editor = useRichTextEditor();

  return (
    <Tooltip title="Redo (Ctrl+Y)" arrow>
      <span>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <GrRedo />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default RichTextRedo;
