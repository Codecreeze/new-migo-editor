import type { SxProps, Theme } from "@mui/material/styles";

export const imageNodeStyles = {
  nodeWrapper: {
    position: "relative",
    display: "flex",
    maxWidth: "100%",
    margin: "1rem 0",
    padding: "10px",
  } as SxProps<Theme>,

  imageContainer: {
    position: "relative",
    display: "inline-block",
    minWidth: "100px",
    minHeight: "100px",
    maxWidth: "720px",
    maxHeight: "800px",
    overflow: "visible",
  } as SxProps<Theme>,

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "4px",
    display: "block",
  } as SxProps<Theme>,

  imageSelected: {
    border: "2px solid #3b82f6",
  } as SxProps<Theme>,

  imageUnselected: {
    border: "2px solid transparent",
    boxShadow: "none",
  } as SxProps<Theme>,

  resizeHandle: {
    position: "absolute",
    width: "8px",
    height: "8px",
    bgcolor: "orange",
    borderRadius: "50%",
    zIndex: 10,
  } as SxProps<Theme>,

  resizeHandleDisabled: {
    bgcolor: "#ef4444",
    cursor: "not-allowed",
    opacity: 0.6,
  } as SxProps<Theme>,

  // Corner handles
  handleTopLeft: {
    top: "-3px",
    left: "-3px",
    cursor: "nw-resize",
  } as SxProps<Theme>,

  handleTopRight: {
    top: "-3px",
    right: "-3px",
    cursor: "ne-resize",
  } as SxProps<Theme>,

  handleBottomLeft: {
    bottom: "-3px",
    left: "-3px",
    cursor: "sw-resize",
  } as SxProps<Theme>,

  handleBottomRight: {
    bottom: "-3px",
    right: "-3px",
    cursor: "se-resize",
  } as SxProps<Theme>,

  // Edge handles
  handleTop: {
    top: "-3px",
    left: "50%",
    transform: "translateX(-50%)",
    cursor: "n-resize",
  } as SxProps<Theme>,

  handleBottom: {
    bottom: "-3px",
    left: "50%",
    transform: "translateX(-50%)",
    cursor: "s-resize",
  } as SxProps<Theme>,

  handleLeft: {
    left: "-3px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "w-resize",
  } as SxProps<Theme>,

  handleRight: {
    right: "-3px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "e-resize",
  } as SxProps<Theme>,

  // Alignment styles
  alignLeft: {
    justifyContent: "flex-start",
  } as SxProps<Theme>,

  alignCenter: {
    justifyContent: "center",
  } as SxProps<Theme>,

  alignRight: {
    justifyContent: "flex-end",
  } as SxProps<Theme>,

  imgSelected: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "4px",
    display: "block",
    border: "2px solid #3b82f6",
    boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.3)",
  } as SxProps<Theme>,

  imgUnselected: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "4px",
    display: "block",
    border: "2px solid transparent",
    boxShadow: "none",
  } as SxProps<Theme>,
};
