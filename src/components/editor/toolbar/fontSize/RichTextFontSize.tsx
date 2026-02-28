import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { MdArrowDropDown } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";


const FONT_SIZES = [
  { value: "17px", label: "Default", isDefault: true },
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "18px", label: "18px" },
  { value: "20px", label: "20px" },
  { value: "24px", label: "24px" },
  { value: "28px", label: "28px" },
  { value: "32px", label: "32px" },
  { value: "36px", label: "36px" },
  { value: "48px", label: "48px" },
];

export const RichTextFontSize: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes("textStyle").fontSize;
    const currentSize = fontSize || "17px";
    
    // If current size is 16px, show "Default" in the button
    if (currentSize === "17px") {
      return "Default";
    }
    return currentSize;
  };

  const handleFontSizeChange = (fontSize: string) => {
    editor.chain().focus().setMark("textStyle", { fontSize }).run();
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Font Size" arrow>
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
            {getCurrentFontSize()}
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
            width: "120px",
          },
        }}
      >
        {FONT_SIZES.map((size) => (
          <MenuItem
            key={size.value}
            onClick={() => handleFontSizeChange(size.value)}
            sx={{
              fontSize: "14px", // Display all sizes in normal text
              fontFamily: "Inter, sans-serif",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {size.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RichTextFontSize;
