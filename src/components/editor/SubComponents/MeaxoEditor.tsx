import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { FontFamily } from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Strike from "@tiptap/extension-strike";
import { Extension } from "@tiptap/core";
import { Callout } from "../extensions/CalloutNode";
import { RichTextProvider, RichTextToolbar, useRichTextTheme } from "../toolbar";
import { MeaxoEditorStyles } from "./style";
import { Box } from "@mui/material";

// Wrapper component to access theme context
const MeaxoEditorStylesWrapper = () => {
  const { themeMode } = useRichTextTheme();
  return <MeaxoEditorStyles themeMode={themeMode} />;
};

// Custom Font Size Extension using TextStyle
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) =>
              element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes: Record<string, any>) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }: any) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

// Custom Line Height Extension
const LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "1.5",
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element: HTMLElement) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attributes: Record<string, any>) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands }: any) => {
          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { lineHeight }),
          );
        },
      unsetLineHeight:
        () =>
        ({ commands }: any) => {
          return this.options.types.every((type: string) =>
            commands.resetAttributes(type, "lineHeight"),
          );
        },
    };
  },
});

interface MeaxoEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export const MeaxoEditor: React.FC<MeaxoEditorProps> = ({
  content = "",
  onChange,
  placeholder = "Start writing...",
}) => {
  const editor = useEditor({
    extensions: [
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
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "custom-link",
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize,
      LineHeight.configure({
        types: ["paragraph", "heading"],
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "custom-image",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Typography,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Subscript,
      Superscript,
      Strike,
      Callout,
    ],
    content,
    onUpdate: ({ editor }: { editor: any }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    shouldRerenderOnTransaction: true,
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
