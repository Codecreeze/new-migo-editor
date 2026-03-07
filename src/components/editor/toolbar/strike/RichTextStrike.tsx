import React from "react";
import { HiOutlineStrikethrough } from "react-icons/hi2";
import ToolbarMarkButton from "../shared/ToolbarMarkButton";

export const RichTextStrike: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="strike"
      tooltip="Strikethrough"
      icon={<HiOutlineStrikethrough />}
    />
  );
};

export default RichTextStrike;
