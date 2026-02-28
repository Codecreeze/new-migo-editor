import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { PiHighlighterBold } from "react-icons/pi";
import { useRichTextEditor } from "../RichTextProvider";
import { PredefinedColorsPopover } from "../shared/PredefinedColorsPopover";

export const RichTextHighlight: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleHighlightChange = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
    setSelectedColor(color);
  };

  const handleDefaultHighlight = () => {
    editor.chain().focus().unsetHighlight().run();
    setSelectedColor("#ffff00");
  };

  const handleColorBoxClick = () => {
    editor.chain().focus().setHighlight({ color: selectedColor }).run();
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={null}
        exclusive
        aria-label="Highlight Color"
        sx={{ borderRadius: 0.5, height: 32 }}
      >
        {selectedColor && (
          <ToggleButton
            value="highlight-preview"
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
          value="highlight-picker"
          sx={{ padding: 0, minWidth: "24px" }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className={editor.isActive("highlight") ? "is-active" : ""}
        >
          <Tooltip title="Highlight" arrow>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <PiHighlighterBold size={16} />
            </Box>
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      <PredefinedColorsPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onColorSelect={handleHighlightChange}
        onDefaultColor={handleDefaultHighlight}
        title="Highlight Color"
        storageKey="highlight-colors"
        showDefault={true}
        showRecentColors={true}
        defaultText="No Fill"
        selectedColor={selectedColor}
      />
    </>
  );
};

export default RichTextHighlight;
