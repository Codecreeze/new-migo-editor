import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useRichTextEditor } from "../RichTextProvider";
import { useMarkActive } from "../../hooks/useMarkActive";

interface ToolbarMarkButtonProps {
  mark: string;
  icon: React.ReactNode;
  tooltip: string;
}

export const ToolbarMarkButton: React.FC<ToolbarMarkButtonProps> = ({
  mark,
  icon,
  tooltip,
}) => {
  const editor = useRichTextEditor();
  const isActive = useMarkActive(editor, mark);

  const handleToggle = () => {
    editor.chain().focus().toggleMark(mark).run();
  };

  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        size="small"
        onClick={handleToggle}
        className={isActive ? "is-active" : ""}
        disabled={!editor.can().toggleMark(mark)}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ToolbarMarkButton;
