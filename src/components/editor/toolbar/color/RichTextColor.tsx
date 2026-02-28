import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { RiFontColor } from "react-icons/ri";
import { useRichTextEditor } from "../RichTextProvider";
import { PredefinedColorsPopover } from "../shared/PredefinedColorsPopover";

export const RichTextColor: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
    setSelectedColor(color);
  };

  const handleDefaultColor = () => {
    editor.chain().focus().unsetColor().run();
    setSelectedColor("#000000");
  };

  const handleColorBoxClick = () => {
    editor.chain().focus().setColor(selectedColor).run();
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={null}
        exclusive
        aria-label="Text Color"
      >
        {selectedColor && (
          <ToggleButton
            value="color-preview"
            sx={{ padding: 0, minWidth: "24px" }}
            onClick={handleColorBoxClick}
          >
            <Tooltip title="Apply This Color" arrow>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: selectedColor,
                  borderRadius: "inherit",
                }}
              />
            </Tooltip>
          </ToggleButton>
        )}
        <ToggleButton
          value="color-picker"
          sx={{ padding: 0, minWidth: "24px" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Tooltip title="Text Color" arrow>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <RiFontColor size={16} />
            </Box>
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      <PredefinedColorsPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onColorSelect={handleColorChange}
        onDefaultColor={handleDefaultColor}
        title="Text Color"
        storageKey="richtext-recent-colors"
        showDefault={true}
        showRecentColors={true}
        selectedColor={selectedColor}
      />
    </>
  );
};

export default RichTextColor;
