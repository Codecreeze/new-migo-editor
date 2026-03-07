import React from "react";
import { Select, MenuItem, FormControl, Tooltip } from "@mui/material";
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

  const getCurrentFontSize = () => {
    const fontSize = editor.getAttributes("textStyle").fontSize;
    return fontSize || "17px";
  };

  const handleFontSizeChange = (event: any) => {
    const fontSize = event.target.value;
    editor.chain().focus().setMark("textStyle", { fontSize }).run();
  };

  return (
    <Tooltip title="Font Size" arrow>
      <FormControl size="small" sx={{ minWidth: 80 }}>
        <Select
          value={getCurrentFontSize()}
          onChange={handleFontSizeChange}
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
          {FONT_SIZES.map((size) => (
            <MenuItem key={size.value} value={size.value}>
              {size.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default RichTextFontSize;
