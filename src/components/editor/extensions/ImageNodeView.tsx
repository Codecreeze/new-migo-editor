import React, { useState, useRef, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Box } from "@mui/material";
import { imageNodeStyles } from "./imageNodeStyles";

export default function ImageNodeView(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const { src, alt, width, height, flipH, flipV, align } = node.attrs;
  const [isSelected, setIsSelected] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  // Apply CSS transform for flipping
  const transform = [flipH ? "scaleX(-1)" : "", flipV ? "scaleY(-1)" : ""]
    .filter(Boolean)
    .join(" ");

  // Check if image is at maximum size limits
  const isAtMaxWidth = width >= 720;
  const isAtMaxHeight = height >= 800;

  // Resize functionality with maximum constraints
  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width || imgRef.current?.offsetWidth || 300;
    const startHeight = height || imgRef.current?.offsetHeight || 200;

    // Maximum constraints
    const MAX_WIDTH = 720;
    const MAX_HEIGHT = 800;
    const MIN_WIDTH = 100;
    const MIN_HEIGHT = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const rawDeltaX = e.clientX - startX;
      const rawDeltaY = e.clientY - startY;

      // Get transform-aware deltas
      const { deltaX, deltaY } = getTransformAwareDirection(
        rawDeltaX,
        rawDeltaY,
      );

      let newWidth = startWidth;
      let newHeight = startHeight;

      // Calculate aspect ratio for maintaining proportions
      const aspectRatio = startWidth / startHeight;

      if (direction.includes("right")) {
        newWidth = Math.max(
          MIN_WIDTH,
          Math.min(MAX_WIDTH, startWidth + deltaX),
        );
        // For edge resize, maintain aspect ratio
        if (!direction.includes("top") && !direction.includes("bottom")) {
          newHeight = newWidth / aspectRatio;
          newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
        }
      }
      if (direction.includes("left")) {
        newWidth = Math.max(
          MIN_WIDTH,
          Math.min(MAX_WIDTH, startWidth - deltaX),
        );
        // For edge resize, maintain aspect ratio
        if (!direction.includes("top") && !direction.includes("bottom")) {
          newHeight = newWidth / aspectRatio;
          newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
        }
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, startHeight + deltaY),
        );
        // For edge resize, maintain aspect ratio
        if (!direction.includes("left") && !direction.includes("right")) {
          newWidth = newHeight * aspectRatio;
          newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
        }
      }
      if (direction.includes("top")) {
        newHeight = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, startHeight - deltaY),
        );
        // For edge resize, maintain aspect ratio
        if (!direction.includes("left") && !direction.includes("right")) {
          newWidth = newHeight * aspectRatio;
          newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
        }
      }

      // Maintain aspect ratio when resizing from corners with constraints
      if (direction.includes("right") || direction.includes("left")) {
        if (direction.includes("bottom") || direction.includes("top")) {
          const aspectRatio = startWidth / startHeight;

          // Calculate constrained dimensions while maintaining aspect ratio
          if (newWidth / aspectRatio > MAX_HEIGHT) {
            newWidth = MAX_HEIGHT * aspectRatio;
          }
          if (newWidth / aspectRatio < MIN_HEIGHT) {
            newWidth = MIN_HEIGHT * aspectRatio;
          }

          newHeight = newWidth / aspectRatio;

          // Ensure both dimensions are within bounds
          newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));
          newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newHeight));
        }
      }

      updateAttributes({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Get alignment styles
  const getAlignmentStyles = () => {
    switch (align) {
      case "left":
        return { justifyContent: "flex-start" };
      case "right":
        return { justifyContent: "flex-end" };
      case "center":
      default:
        return { justifyContent: "center" };
    }
  };

  // Calculate transform-aware resize direction
  const getTransformAwareDirection = (deltaX: number, deltaY: number) => {
    // For transformed images, we need to calculate the actual resize direction
    // based on the visual orientation, not the DOM orientation

    let transformedDeltaX = deltaX;
    let transformedDeltaY = deltaY;

    // Apply flip transformations
    if (flipH) transformedDeltaX = -transformedDeltaX;
    if (flipV) transformedDeltaY = -transformedDeltaY;

    return { deltaX: transformedDeltaX, deltaY: transformedDeltaY };
  };

  // Calculate flipped cursor based on flip state
  const getFlippedCursor = (originalCursor: string) => {
    // Cursor mapping for corner handles only
    const cursorMap: { [key: string]: string[] } = {
      "nw-resize": ["nw-resize", "ne-resize", "se-resize", "sw-resize"],
      "ne-resize": ["ne-resize", "se-resize", "sw-resize", "nw-resize"],
      "se-resize": ["se-resize", "sw-resize", "nw-resize", "ne-resize"],
      "sw-resize": ["sw-resize", "nw-resize", "ne-resize", "se-resize"],
    };

    // Get base cursor from mapping
    const cursors = cursorMap[originalCursor];
    if (!cursors) return originalCursor;

    let cursorIndex = 0;

    // Adjust for flips
    if (flipH && !flipV) {
      // Horizontal flip: swap left-right
      const flipMap: { [key: number]: number } = { 0: 1, 1: 0, 2: 3, 3: 2 };
      cursorIndex = flipMap[cursorIndex] ?? cursorIndex;
    } else if (flipV && !flipH) {
      // Vertical flip: swap top-bottom
      const flipMap: { [key: number]: number } = { 0: 3, 1: 2, 2: 1, 3: 0 };
      cursorIndex = flipMap[cursorIndex] ?? cursorIndex;
    } else if (flipH && flipV) {
      // Both flips: 180 degree rotation
      cursorIndex = (cursorIndex + 2) % 4;
    }

    return cursors[cursorIndex] || originalCursor;
  };

  // Get handle styles with rotation consideration
  const getHandleStyles = (baseStyle: any) => {
    const isAtLimit = isAtMaxWidth && isAtMaxHeight;
    const originalCursor = baseStyle.cursor;
    const rotatedCursor = getFlippedCursor(originalCursor);

    return {
      ...imageNodeStyles.resizeHandle,
      ...baseStyle,
      cursor: isAtLimit ? "not-allowed" : rotatedCursor,
      ...(isAtLimit ? imageNodeStyles.resizeHandleDisabled : {}),
    };
  };

  const imageStyles = isSelected
    ? imageNodeStyles.imgSelected
    : imageNodeStyles.imgUnselected;

  const appliedWidth = `${Math.min(width, 720)}`;
  const appliedHeight = `${Math.min(height, 800)}`;

  const newWidth = appliedWidth !== "NaN" ? `${appliedWidth}px` : "auto";
  const newHeight = appliedHeight !== "NaN" ? `${appliedHeight}px` : "auto";

  return (
    <NodeViewWrapper
      as="figure"
      ref={figureRef}
      className={`image-node-wrapper ${isSelected ? "selected" : ""}`}
      style={{
        position: "relative",
        display: "flex",
        maxWidth: "100%",
        margin: "1rem 0",
        padding: "10px",
        ...getAlignmentStyles(),
      }}
    >
      <Box
        sx={{
          ...imageNodeStyles.imageContainer,
          width: newWidth,
          height: newHeight,
          transform,
          transformOrigin: "center",
        }}
      >
        <Box
          component="img"
          ref={imgRef}
          src={src}
          alt={alt}
          sx={imageStyles}
          draggable={false}
        />

        {/* Resize handles - positioned relative to image container */}
        {isSelected && (
          <React.Fragment>
            {/* Corner handles */}
            <Box
              sx={getHandleStyles(imageNodeStyles.handleTopLeft)}
              onMouseDown={(e) => handleMouseDown(e, "top-left")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleTopRight)}
              onMouseDown={(e) => handleMouseDown(e, "top-right")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleBottomLeft)}
              onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleBottomRight)}
              onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
            />

            {/* Edge handles removed - only corner handles for cleaner interaction */}
          </React.Fragment>
        )}
      </Box>
    </NodeViewWrapper>
  );
}
