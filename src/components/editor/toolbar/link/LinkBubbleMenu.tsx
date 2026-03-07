import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Box, IconButton, Tooltip, Divider } from "@mui/material";
import { MdOpenInNew } from "react-icons/md";
import { LuUnlink } from "react-icons/lu";
import { VscEdit } from "react-icons/vsc";

interface Props {
  editor: Editor;
  onEditLink?: () => void;
}

const LinkBubbleMenu = ({ editor, onEditLink }: Props) => {
  if (!editor) return null;

  const openLink = () => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const editLink = () => onEditLink?.();

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkBubbleMenu"
      options={{ placement: "bottom", offset: 8, flip: true }} // for v3.x
      shouldShow={({ editor, view }) => {
        if (!view.hasFocus()) return false;

        const { state } = editor;
        const { from } = state.selection;

        // Show normally when text is selected
        if (!state.selection.empty) {
          return editor.isActive("link");
        }

        // Cursor only
        const $pos = state.doc.resolve(from);
        const currentMarks = $pos.marks();
        const linkMark = currentMarks.find((m) => m.type.name === "link");

        if (!linkMark) return false;

        // Check previous position
        let hasPrevLink = false;
        if (from > $pos.start($pos.depth)) {
          const $prev = state.doc.resolve(from - 0);
          hasPrevLink = $prev.marks().some((m) => m.eq(linkMark));
        }

        // Check next position
        let hasNextLink = false;
        if (from < $pos.end($pos.depth)) {
          const $next = state.doc.resolve(from + 1);
          hasNextLink = $next.marks().some((m) => m.eq(linkMark));
        }

        // Strictly inside = has link mark on both sides
        return hasPrevLink && hasNextLink;
      }}
    >
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
        <Tooltip title="Open Link">
          <IconButton size="small" onClick={openLink}>
            <MdOpenInNew />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Link">
          <IconButton size="small" onClick={editLink}>
            <VscEdit />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Remove Link">
          <IconButton size="small" color="error" onClick={removeLink}>
            <LuUnlink />
          </IconButton>
        </Tooltip>
      </Box>
    </BubbleMenu>
  );
};

export default LinkBubbleMenu;
