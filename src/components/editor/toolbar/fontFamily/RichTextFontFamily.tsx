import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { MdArrowDropDown } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";

const FONT_FAMILIES = [
  { value: "Inter", label: "Inter", isDefault: true },
  { value: "serif", label: "serif" },
  { value: "cursive", label: "cursive" },
  { value: "Arial", label: "Arial" },
  { value: "Arial Black", label: "Arial Black" },
  { value: "Georgia", label: "Georgia" },
  { value: "Impact", label: "Impact" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Verdana", label: "Verdana" },
  { value: "Courier New", label: "Courier New" },
  { value: "Lucida Console", label: "Lucida Console" },
  { value: "Monaco", label: "Monaco" },
  { value: "monospace", label: "monospace" },
];

export const RichTextFontFamily: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getCurrentFont = () => {
    const fontFamily = editor.getAttributes("textStyle").fontFamily;
    const currentFont = fontFamily || "Inter";

    if (currentFont === "Inter") {
      return "Default";
    }
    return currentFont;
  };

  const handleFontChange = (fontFamily: string) => {
    editor.chain().focus().setFontFamily(fontFamily).run();
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Font Family" arrow>
        <IconButton
          size="small"
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            setAnchorEl(e.currentTarget)
          }
          className="dropdown-button"
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "40px",
              flex: 1,
            }}
          >
            {getCurrentFont()}
          </Typography>
          <MdArrowDropDown style={{ marginLeft: "4px", fontSize: "16px" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "200px",
          },
        }}
      >
        {FONT_FAMILIES.map((font) => (
          <MenuItem
            key={font.value}
            onClick={() => handleFontChange(font.value)}
            sx={{
              fontSize: "14px",
              fontFamily: "Inter, sans-serif", // Display all fonts in normal text
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {font.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RichTextFontFamily;
