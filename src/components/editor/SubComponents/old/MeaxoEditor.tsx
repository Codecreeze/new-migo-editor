import "./style.scss";

import {
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
      <ul>
        <li>Select any item to display a global menu</li>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    `,
  });

  const { isBold, isItalic, isStrikethrough } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrikethrough: ctx.editor.isActive("strike"),
    }),
  });

  return (
    <>
      {editor && (
        <>
          <BubbleMenu
            editor={editor}
            options={{ placement: "bottom", offset: 8, flip: true }}
            shouldShow={() =>
              editor.isActive("bold") ||
              editor.isActive("italic") ||
              editor.isActive("strike")
            }
          >
            <div className="bubble-menu">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={isBold ? "is-active" : ""}
                type="button"
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={isItalic ? "is-active" : ""}
                type="button"
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={isStrikethrough ? "is-active" : ""}
                type="button"
              >
                Strike
              </button>
            </div>
          </BubbleMenu>
        </>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
