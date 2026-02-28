import React from "react";
import { Divider } from "@mui/material";

export const Separator: React.FC = () => {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ padding: "0 1px", margin: 0 }}
    />
  );
};

export default Separator;
