import React from "react";
import { Popover, Box, Button, Typography } from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import "./colorPickerPopover.scss";

interface ColorPickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  title?: string;
  initialColor?: string;
}

export const ColorPickerPopover: React.FC<ColorPickerPopoverProps> = ({
  open,
  anchorEl,
  onClose,
  onColorSelect,
  title = "Custom Color",
  initialColor = "#ff0000",
}) => {
  const [color, setColor] = useColor(initialColor);

  const handleApply = () => {
    // Use hex input if it's valid, otherwise use color picker value
    const finalColor = /^#[0-9A-Fa-f]{6}$/.test(color.hex)
      ? color.hex
      : color.hex;
    onColorSelect(finalColor);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      disableEnforceFocus
    >
      <Box sx={{ p: 2, width: 280 }}>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          {title}
        </Typography>

        {/* Color Picker */}
        <Box sx={{ mb: 2 }} className="meaxo-color-container">
          <ColorPicker
            color={color}
            onChange={setColor}
            hideInput={["rgb", "hsv"]}
          />
        </Box>

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: "#22c55e",
            "&:hover": {
              backgroundColor: "#16a34a",
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </Popover>
  );
};

export default ColorPickerPopover;
