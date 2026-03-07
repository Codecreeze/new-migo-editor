import React, { useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Strike from "@tiptap/extension-strike";
import { Callout } from "../extensions/CalloutNode";
import { Video } from "../extensions/VideoNode";
import { Columns, Column } from "../extensions/NewColumnsExtension";
import { FontSize } from "../extensions/FontSizeExtension";
import { LineHeight } from "../extensions/LineHeightExtension";
import SearchAndReplace from "../toolbar/searchAndReplace/SearchExtension";
import {
  RichTextProvider,
  RichTextToolbar,
  useRichTextTheme,
} from "../toolbar";
import { MeaxoEditorStyles } from "./style";
import { Box } from "@mui/material";
import CustomImage from "../extensions/CustomImage";
import ImageExtended from "../extensions/ImageExtended";

// Wrapper component to access theme context
const MeaxoEditorStylesWrapper = () => {
  const { themeMode } = useRichTextTheme();
  return <MeaxoEditorStyles themeMode={themeMode} />;
};

interface MeaxoEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export const MeaxoEditor: React.FC<MeaxoEditorProps> = (props) => {
  const { content = "", onChange, placeholder = "Start writing..." } = props;

  const extensions = useMemo(
    () => [
      // History & search tools
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        link: false, // Disable built-in link to avoid duplicate
        strike: false, // Disable built-in strike to avoid duplicate
        underline: false, // Disable built-in underline to avoid duplicate
      }),
      SearchAndReplace,

      // Typography
      TextStyle,
      FontSize,
      FontFamily.configure({
        types: ["textStyle"],
      }),

      // Text formatting
      Underline,
      Strike,
      Subscript,
      Superscript,
      Typography,

      // Alignment & spacing
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      LineHeight.configure({
        types: ["paragraph", "heading"],
      }),

      // Color & highlight
      Color,
      Highlight.configure({
        multicolor: true,
      }),

      // Lists
      TaskList,
      TaskItem.configure({
        nested: true,
      }),

      // Media & links
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "custom-link",
        },
      }),
      CustomImage.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "custom-image",
        },
      }),
      ImageExtended.configure({
        HTMLAttributes: {
          class: "image-extended",
        },
      }),
      Video,

      // Content blocks
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Columns,
      Column,
      Callout,

      // Utilities
      Placeholder.configure({
        placeholder,
      }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }: { editor: any }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class: "ProseMirror",
      },
    },
  });

  if (!editor) return null;

  return (
    <Box className="meaxo-editor-container">
      <RichTextProvider editor={editor}>
        <MeaxoEditorStylesWrapper />
        <Box className="meaxo-editor-toolbar">
          <RichTextToolbar />
        </Box>
        <Box className="meaxo-editor-content">
          <EditorContent editor={editor} />
        </Box>
      </RichTextProvider>
    </Box>
  );
};

export default MeaxoEditor;
