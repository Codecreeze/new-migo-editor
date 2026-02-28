import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { MdArrowDropDown, MdOutlineDone } from "react-icons/md";
import { RiLineHeight } from "react-icons/ri";
import { useRichTextEditor } from "../RichTextProvider";


const LINE_HEIGHTS = [
  { value: "1", label: "1.0" },
  { value: "1.15", label: "1.15" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2.0" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3.0" },
];

export const RichTextLineHeight: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getCurrentLineHeight = () => {
    // Check both paragraph and heading attributes for line height
    const paragraphAttrs = editor.getAttributes("paragraph");
    const headingAttrs = editor.getAttributes("heading");
    return paragraphAttrs.lineHeight || headingAttrs.lineHeight || "1.5";
  };

  const handleLineHeightChange = (lineHeight: string) => {
    // Apply line height to the current block element (paragraph or heading)
    if (editor.isActive("heading")) {
      editor.chain().focus().updateAttributes("heading", { lineHeight }).run();
    } else {
      editor
        .chain()
        .focus()
        .updateAttributes("paragraph", { lineHeight })
        .run();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Line Height" arrow>
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="dropdown-button"
        >
          <RiLineHeight />
          <MdArrowDropDown />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {LINE_HEIGHTS.map((height) => {
          const isSelected = getCurrentLineHeight() === height.value;
          return (
            <MenuItem
              key={height.value}
              onClick={() => handleLineHeightChange(height.value)}
              selected={isSelected}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {isSelected && <MdOutlineDone size={16} />}
              {height.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default RichTextLineHeight;
