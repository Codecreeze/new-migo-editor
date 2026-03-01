import { Extension } from "@tiptap/core";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { TextSelection } from "@tiptap/pm/state";

interface MatchCoordinate {
  from: number;
  to: number;
  text: string;
}

const SearchAndReplace = Extension.create({
  name: "searchAndReplace",

  addStorage() {
    return {
      searchTerm: "",
      replaceTerm: "",
      caseSensitive: false,
      matches: [] as MatchCoordinate[],
      activeMatchIndex: 0,
      totalMatches: 0,
    };
  },

  addCommands() {
    return {
      updateSearch:
        (options: { searchTerm: string; caseSensitive?: boolean }) =>
        ({ tr, dispatch }: any) => {
          const { searchTerm, caseSensitive = false } = options;

          if (dispatch) {
            this.storage.searchTerm = searchTerm;
            this.storage.caseSensitive = caseSensitive;
            this.storage.matches = [];
            this.storage.activeMatchIndex = 0;
            this.storage.totalMatches = 0;

            if (searchTerm) {
              // Find all matches in the document
              const matches: MatchCoordinate[] = [];
              const flags = caseSensitive ? "g" : "gi";
              const regex = new RegExp(
                searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                flags,
              );

              tr.doc.descendants((node: any, pos: any) => {
                if (node.isText && node.text) {
                  let match;
                  regex.lastIndex = 0;
                  while ((match = regex.exec(node.text)) !== null) {
                    matches.push({
                      from: pos + match.index,
                      to: pos + match.index + match[0].length,
                      text: match[0],
                    });
                    if (match.index === regex.lastIndex) {
                      regex.lastIndex++;
                    }
                  }
                }
              });

              this.storage.matches = matches;
              this.storage.totalMatches = matches.length;
              if (matches.length > 0) {
                this.storage.activeMatchIndex = 0;
              }
            }

            dispatch(tr);
          }
          return true;
        },

      setActiveMatch:
        (index: number) =>
        ({ tr, dispatch, view }: any) => {
          const matches = this.storage.matches;

          if (dispatch && index >= 0 && index < matches.length) {
            this.storage.activeMatchIndex = index;
            const match = matches[index];

            if (match) {
              // Create a text selection at the match location
              const selection = TextSelection.create(
                tr.doc,
                match.from,
                match.to,
              );
              tr.setSelection(selection);

              // Dispatch the transaction
              dispatch(tr);

              // Force scroll using the view's scrollIntoView with the selection
              if (view) {
                // Get the DOM coordinates of the selection
                const coords = view.coordsAtPos(match.from);

                // Calculate if we need to scroll
                const scrollContainer = view.dom.closest(
                  ".meaxo-editor-content",
                );
                if (scrollContainer) {
                  const containerRect = scrollContainer.getBoundingClientRect();
                  const relativeTop = coords.top - containerRect.top;

                  // If the match is outside the visible area, scroll to it
                  if (
                    relativeTop < 0 ||
                    relativeTop > containerRect.height - 100
                  ) {
                    scrollContainer.scrollTo({
                      top:
                        scrollContainer.scrollTop +
                        relativeTop -
                        containerRect.height / 2,
                      behavior: "smooth",
                    });
                  }
                }
              }

              return true;
            }
          }
          return false;
        },

      replaceFirst:
        () =>
        ({ tr, dispatch, state }: any) => {
          const { matches, activeMatchIndex, replaceTerm } = this.storage;

          if (matches.length > 0 && dispatch) {
            const match = matches[activeMatchIndex];
            if (match) {
              tr.replaceWith(
                match.from,
                match.to,
                state.schema.text(replaceTerm),
              );
              dispatch(tr);
              return true;
            }
          }
          return false;
        },

      replaceAll:
        () =>
        ({ tr, dispatch, state }: any) => {
          const { matches, replaceTerm } = this.storage;

          if (matches.length > 0 && dispatch) {
            // Iterate in reverse order to prevent position shifting
            for (let i = matches.length - 1; i >= 0; i--) {
              const match = matches[i];
              tr.replaceWith(
                match.from,
                match.to,
                state.schema.text(replaceTerm),
              );
            }
            dispatch(tr);
            return true;
          }
          return false;
        },
    } as any;
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey("searchAndReplace");

    return [
      new Plugin({
        key: pluginKey,
        props: {
          decorations: (state) => {
            const { searchTerm, matches, activeMatchIndex } = this.storage;

            if (!searchTerm || matches.length === 0) {
              return DecorationSet.empty;
            }

            const decorations = matches.map((match: any, index: any) => {
              const isActive = index === activeMatchIndex;
              return Decoration.inline(match.from, match.to, {
                class: isActive ? "search-result-active" : "search-result",
                style: isActive
                  ? "background-color: #ff6b35; color: white; border-radius: 3px; padding: 1px 2px;"
                  : "background-color: yellow; color: black; border-radius: 3px; padding: 1px 2px;",
              });
            });

            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});

export default SearchAndReplace;
