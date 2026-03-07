import React from "react";
import { AiOutlineUnderline } from "react-icons/ai";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextUnderline: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="underline"
      tooltip="Underline (Ctrl+U)"
      icon={<AiOutlineUnderline />}
    />
  );
};

export default RichTextUnderline;
