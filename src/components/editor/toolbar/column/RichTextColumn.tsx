import React from "react";
import { useRichTextEditor } from "../RichTextProvider";
import ColumnBubbleMenu from "./ColumnBubbleMenu";

export const RichTextColumn: React.FC = () => {
  const editor = useRichTextEditor();

  return <ColumnBubbleMenu editor={editor} />;
};

export default RichTextColumn;
