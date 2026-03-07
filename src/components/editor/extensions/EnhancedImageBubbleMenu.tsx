import { BubbleMenu } from "@tiptap/react/menus";
import { isNodeSelection } from "@tiptap/core";
import {
  MdRotateRight,
  MdDelete,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from "react-icons/md";
import { TbFlipHorizontal, TbFlipVertical } from "react-icons/tb";
import { Box, IconButton, Divider, Tooltip, Button } from "@mui/material";
import type { Editor } from "@tiptap/react";

interface EnhancedImageBubbleMenuProps {
  editor: Editor;
}

export default function EnhancedImageBubbleMenu({
  editor,
}: EnhancedImageBubbleMenuProps) {
  if (!editor) return null;

  const sizeOptions = [
    { label: "S", value: { width: 240, height: "240" } },
    { label: "M", value: { width: 480, height: "auto" } },
    { label: "L", value: { width: 720, height: "auto" } },
  ];

  const handleSizeChange = (size: {
    width: number | string;
    height: number | string;
  }) => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "imageExtended") return;

    editor
      .chain()
      .focus()
      .updateAttributes("imageExtended", {
        width: size.width,
        height: size.height,
      })
      .run();
  };

  const handleAlignment = (align: "left" | "center" | "right") => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "imageExtended") return;

    editor.chain().focus().updateAttributes("imageExtended", { align }).run();
  };

  const handleRotate = () => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "imageExtended") return;

    const current = node.attrs.rotate ?? 0;
    const next = (current + 90) % 360;

    editor.chain().focus().updateAttributes("imageExtended", { rotate: next }).run();
  };

  const handleFlip = (axis: "horizontal" | "vertical") => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "imageExtended") return;

    const key = axis === "horizontal" ? "flipH" : "flipV";
    const current = !!node.attrs[key];

    editor
      .chain()
      .focus()
      .updateAttributes("imageExtended", { [key]: !current })
      .run();
  };

  const handleDelete = () => {
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="enhanced-image-bubble-menu"
      shouldShow={({ state }: any) => {
        const { selection } = state;
        // Only show when a full node selection exists for imageExtended
        return (
          isNodeSelection(selection) &&
          selection.node.type.name === "imageExtended"
        );
      }}
      options={{
        placement: "top",
        offset: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "background.paper",
          p: 0.5,
          borderRadius: 2,
          boxShadow: 4,
          border: "1px solid",
          borderColor: "divider",
          pointerEvents: "all",
        }}
      >
        {/* Size Options */}
        <Box sx={{ display: "flex", gap: 0.25 }}>
          {sizeOptions.map((opt) => (
            <Tooltip
              key={opt.label}
              title={`${opt.label} · ${opt.value.width}px wide`}
            >
              <Button
                size="small"
                variant="text"
                onClick={() => handleSizeChange(opt.value)}
                sx={{
                  minWidth: 32,
                  fontSize: "13px",
                  fontWeight: 600,
                  px: 1,
                  color: "text.primary",
                }}
              >
                {opt.label}
              </Button>
            </Tooltip>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Alignment Options */}
        <Tooltip title="Align left">
          <IconButton size="small" onClick={() => handleAlignment("left")}>
            <MdFormatAlignLeft />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align center">
          <IconButton size="small" onClick={() => handleAlignment("center")}>
            <MdFormatAlignCenter />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align right">
          <IconButton size="small" onClick={() => handleAlignment("right")}>
            <MdFormatAlignRight />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Transform Options */}
        <Tooltip title="Rotate 90° right">
          <IconButton size="small" onClick={handleRotate}>
            <MdRotateRight />
          </IconButton>
        </Tooltip>
        <Tooltip title="Flip horizontal">
          <IconButton size="small" onClick={() => handleFlip("horizontal")}>
            <TbFlipHorizontal />
          </IconButton>
        </Tooltip>
        <Tooltip title="Flip vertical">
          <IconButton size="small" onClick={() => handleFlip("vertical")}>
            <TbFlipVertical />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Delete */}
        <Tooltip title="Delete image">
          <IconButton size="small" color="error" onClick={handleDelete}>
            <MdDelete />
          </IconButton>
        </Tooltip>
      </Box>
    </BubbleMenu>
  );
}
