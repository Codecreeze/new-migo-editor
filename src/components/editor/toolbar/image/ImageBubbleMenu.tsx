import { Editor, isNodeSelection } from "@tiptap/core"; // ← import isNodeSelection here!
import { BubbleMenu } from "@tiptap/react/menus";
import { Box, IconButton, Tooltip, Divider, Button } from "@mui/material";
import {
  MdDelete,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdRotateRight,
} from "react-icons/md";
import { TbFlipVertical, TbFlipHorizontal } from "react-icons/tb";

interface Props {
  editor: Editor;
}

const ImageBubbleMenu = ({ editor }: Props) => {
  if (!editor) return null;

  const sizeOptions = [
    { label: "S", value: { width: 240, height: "auto" } }, // better defaults (height auto prevents distortion)
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
    if (node.type.name !== "image") return; // remove video if not using it

    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        width: size.width,
        height: size.height,
      })
      .run();
  };

  const handleAlignment = (align: "left" | "center" | "right") => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "image") return;

    editor.chain().focus().updateAttributes("image", { align }).run();
  };

  const handleRotate = () => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "image") return;

    const current = node.attrs.rotation ?? 0;
    const next = (current + 90) % 360;

    editor.chain().focus().updateAttributes("image", { rotation: next }).run();
  };

  const handleFlip = (axis: "horizontal" | "vertical") => {
    const { selection } = editor.state;
    if (!isNodeSelection(selection)) return;

    const node = selection.node;
    if (node.type.name !== "image") return;

    const key = axis === "horizontal" ? "flipH" : "flipV";
    const current = !!node.attrs[key];

    editor
      .chain()
      .focus()
      .updateAttributes("image", { [key]: !current })
      .run();
  };

  const handleDelete = () => {
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="image-bubble-menu" // unique key – good practice
      options={{
        placement: "top",
        offset: 8,
      }}
      shouldShow={({ editor, state }) => {
        const { selection } = state;

        // Core condition: show only when whole image node is selected
        return (
          isNodeSelection(selection) && selection.node.type.name === "image"
        );

        // Alternative (more lenient) version if you also want to show when cursor is *inside* image:
        // return editor.isActive("image");
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
          pointerEvents: "all", // important when inside complex layouts
        }}
      >
        {/* Size */}
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
                sx={{ minWidth: 32, fontSize: "13px", fontWeight: 600, px: 1 }}
              >
                {opt.label}
              </Button>
            </Tooltip>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Alignment */}
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

        {/* Rotate + Flip */}
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
};

export default ImageBubbleMenu;
