import { Node, mergeAttributes } from "@tiptap/core";

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: {
        src: string;
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

const isDirectVideoSource = (src: string) =>
  src.startsWith("blob:") ||
  /(\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)(\?.*)?$)/i.test(src);

const buildVideoChild = (
  src: string,
  width: string,
  height: string,
  htmlAttributes: Record<string, any>,
) => {
  if (isDirectVideoSource(src)) {
    return [
      "video",
      mergeAttributes(
        {
          src,
          controls: true,
          preload: "metadata",
          style: `width: ${width}; height: ${height};`,
        },
        htmlAttributes,
      ),
    ];
  }

  return [
    "iframe",
    mergeAttributes(
      {
        src,
        width,
        height,
        frameborder: "0",
        allowfullscreen: "true",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      },
      htmlAttributes,
    ),
  ];
};

export const Video = Node.create<VideoOptions>({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: "video-wrapper",
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "400px",
      },
    };
  },

  parseHTML() {
    return [
      { tag: "div.video-wrapper" },
      { tag: "iframe[src]" },
      { tag: "video[src]" },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { src, width, height } = node.attrs;
    if (!src) {
      return ["p", {}, ""];
    }

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-video-wrapper": "true",
        style: `width: ${width};`,
      }),
      buildVideoChild(src, width, height, {}),
    ];
  },

  addCommands() {
    return {
      setVideo:
        ({ src, width = "100%", height = "400px" }) =>
        ({ commands }) => {
          if (!src) {
            return false;
          }
          return commands.insertContent({
            type: this.name,
            attrs: { src, width, height },
          });
        },
    };
  },
});
