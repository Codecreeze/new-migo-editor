import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Popover,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbColumnRemove,
  TbLayoutColumns,
} from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  editor: Editor;
}

const ColumnPopOver = ({ editor }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  if (!editor) return null;

  // Check if cursor is inside columns
  const isInColumns = () => {
    const { from } = editor.state.selection;
    const resolvedPos = editor.state.doc.resolve(from);

    for (let depth = resolvedPos.depth; depth > 0; depth--) {
      const node = resolvedPos.node(depth);
      if (node.type.name === "columns" || node.type.name === "column") {
        return true;
      }
    }
    return false;
  };

  // Get current column count
  const getColumnCount = () => {
    const { from } = editor.state.selection;
    const resolvedPos = editor.state.doc.resolve(from);

    for (let depth = resolvedPos.depth; depth > 0; depth--) {
      const node = resolvedPos.node(depth);
      if (node.type.name === "columns") {
        return node.childCount;
      }
    }
    return 0;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isInColumns()) {
      setAnchorEl(event.currentTarget);
    } else {
      // Insert new column layout if not in columns
      editor.chain().focus().insertColumnLayout().run();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columnOperations = [
    {
      label: "Add Column to Left",
      icon: <TbColumnInsertLeft />,
      action: () => editor.chain().focus().addColumnLeft().run(),
      disabled: getColumnCount() >= 5,
    },
    {
      label: "Add Column to Right",
      icon: <TbColumnInsertRight />,
      action: () => editor.chain().focus().addColumnRight().run(),
      disabled: getColumnCount() >= 5,
    },
    {
      label: "Delete This Column",
      icon: <TbColumnRemove />,
      action: () => editor.chain().focus().deleteColumn().run(),
      disabled: getColumnCount() <= 1,
      color: "error" as const,
    },
    {
      label: "Clear All Columns",
      icon: <RiDeleteBin6Line />,
      action: () => editor.chain().focus().clearAllColumns().run(),
      color: "error" as const,
    },
  ];

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title={isInColumns() ? "Column Options" : "Columns"} arrow>
        <IconButton
          size="small"
          onClick={handleClick}
          className={isInColumns() ? "is-active" : ""}
        >
          <TbLayoutColumns />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              boxShadow: 3,
              border: "1px solid",
              borderColor: "divider",
              minWidth: 200,
            },
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Column Actions ({getColumnCount()} columns)
          </Typography>

          <List dense sx={{ py: 0 }}>
            {columnOperations.map((operation, index) => (
              <React.Fragment key={operation.label}>
                <ListItem
                  onClick={
                    operation.disabled
                      ? undefined
                      : () => {
                          operation.action();
                          handleClose();
                        }
                  }
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    color: operation.color || "inherit",
                    cursor: operation.disabled ? "default" : "pointer",
                    opacity: operation.disabled ? 0.5 : 1,
                    "&:hover": {
                      backgroundColor: operation.disabled
                        ? "transparent"
                        : "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {operation.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={operation.label}
                    slotProps={{
                      primary: {
                        fontSize: 14,
                      },
                    }}
                  />
                </ListItem>
                {index === 1 && <Divider sx={{ my: 0.5 }} />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default ColumnPopOver;
