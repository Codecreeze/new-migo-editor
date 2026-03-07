import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight = Extension.create({
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

export default LineHeight;
