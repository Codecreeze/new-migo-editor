import { Extension } from "@tiptap/core";

export const COLUMN_LAYOUT_CLASS = "meaxo-column-layout";
export const COLUMN_LAYOUT_ATTRIBUTE = "data-column-layout";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columnLayout: {
      insertColumnLayout: () => ReturnType;
    };
  }
}

export const ColumnsExtension = Extension.create({
  name: 'columnLayout',
  addCommands() {
    return {
      insertColumnLayout:
        () =>
        ({ chain }) => {
          return chain()
            .focus()
            .insertTable({ rows: 1, cols: 2, withHeaderRow: false })
            .updateAttributes('table', {
              class: COLUMN_LAYOUT_CLASS,
              [COLUMN_LAYOUT_ATTRIBUTE]: 'true',
            })
            .run();
        },
    };
  },
});
