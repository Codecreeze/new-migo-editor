import React from "react";
import { AiOutlineItalic } from "react-icons/ai";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextItalic: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="italic"
      tooltip="Italic"
      icon={<AiOutlineItalic />}
    />
  );
};

export default RichTextItalic;
