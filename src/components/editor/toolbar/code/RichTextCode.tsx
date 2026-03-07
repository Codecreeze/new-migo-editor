import React from 'react';
import { SiCodecrafters } from "react-icons/si";
import ToolbarMarkButton from '../shared/ToolbarMarkButton';

export const RichTextCode: React.FC = () => {
  return (
    <ToolbarMarkButton
      mark="code"
      tooltip="Inline Code"
      icon={<SiCodecrafters />}
    />
  );
};

export default RichTextCode;
