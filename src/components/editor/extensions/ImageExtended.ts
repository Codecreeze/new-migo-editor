// src/components/editor/extensions/ImageExtended.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageNodeView from './ImageNodeView.tsx'

export interface ImageExtendedOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageExtended: {
      setImageExtended: (options: { src: string; alt?: string }) => ReturnType
    }
  }
}

export default Node.create<ImageExtendedOptions>({
  name: 'imageExtended',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: {},
      alt: { default: '' },

      // size
      width: { default: "720px" },
      height: { default: "480px" },

      // alignment
      align: { 
        default: 'center',
        parseHTML: (el) => el.getAttribute('data-align'),
        renderHTML: (attr) => (attr.align ? { 'data-align': attr.align } : {}),
      },

      // transform
      rotate: { default: 0 },
      flipH: { default: false },
      flipV: { default: false },

      class: { default: '' },
      ...this.parent?.(),
    }
  },

  parseHTML() {
    return [
      { 
        tag: 'figure',
        getAttrs: (element) => {
          const img = element.querySelector('img')
          
          if (!img) return false
          
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt') || '',
            width: img.getAttribute('width'),
            height: img.getAttribute('height'),
            align: img.getAttribute('data-align') || 'center',
            rotate: Number(img.getAttribute('data-rotate') || 0),
            flipH: img.hasAttribute('data-flip-h'),
            flipV: img.hasAttribute('data-flip-v'),
          }
        }
      },
      { 
        tag: 'img',
        getAttrs: (element) => ({
          src: element.getAttribute('src'),
          alt: element.getAttribute('alt') || '',
          width: element.getAttribute('width'),
          height: element.getAttribute('height'),
          align: element.getAttribute('data-align') || 'center',
          rotate: Number(element.getAttribute('data-rotate') || 0),
          flipH: element.hasAttribute('data-flip-h'),
          flipV: element.hasAttribute('data-flip-v'),
        })
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const imgAttrs = {
      src: HTMLAttributes.src,
      alt: HTMLAttributes.alt,
      width: HTMLAttributes.width,
      height: HTMLAttributes.height,
      'data-align': HTMLAttributes.align,
      'data-rotate': HTMLAttributes.rotate,
      'data-flip-h': HTMLAttributes.flipH ? '' : undefined,
      'data-flip-v': HTMLAttributes.flipV ? '' : undefined,
    }

    return [
      'figure', 
      mergeAttributes(this.options.HTMLAttributes, { class: 'image-figure' }),
      ['img', mergeAttributes(imgAttrs)]
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },

  addCommands() {
    return {
      setImageExtended:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs,
          }),
    }
  },
})
