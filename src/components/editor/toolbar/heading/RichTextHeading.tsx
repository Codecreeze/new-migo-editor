import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { MdArrowDropDown } from "react-icons/md";
import { useRichTextEditor } from "../RichTextProvider";


const HEADING_LEVELS = [
  { value: "paragraph", label: "Paragraph", level: 0 },
  { value: "heading1", label: "Heading 1", level: 1 },
  { value: "heading2", label: "Heading 2", level: 2 },
  { value: "heading3", label: "Heading 3", level: 3 },
  { value: "heading4", label: "Heading 4", level: 4 },
  { value: "heading5", label: "Heading 5", level: 5 },
  { value: "heading6", label: "Heading 6", level: 6 },
];

export const RichTextHeading: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) {
        return `Heading ${i}`;
      }
    }
    return "Paragraph";
  };

  const handleHeadingChange = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Heading" arrow>
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
              maxWidth: "70px",
              flex: 1,
            }}
          >
            {getCurrentHeading()}
          </Typography>
          <MdArrowDropDown />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "180px",
          },
        }}
      >
        {HEADING_LEVELS.map((heading) => (
          <MenuItem
            key={heading.value}
            onClick={() => handleHeadingChange(heading.level)}
            selected={
              heading.level === 0
                ? !editor.isActive("heading")
                : editor.isActive("heading", { level: heading.level })
            }
            sx={{
              fontSize:
                heading.level === 0 ? "14px" : `${20 - heading.level * 2}px`,
              fontWeight: heading.level === 0 ? 400 : 600,
              fontFamily: "Inter, sans-serif",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize:
                  heading.level === 0 ? "14px" : `${20 - heading.level * 2}px`,
                fontWeight: heading.level === 0 ? 400 : 600,
              }}
            >
              {heading.label}
            </Typography>
            {heading.level > 0 && (
              <Typography
                variant="caption"
                sx={{
                  marginLeft: "auto",
                  color: "#666",
                  fontSize: "12px",
                }}
              >
                Alt Ctrl {heading.level}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default RichTextHeading;
