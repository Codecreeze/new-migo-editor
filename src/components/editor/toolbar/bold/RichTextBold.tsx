import React from "react";
import { AiOutlineBold } from "react-icons/ai";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextBold: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="bold"
      tooltip="Bold"
      icon={<AiOutlineBold />}
    />
  );
};

export default RichTextBold;
