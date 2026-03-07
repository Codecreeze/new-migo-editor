import React from "react";
import { Select, MenuItem, FormControl, Tooltip } from "@mui/material";
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

  const getCurrentFont = () => {
    const fontFamily = editor.getAttributes("textStyle").fontFamily;
    return fontFamily || "Inter";
  };

  const handleFontChange = (event: any) => {
    const fontFamily = event.target.value;
    editor.chain().focus().setFontFamily(fontFamily).run();
  };

  return (
    <Tooltip title="Font Family" arrow>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={getCurrentFont()}
          onChange={handleFontChange}
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
          {FONT_FAMILIES.map((font) => (
            <MenuItem key={font.value} value={font.value}>
              {font.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default RichTextFontFamily;
