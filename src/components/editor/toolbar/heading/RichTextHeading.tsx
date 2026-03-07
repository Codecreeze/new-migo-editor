import React from "react";
import { Select, MenuItem, FormControl, Tooltip } from "@mui/material";
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

  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i })) {
        return `heading${i}`;
      }
    }
    return "paragraph";
  };

  const handleHeadingChange = (event: any) => {
    const value = event.target.value;
    const heading = HEADING_LEVELS.find(h => h.value === value);
    
    if (heading) {
      if (heading.level === 0) {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: heading.level as 1 | 2 | 3 | 4 | 5 | 6 })
          .run();
      }
    }
  };

  return (
    <Tooltip title="Heading" arrow>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={getCurrentHeading()}
          onChange={handleHeadingChange}
          displayEmpty
          sx={{
            fontSize: "12px",
            height: "32px",
            "& .MuiSelect-select": {
              padding: "6px 8px",
              fontSize: "12px",
            },
          }}
        >
          {HEADING_LEVELS.map((heading) => (
            <MenuItem key={heading.value} value={heading.value}>
              {heading.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default RichTextHeading;
