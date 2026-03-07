import React from "react";
import { MdSuperscript } from "react-icons/md";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextSuperscript: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="superscript"
      tooltip="Superscript"
      icon={<MdSuperscript />}
    />
  );
};

export default RichTextSuperscript;
