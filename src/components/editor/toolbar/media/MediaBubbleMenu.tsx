import { Editor } from "@tiptap/react";
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

const MediaBubbleMenu = ({ editor }: Props) => {
  if (!editor) return null;

  console.debug("[MediaBubbleMenu] render", {
    selection: editor.state.selection?.from,
  });

  const sizeOptions = [
    { label: "S", value: { width: 200, height: 200 } },
    { label: "M", value: { width: 400, height: 400 } },
    { label: "L", value: { width: 600, height: 600 } },
  ];

  const handleSizeChange = (size: { width: number; height: number }) => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node && (node.type.name === "image" || node.type.name === "video")) {
      editor
        .chain()
        .focus()
        .updateAttributes(node.type.name, {
          width: size.width,
          height: size.height,
        })
        .run();
    }
  };

  const handleAlignment = (alignment: "left" | "center" | "right") => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node && (node.type.name === "image" || node.type.name === "video")) {
      editor
        .chain()
        .focus()
        .updateAttributes(node.type.name, {
          align: alignment,
        })
        .run();
    }
  };

  const handleRotate = () => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node && (node.type.name === "image" || node.type.name === "video")) {
      const currentRotation = node.attrs.rotation || 0;
      const newRotation = currentRotation + 90;

      editor
        .chain()
        .focus()
        .updateAttributes(node.type.name, {
          rotation: newRotation % 360,
        })
        .run();
    }
  };

  const handleFlip = (direction: "horizontal" | "vertical") => {
    const { from } = editor.state.selection;
    const node = editor.state.doc.nodeAt(from);

    if (node && (node.type.name === "image" || node.type.name === "video")) {
      const flipH =
        direction === "horizontal"
          ? !(node.attrs.flipH || false)
          : node.attrs.flipH || false;
      const flipV =
        direction === "vertical"
          ? !(node.attrs.flipV || false)
          : node.attrs.flipV || false;

      editor
        .chain()
        .focus()
        .updateAttributes(node.type.name, {
          flipH,
          flipV,
        })
        .run();
    }
  };

  const handleDelete = () => {
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <>
      <BubbleMenu editor={editor} pluginKey="mediaBubbleMenu">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            bgcolor: "background.paper",
            p: 0.5,
            borderRadius: 1,
            boxShadow: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Size Options */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            {sizeOptions.map((option) => (
              <Tooltip
                key={option.label}
                title={`${option.label} · ${option.value.width}px`}
              >
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleSizeChange(option.value)}
                  sx={{
                    minWidth: 0,
                    fontSize: "12px",
                    px: 0.5,
                    fontWeight: 600,
                  }}
                >
                  {option.label}
                </Button>
              </Tooltip>
            ))}
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Alignment Options */}
          <Tooltip title="Align Left">
            <IconButton size="small" onClick={() => handleAlignment("left")}>
              <MdFormatAlignLeft />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Center">
            <IconButton size="small" onClick={() => handleAlignment("center")}>
              <MdFormatAlignCenter />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Right">
            <IconButton size="small" onClick={() => handleAlignment("right")}>
              <MdFormatAlignRight />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          <Tooltip title="Rotate Right">
            <IconButton size="small" onClick={handleRotate}>
              <MdRotateRight />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* Flip Options */}
          <Tooltip title="Flip Horizontal">
            <IconButton size="small" onClick={() => handleFlip("horizontal")}>
              <TbFlipHorizontal />
            </IconButton>
          </Tooltip>
          <Tooltip title="Flip Vertical">
            <IconButton size="small" onClick={() => handleFlip("vertical")}>
              <TbFlipVertical />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />

          {/* Delete */}
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={handleDelete}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </Box>
      </BubbleMenu>
    </>
  );
};

export default MediaBubbleMenu;
