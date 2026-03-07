import { Editor, useEditorState } from "@tiptap/react";

export function useMarkActive(editor: Editor, markName: string) {
  return useEditorState({
    editor,
    selector: ({ editor }) => {
      const { state } = editor;
      const { from, to } = state.selection;

      if (from !== to) {
        return editor.isActive(markName);
      }

      const storedMarks =
        state.storedMarks ??
        ("$from" in state.selection
          ? (state.selection as any)?.$from?.marks()
          : undefined);

      return (
        storedMarks?.some((mark: any) => mark.type.name === markName) ?? false
      );
    },
  });
}
