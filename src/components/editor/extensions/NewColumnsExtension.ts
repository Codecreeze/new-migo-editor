import { Node, mergeAttributes } from "@tiptap/core";

export const COLUMN_LAYOUT_CLASS = "meaxo-column-layout";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columnLayout: {
      insertColumnLayout: () => ReturnType;
      addColumnLeft: () => ReturnType;
      addColumnRight: () => ReturnType;
      deleteColumn: () => ReturnType;
      clearAllColumns: () => ReturnType;
    };
  }
}

// Outer wrapper (the one that gets your class + grid)
export const Columns = Node.create({
  name: "columns",
  group: "block",
  content: "column+",
  defining: true,

  addAttributes() {
    return {
      columns: { default: 2 },
    };
  },

  parseHTML() {
    return [{ tag: `div[data-type="columns"]` }];
  },

  renderHTML({ HTMLAttributes, node }) {
    console.log("✅ Columns renderHTML called! Adding class"); // ← debug
    const columnCount = node.childCount;
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "columns",
        "data-columns": columnCount.toString(),
        class: COLUMN_LAYOUT_CLASS,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      insertColumnLayout:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: "columns",
              content: [
                { type: "column", content: [{ type: "paragraph" }] },
                { type: "column", content: [{ type: "paragraph" }] },
              ],
            })
            .focus('start')
            .run();
        },
      
      addColumnLeft:
        () =>
        ({ tr, dispatch, state }) => {
          const { from } = state.selection;
          const resolvedPos = state.doc.resolve(from);
          
          // Find column and columns nodes
          let columnPos = -1;
          let columnsPos = -1;
          let columnIndex = -1;
          
          for (let depth = resolvedPos.depth; depth > 0; depth--) {
            const node = resolvedPos.node(depth);
            if (node.type.name === 'column' && columnPos === -1) {
              columnPos = resolvedPos.before(depth);
            }
            if (node.type.name === 'columns' && columnsPos === -1) {
              columnsPos = resolvedPos.before(depth);
              // Find which column we're in
              const columnsNode = node;
              let currentPos = resolvedPos.before(depth) + 1;
              for (let i = 0; i < columnsNode.childCount; i++) {
                const child = columnsNode.child(i);
                if (currentPos <= from && from < currentPos + child.nodeSize) {
                  columnIndex = i;
                  break;
                }
                currentPos += child.nodeSize;
              }
              break;
            }
          }
          
          if (columnPos !== -1 && columnsPos !== -1 && columnIndex !== -1) {
            const columnsNode = state.doc.nodeAt(columnsPos);
            if (columnsNode && columnsNode.childCount < 5) { // Max 5 columns
              const newColumn = state.schema.nodes.column.create(null, [
                state.schema.nodes.paragraph.create()
              ]);
              tr.insert(columnPos, newColumn);
              if (dispatch) dispatch(tr);
              return true;
            }
          }
          return false;
        },
        
      addColumnRight:
        () =>
        ({ tr, dispatch, state }) => {
          const { from } = state.selection;
          const resolvedPos = state.doc.resolve(from);
          
          // Find column and columns nodes
          let columnPos = -1;
          let columnsPos = -1;
          let columnIndex = -1;
          
          for (let depth = resolvedPos.depth; depth > 0; depth--) {
            const node = resolvedPos.node(depth);
            if (node.type.name === 'column' && columnPos === -1) {
              columnPos = resolvedPos.after(depth);
            }
            if (node.type.name === 'columns' && columnsPos === -1) {
              columnsPos = resolvedPos.before(depth);
              // Find which column we're in
              const columnsNode = node;
              let currentPos = resolvedPos.before(depth) + 1;
              for (let i = 0; i < columnsNode.childCount; i++) {
                const child = columnsNode.child(i);
                if (currentPos <= from && from < currentPos + child.nodeSize) {
                  columnIndex = i;
                  break;
                }
                currentPos += child.nodeSize;
              }
              break;
            }
          }
          
          if (columnPos !== -1 && columnsPos !== -1 && columnIndex !== -1) {
            const columnsNode = state.doc.nodeAt(columnsPos);
            if (columnsNode && columnsNode.childCount < 5) { // Max 5 columns
              const newColumn = state.schema.nodes.column.create(null, [
                state.schema.nodes.paragraph.create()
              ]);
              tr.insert(columnPos, newColumn);
              if (dispatch) dispatch(tr);
              return true;
            }
          }
          return false;
        },
        
      deleteColumn:
        () =>
        ({ tr, dispatch, state }) => {
          const { from } = state.selection;
          const resolvedPos = state.doc.resolve(from);
          
          // Find column and columns nodes
          let columnPos = -1;
          let columnSize = 0;
          let columnsPos = -1;
          
          for (let depth = resolvedPos.depth; depth > 0; depth--) {
            const node = resolvedPos.node(depth);
            if (node.type.name === 'column' && columnPos === -1) {
              columnPos = resolvedPos.before(depth);
              columnSize = node.nodeSize;
            }
            if (node.type.name === 'columns' && columnsPos === -1) {
              columnsPos = resolvedPos.before(depth);
              break;
            }
          }
          
          if (columnPos !== -1 && columnsPos !== -1) {
            const columnsNode = state.doc.nodeAt(columnsPos);
            if (columnsNode && columnsNode.childCount > 1) { // Keep at least 1 column
              tr.delete(columnPos, columnPos + columnSize);
              if (dispatch) dispatch(tr);
              return true;
            }
          }
          return false;
        },
        
      clearAllColumns:
        () =>
        ({ tr, dispatch, state }) => {
          const { from } = state.selection;
          const resolvedPos = state.doc.resolve(from);
          
          // Find columns node
          for (let depth = resolvedPos.depth; depth > 0; depth--) {
            const node = resolvedPos.node(depth);
            if (node.type.name === 'columns') {
              const pos = resolvedPos.before(depth);
              tr.delete(pos, pos + node.nodeSize);
              if (dispatch) dispatch(tr);
              return true;
            }
          }
          return false;
        },
    };
  },
});

// Individual column (editable content inside)
export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,

  parseHTML() {
    return [{ tag: `div[data-type="column"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "column" }), 0];
  },
});
