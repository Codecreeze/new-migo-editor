import React, { useState, useRef, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Box } from "@mui/material";
import { imageNodeStyles } from "./imageNodeStyles";

export default function ImageNodeView(props: NodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const { src, alt, width, height, rotate, flipH, flipV, align } = node.attrs;
  const [isSelected, setIsSelected] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  // Apply CSS transform for rotation and flipping
  const transform = [
    rotate ? `rotate(${rotate}deg)` : "",
    flipH ? "scaleX(-1)" : "",
    flipV ? "scaleY(-1)" : "",
  ]
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
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

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

  // Get handle styles with rotation consideration
  const getHandleStyles = (baseStyle: any) => {
    const isAtLimit = isAtMaxWidth && isAtMaxHeight;
    return {
      ...imageNodeStyles.resizeHandle,
      ...baseStyle,
      ...(isAtLimit ? imageNodeStyles.resizeHandleDisabled : {}),
    };
  };

  const imageStyles = isSelected
    ? imageNodeStyles.imgSelected
    : imageNodeStyles.imgUnselected;

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
          width: width ? `${Math.min(width, 720)}px` : "auto",
          height: height ? `${Math.min(height, 800)}px` : "auto",
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

            {/* Edge handles */}
            <Box
              sx={getHandleStyles(imageNodeStyles.handleTop)}
              onMouseDown={(e) => handleMouseDown(e, "top")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleBottom)}
              onMouseDown={(e) => handleMouseDown(e, "bottom")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleLeft)}
              onMouseDown={(e) => handleMouseDown(e, "left")}
            />
            <Box
              sx={getHandleStyles(imageNodeStyles.handleRight)}
              onMouseDown={(e) => handleMouseDown(e, "right")}
            />
          </React.Fragment>
        )}
      </Box>
    </NodeViewWrapper>
  );
}
