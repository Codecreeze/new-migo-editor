import React from "react";
import { MdSubscript } from "react-icons/md";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextSubscript: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="subscript"
      tooltip="Subscript"
      icon={<MdSubscript />}
    />
  );
};

export default RichTextSubscript;
