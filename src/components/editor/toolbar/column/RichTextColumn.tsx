import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FiColumns } from "react-icons/fi";
import { useRichTextEditor } from "../RichTextProvider";
import "./column.scss";
import ColumnBubbleMenu from "./ColumnBubbleMenu";

export const RichTextColumn: React.FC = () => {
  const editor = useRichTextEditor();

  const insertLayoutColumns = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
      .updateAttributes("table", { class: "meaxo-column-layout" })
      .updateAttributes("tableCell", {
        borderTopWidth: "2px",
        borderTopColor: "#ff0000",
        borderTopStyle: "solid",
      })
      .run();
  };

  return (
    <React.Fragment>
      <Tooltip title="Columns" arrow>
        <IconButton size="small" onClick={insertLayoutColumns}>
          <FiColumns />
        </IconButton>
      </Tooltip>
      <ColumnBubbleMenu editor={editor} />
    </React.Fragment>
  );
};

export default RichTextColumn;
