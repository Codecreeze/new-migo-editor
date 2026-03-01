import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Box, IconButton, Tooltip, Divider } from "@mui/material";
import { MdAddBox, MdDeleteSweep } from "react-icons/md";

interface Props {
  editor: Editor;
}

const ColumnBubbleMenu = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <BubbleMenu 
      editor={editor}>
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
        <Tooltip title="Insert Column Left">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            <MdAddBox style={{ transform: "rotate(90deg)" }} />
          </IconButton>
        </Tooltip>

        {/* Insert Column Right */}
        <Tooltip title="Insert Column Right">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            <MdAddBox style={{ transform: "rotate(-90deg)" }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        {/* Delete Entire Layout */}
        <Tooltip title="Delete Column">
          <IconButton
            size="small"
            color="error"
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            <MdDeleteSweep />
          </IconButton>
        </Tooltip>
      </Box>
    </BubbleMenu>
  );
};

export default ColumnBubbleMenu;
