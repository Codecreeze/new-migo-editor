import React, { useState, useEffect } from "react";
import { Popover, Box, Typography, Button, Tooltip } from "@mui/material";
import { MdFormatColorReset } from "react-icons/md";
import { ColorPickerPopover } from "./ColorPickerPopover";
import { PREDEFINED_COLORS } from "./colorConstants";
import { MdOutlineDone } from "react-icons/md";

interface PredefinedColorsPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  onDefaultColor?: () => void;
  title?: string;
  storageKey?: string;
  showDefault?: boolean;
  showRecentColors?: boolean;
  customColors?: string[][];
  defaultText?: string;
  selectedColor?: string;
}

const ColorBox = ({
  color,
  onClick,
  size = 20,
  colorName,
  isSelected = false,
}: {
  color: string;
  onClick: () => void;
  size?: number;
  colorName?: string;
  isSelected?: boolean;
}) => {
  const colorElement = (
    <Box
      sx={{
        width: size,
        height: size,
        backgroundColor: color,
        border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
        borderRadius: "3px",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        },
      }}
      onClick={onClick}
    >
      {isSelected && (
        <MdOutlineDone
          size={size * 0.6}
          color={
            color === "#ffffff" || color === "#f5f5f5" || color === "#eeeeee"
              ? "#000"
              : "#fff"
          }
        />
      )}
    </Box>
  );

  if (colorName) {
    return (
      <Tooltip title={`${colorName}`} arrow placement="right">
        {colorElement}
      </Tooltip>
    );
  }

  return colorElement;
};

export const PredefinedColorsPopover: React.FC<
  PredefinedColorsPopoverProps
> = ({
  open,
  anchorEl,
  onClose,
  onColorSelect,
  onDefaultColor,
  title = "Color Picker",
  storageKey = "recent-colors",
  showDefault = false,
  showRecentColors = false,
  customColors,
  defaultText = "Default",
  selectedColor,
}) => {
  const [colorPickerAnchorEl, setColorPickerAnchorEl] =
    useState<HTMLElement | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    if (showRecentColors) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setRecentColors(JSON.parse(saved));
      }
    }
  }, [storageKey, showRecentColors]);

  const saveRecentColor = (color: string) => {
    if (!showRecentColors) return;

    const updated = [color, ...recentColors.filter((c) => c !== color)].slice(
      0,
      8,
    );
    setRecentColors(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleColorChange = (color: string) => {
    onColorSelect(color);
    saveRecentColor(color);
    onClose();
  };

  const handleDefaultColor = () => {
    if (onDefaultColor) {
      onDefaultColor();
    }
    onClose();
  };

  const handleMoreColors = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerAnchorEl(event.currentTarget);
  };

  const handleAdvancedColorSelect = (color: string) => {
    handleColorChange(color);
    setColorPickerAnchorEl(null);
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: "8px", maxWidth: 220 }}>
          {/* Custom Color Picker Section */}

          {/* Default Color */}
          {showDefault && (
            <Box sx={{ mb: "2px" }}>
              <Button
                startIcon={<MdFormatColorReset />}
                onClick={handleDefaultColor}
                sx={{
                  justifyContent: "flex-start",
                  color: "text.primary",
                  textTransform: "none",
                  padding: 0,
                }}
              >
                {defaultText}
              </Button>
            </Box>
          )}

          {/* Predefined Colors Grid */}
          <Box sx={{ mb: "2px" }}>
            {customColors ? (
              // Use custom colors (for highlights, etc.)
              customColors.map((row, rowIndex) => (
                <Box key={rowIndex} sx={{ display: "flex", gap: 0.5, mb: 0.5 }}>
                  {row.map((color) => (
                    <ColorBox
                      key={color}
                      color={color}
                      onClick={() => handleColorChange(color)}
                      isSelected={selectedColor === color}
                    />
                  ))}
                </Box>
              ))
            ) : (
              // Use CSS named colors with responsive grid
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {PREDEFINED_COLORS.map((colorInfo) => (
                  <ColorBox
                    key={colorInfo.id}
                    color={colorInfo.code}
                    colorName={colorInfo.name}
                    onClick={() => handleColorChange(colorInfo.code)}
                    size={20}
                    isSelected={selectedColor === colorInfo.code}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Recently Used */}
          {showRecentColors && recentColors.length > 0 && (
            <Box sx={{ mt: "2px" }}>
              <Typography
                variant="caption"
                sx={{ display: "block", mb: 1, color: "text.secondary" }}
              >
                Recently Used
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {recentColors.map((color, index) => (
                  <ColorBox
                    key={`${color}-${index}`}
                    color={color}
                    onClick={() => handleColorChange(color)}
                    isSelected={selectedColor === color}
                  />
                ))}
              </Box>
            </Box>
          )}
          <Box sx={{ my: "5px" }}>
            <Button
              onClick={handleMoreColors}
              variant="text"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                padding: 0,
              }}
            >
              More Colors
            </Button>
          </Box>
        </Box>
      </Popover>

      <ColorPickerPopover
        open={Boolean(colorPickerAnchorEl)}
        anchorEl={colorPickerAnchorEl}
        onClose={() => setColorPickerAnchorEl(null)}
        onColorSelect={handleAdvancedColorSelect}
        title={`Custom ${title}`}
        initialColor="#000000"
      />
    </>
  );
};

export default PredefinedColorsPopover;
