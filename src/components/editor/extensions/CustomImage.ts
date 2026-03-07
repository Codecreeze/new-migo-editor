// extensions/CustomImage.ts
import Image from "@tiptap/extension-image";
import { mergeAttributes } from "@tiptap/core";

const toCssValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return null;
  return typeof value === "number" ? `${value}px` : value;
};

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: { default: null, renderedAs: "style" },
      height: { default: null, renderedAs: "style" },
      align: {
        default: "center",
        parseHTML: (el) => el.getAttribute("data-align"),
        renderHTML: (attr) => (attr.align ? { "data-align": attr.align } : {}),
      },
      rotation: {
        default: 0,
        parseHTML: (el) => Number(el.getAttribute("data-rotation") ?? 0),
        renderHTML: (attr) => ({ "data-rotation": attr.rotation }),
      },
      flipH: {
        default: false,
        parseHTML: (el) => !!el.getAttribute("data-flip-h"),
        renderHTML: (attr) => (attr.flipH ? { "data-flip-h": "" } : {}),
      },
      flipV: {
        default: false,
        parseHTML: (el) => !!el.getAttribute("data-flip-v"),
        renderHTML: (attr) => (attr.flipV ? { "data-flip-v": "" } : {}),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const styleParts: string[] = [];

    const width = toCssValue(HTMLAttributes.width);
    const height = toCssValue(HTMLAttributes.height);
    if (width) {
      styleParts.push(`width: ${width};`);
    }
    if (height) {
      styleParts.push(`height: ${height};`);
    } else {
      styleParts.push("height: auto;");
    }
    styleParts.push("max-width: 100%;");
    styleParts.push("display: block;");

    // Rotation + flip
    const transforms: string[] = [];
    if (HTMLAttributes.rotation)
      transforms.push(`rotate(${HTMLAttributes.rotation}deg)`);
    if (HTMLAttributes.flipH) transforms.push("scaleX(-1)");
    if (HTMLAttributes.flipV) transforms.push("scaleY(-1)");
    if (transforms.length) styleParts.push(`transform: ${transforms.join(" ")};`);

    // Alignment (block-level)
    if (HTMLAttributes.align === "left") styleParts.push("margin: 0 auto 0 0;");
    if (HTMLAttributes.align === "right") styleParts.push("margin: 0 0 0 auto;");
    if (!HTMLAttributes.align || HTMLAttributes.align === "center") {
      styleParts.push("margin: 0 auto;");
    }

    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: styleParts.join(" "),
        draggable: "true",
        "data-width": HTMLAttributes.width,
        "data-height": HTMLAttributes.height,
        "data-align": HTMLAttributes.align,
        "data-rotation": HTMLAttributes.rotation,
        "data-flip-h": HTMLAttributes.flipH,
        "data-flip-v": HTMLAttributes.flipV,
      }),
    ];
  },
});

export default CustomImage;
