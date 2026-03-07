import React from "react";
import { Box } from "@mui/material";
import {
  RichTextUndo,
  RichTextRedo,
  RichTextSearchAndReplace,
  RichTextClear,
  RichTextFontFamily,
  RichTextHeading,
  RichTextFontSize,
  RichTextBold,
  RichTextItalic,
  RichTextUnderline,
  RichTextStrike,
  RichTextSubscript,
  RichTextSuperscript,
  RichTextColor,
  RichTextHighlight,
  RichTextBulletList,
  RichTextOrderedList,
  RichTextTaskList,
  RichTextAlignLeft,
  RichTextAlignCenter,
  RichTextAlignRight,
  RichTextAlignJustify,
  RichTextLineHeight,
  RichTextLink,
  RichTextImage,
  RichTextVideo,
  RichTextBlockquote,
  RichTextHorizontalRule,
  RichTextCode,
  RichTextCodeBlock,
  RichTextTable,
  RichTextColumn,
  RichTextCallout,
  RichTextExportPdf,
  RichTextThemeToggle,
  Separator,
} from "./index";

export const RichTextToolbar: React.FC = () => {
  return (
    <React.Fragment>
      {/* Toolbar */}
      <Box className="meaxo-editor-toolbar">
        {/* History & Search Group */}
        <RichTextUndo />
        <RichTextRedo />
        <RichTextSearchAndReplace />
        <RichTextClear />
        <Separator />

        {/* Typography Group */}
        <RichTextFontSize />
        <RichTextHeading />
        <RichTextFontFamily />
        <Separator />

        {/* Text Formatting Group */}
        <RichTextBold />
        <RichTextItalic />
        <RichTextUnderline />
        <RichTextStrike />
        <RichTextCode />
        <RichTextSubscript />
        <RichTextSuperscript />
        <Separator />

        {/* Alignment Group */}

        <RichTextAlignLeft />
        <RichTextAlignCenter />
        <RichTextAlignRight />
        <RichTextAlignJustify />
        <RichTextLineHeight />
        <Separator />

        {/* Color & Styling Group */}
        <RichTextColor />
        <RichTextHighlight />
        <Separator />

        {/* Lists Group */}
        <RichTextBulletList />
        <RichTextOrderedList />
        <RichTextTaskList />
        <Separator />

        {/* Media & Links Group */}
        <RichTextLink />
        <RichTextImage />
        <RichTextVideo />
        <Separator />

        {/* Content Blocks Group */}
        <RichTextBlockquote />
        <RichTextHorizontalRule />
        <RichTextCodeBlock />
        <RichTextTable />
        <RichTextColumn />
        <RichTextCallout />
        <Separator />

        {/* Import/Export & Utilities Group */}
        <RichTextExportPdf />
        <RichTextThemeToggle />
      </Box>
    </React.Fragment>
  );
};

export default RichTextToolbar;
