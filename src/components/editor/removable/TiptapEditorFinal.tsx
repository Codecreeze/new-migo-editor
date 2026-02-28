import { useEffect, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image } from '@tiptap/extension-image';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { FontFamily } from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Extension } from '@tiptap/core';
import { Callout } from '../extensions/CalloutNode';
import {
  Box,
  IconButton,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography as MuiTypography,
  Chip,
  Select,
  FormControl,
  Popover,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
// React Icons - Premium feel
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdCheckBox,
  MdUndo,
  MdRedo,
  MdCode,
  MdFormatQuote,
  MdHorizontalRule,
  MdTableChart,
  MdImage,
  MdPictureAsPdf,
  MdSave,
  MdArrowDropDown,
  MdColorLens,
  MdHighlight,
  MdSearch,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdLink,
  MdLinkOff,
  MdOpenInNew,
  MdEdit,
  MdVideoLibrary,
  MdInfo,
  MdWarning,
  MdError,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';
import { BsEmojiSmile, BsMarkdown } from 'react-icons/bs';
import jsPDF from 'jspdf';
import TurndownService from 'turndown';
import styles from './TiptapEditor.module.scss';

interface TiptapEditorFinalProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Comic Sans MS', label: 'Comic Sans' },
  { value: 'Verdana', label: 'Verdana' },
];

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'];

const LINE_HEIGHTS = ['1.0', '1.15', '1.5', '1.75', '2.0', '2.5', '3.0'];

const TEXT_COLORS = [
  '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff',
  '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff',
  '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff',
  '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2',
  '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466',
];

const HIGHLIGHT_COLORS = [
  '#fef08a', '#fde047', '#facc15', '#fbbf24', '#f59e0b', '#fb923c',
  '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
  '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6',
  '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af',
  '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534',
];

const EMOJIS = [
  '😀', '😂', '😍', '🤔', '😎', '😢', '😡', '🥳',
  '❤️', '👍', '👎', '🙏', '💪', '✌️', '🤝', '👏',
  '🎉', '🎊', '🎈', '🎁', '🏆', '⭐', '✨', '🔥',
  '💡', '📝', '📌', '📎', '✅', '❌', '⚠️', '💬',
];

// Custom Font Size Extension using TextStyle
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize?.replace(/['"]+/g, ''),
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
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

// Custom Line Height Extension
const LineHeight = Extension.create({
  name: 'lineHeight',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      defaultLineHeight: '1.5',
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element: HTMLElement) => element.style.lineHeight || this.options.defaultLineHeight,
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
      setLineHeight: (lineHeight: string) => ({ commands }: any) => {
        return this.options.types.every((type: string) =>
          commands.updateAttributes(type, { lineHeight })
        );
      },
      unsetLineHeight: () => ({ commands }: any) => {
        return this.options.types.every((type: string) =>
          commands.resetAttributes(type, 'lineHeight')
        );
      },
    };
  },
});

export const TiptapEditorFinal: React.FC<TiptapEditorFinalProps> = ({
  content = '',
  onChange,
  placeholder = 'Start writing...',
}) => {
  // Dropdown anchors
  const [fontTypeAnchor, setFontTypeAnchor] = useState<null | HTMLElement>(null);
  const [moreStylesAnchor, setMoreStylesAnchor] = useState<null | HTMLElement>(null);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);

  // Popover anchors
  const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
  const [emojiAnchor, setEmojiAnchor] = useState<null | HTMLElement>(null);
  const [colorAnchor, setColorAnchor] = useState<null | HTMLElement>(null);
  const [highlightAnchor, setHighlightAnchor] = useState<null | HTMLElement>(null);
  const [linkAnchor, setLinkAnchor] = useState<null | HTMLElement>(null);
  const [tableAnchor, setTableAnchor] = useState<null | HTMLElement>(null);

  // Dialog states
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [calloutDialogOpen, setCalloutDialogOpen] = useState(false);

  // Search & Replace states
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  // Link popover states
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  // Table grid selector state
  const [tableHoverRows, setTableHoverRows] = useState(1);
  const [tableHoverCols, setTableHoverCols] = useState(1);

  // Image dialog states
  const [imageTab, setImageTab] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageInline, setImageInline] = useState(false);

  // Video dialog states
  const [videoTab, setVideoTab] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  // Callout dialog states
  const [calloutType, setCalloutType] = useState('info');
  const [calloutTitle, setCalloutTitle] = useState('');
  const [calloutBody, setCalloutBody] = useState('');

  // Stats
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Font/Line height selections
  const [selectedFontFamily, setSelectedFontFamily] = useState('Inter');
  const [selectedFontSize, setSelectedFontSize] = useState('16px');
  const [selectedLineHeight, setSelectedLineHeight] = useState('1.5');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'custom-link',
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextStyle,
      Color,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
      LineHeight.configure({
        types: ['paragraph', 'heading'],
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
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      Youtube.configure({
        width: 640,
        height: 480,
      }),
      Callout,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
      updateWordCount(editor.getText());
    },
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  const updateWordCount = useCallback((text: string) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  }, []);

  // Autosave
  useEffect(() => {
    if (!editor) return;
    const interval = setInterval(() => {
      const html = editor.getHTML();
      if (html && html !== '<p></p>') {
        localStorage.setItem('editor-autosave', html);
        localStorage.setItem('editor-autosave-time', new Date().toISOString());
        setLastSaved(new Date());
      }
    }, 30000);

    const savedContent = localStorage.getItem('editor-autosave');
    const savedTime = localStorage.getItem('editor-autosave-time');
    if (savedContent && !content) {
      editor.commands.setContent(savedContent);
      if (savedTime) setLastSaved(new Date(savedTime));
    }

    return () => clearInterval(interval);
  }, [editor, content]);

  useEffect(() => {
    if (editor) updateWordCount(editor.getText());
  }, [editor, updateWordCount]);

  if (!editor) return null;

  const handleCloseAll = () => {
    setFontTypeAnchor(null);
    setMoreStylesAnchor(null);
    setExportAnchor(null);
    setSearchAnchor(null);
    setEmojiAnchor(null);
    setColorAnchor(null);
    setHighlightAnchor(null);
    setLinkAnchor(null);
    setTableAnchor(null);
  };

  // Search & Replace handlers
  const handleSearch = () => {
    if (!searchTerm) return;
    const text = editor.getText();
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(searchTerm, flags);
    const matches = text.match(regex);
    if (matches) {
      alert(`Found ${matches.length} match(es)`);
    } else {
      alert('No matches found');
    }
  };

  const handleReplace = () => {
    if (!searchTerm) return;
    const html = editor.getHTML();
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(searchTerm, flags);
    const newHtml = html.replace(regex, replaceTerm);
    editor.commands.setContent(newHtml);
    handleCloseAll();
  };

  const handleReplaceAll = () => {
    handleReplace();
  };

  // Link handlers
  const handleSetLink = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      }
    }
    handleCloseAll();
    setLinkText('');
    setLinkUrl('');
  };

  // Table handlers with grid selector
  const handleTableGridClick = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    handleCloseAll();
  };

  // Image handlers with file upload
  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    }
    setImageDialogOpen(false);
    setImageUrl('');
    setImageAlt('');
  };

  // Video handlers
  const handleInsertVideo = () => {
    if (videoUrl) {
      editor.chain().focus().setYoutubeVideo({ src: videoUrl }).run();
    }
    setVideoDialogOpen(false);
    setVideoUrl('');
  };

  // Callout handlers
  const handleInsertCallout = () => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'callout',
        attrs: {
          type: calloutType,
          title: calloutTitle || calloutType.charAt(0).toUpperCase() + calloutType.slice(1),
        },
        content: [
          {
            type: 'paragraph',
            content: calloutBody ? [{ type: 'text', text: calloutBody }] : [],
          },
        ],
      })
      .run();

    setCalloutDialogOpen(false);
    setCalloutTitle('');
    setCalloutBody('');
  };

  // Export handlers
  const handleExportPDF = async () => {
    handleCloseAll();
    const pdf = new jsPDF();
    const text = editor.getText();
    const lines = pdf.splitTextToSize(text, 180);
    let y = 20;
    lines.forEach((line: string) => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, 10, y);
      y += 7;
    });
    pdf.save('document.pdf');
  };

  const handleExportMarkdown = () => {
    handleCloseAll();
    const html = editor.getHTML();
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });
    const markdown = turndownService.turndown(html);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Link Bubble Menu handlers
  const handleVisitLink = () => {
    const { href } = editor.getAttributes('link');
    if (href) window.open(href, '_blank');
  };

  const handleEditLink = () => {
    const { href } = editor.getAttributes('link');
    setLinkUrl(href || '');
    setLinkText('');
    setLinkAnchor(document.activeElement as HTMLElement);
  };

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <Box className={styles.tiptapContainer}>
      {/* Toolbar */}
      <Box className={styles.toolbar}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', width: '100%' }}>
          {/* Standalone Buttons - Basic Formatting */}
          <Tooltip title="Bold (Ctrl+B)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? styles.isActive : ''}
            >
              <MdFormatBold />
            </IconButton>
          </Tooltip>

          <Tooltip title="Italic (Ctrl+I)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? styles.isActive : ''}
            >
              <MdFormatItalic />
            </IconButton>
          </Tooltip>

          <Tooltip title="Underline (Ctrl+U)">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? styles.isActive : ''}
            >
              <MdFormatUnderlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Strikethrough">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? styles.isActive : ''}
            >
              <MdStrikethroughS />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Font Family Dropdown */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={selectedFontFamily}
              onChange={(e) => {
                setSelectedFontFamily(e.target.value);
                editor.chain().focus().setFontFamily(e.target.value).run();
              }}
              displayEmpty
            >
              {FONT_FAMILIES.map((font) => (
                <MenuItem key={font.value} value={font.value}>
                  {font.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Font Size Dropdown */}
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={selectedFontSize}
              onChange={(e) => {
                setSelectedFontSize(e.target.value);
                editor.chain().focus().setFontSize(e.target.value).run();
              }}
              displayEmpty
            >
              {FONT_SIZES.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Font Type Dropdown */}
          <Tooltip title="Font Type">
            <Button
              size="small"
              onClick={(e) => setFontTypeAnchor(e.currentTarget)}
              endIcon={<MdArrowDropDown />}
            >
              Type
            </Button>
          </Tooltip>
          <Menu anchorEl={fontTypeAnchor} open={Boolean(fontTypeAnchor)} onClose={handleCloseAll}>
            <MenuItem
              onClick={() => { editor.chain().focus().setParagraph().run(); handleCloseAll(); }}
              selected={editor.isActive('paragraph')}
            >
              Normal
            </MenuItem>
            <MenuItem
              onClick={() => { editor.chain().focus().setParagraph().run(); handleCloseAll(); }}
              selected={editor.isActive('paragraph')}
            >
              Paragraph
            </MenuItem>
            <Divider />
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <MenuItem
                key={level}
                onClick={() => { editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run(); handleCloseAll(); }}
                selected={editor.isActive('heading', { level })}
              >
                Heading {level}
              </MenuItem>
            ))}
          </Menu>

          {/* More Text Styles Dropdown */}
          <Tooltip title="More Text Styles">
            <Button
              size="small"
              onClick={(e) => setMoreStylesAnchor(e.currentTarget)}
              endIcon={<MdArrowDropDown />}
            >
              Styles
            </Button>
          </Tooltip>
          <Menu anchorEl={moreStylesAnchor} open={Boolean(moreStylesAnchor)} onClose={handleCloseAll}>
            <MenuItem
              onClick={() => { editor.chain().focus().toggleSubscript().run(); handleCloseAll(); }}
              selected={editor.isActive('subscript')}
            >
              Subscript
            </MenuItem>
            <MenuItem
              onClick={() => { editor.chain().focus().toggleSuperscript().run(); handleCloseAll(); }}
              selected={editor.isActive('superscript')}
            >
              Superscript
            </MenuItem>
          </Menu>

          {/* Line Height Dropdown */}
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={selectedLineHeight}
              onChange={(e) => {
                setSelectedLineHeight(e.target.value);
                editor.chain().focus().setLineHeight(e.target.value).run();
              }}
              displayEmpty
              renderValue={(value) => `LH: ${value}`}
            >
              {LINE_HEIGHTS.map((height) => (
                <MenuItem key={height} value={height}>
                  {height}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Lists - Standalone Buttons */}
          <Tooltip title="Bullet List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? styles.isActive : ''}
            >
              <MdFormatListBulleted />
            </IconButton>
          </Tooltip>

          <Tooltip title="Numbered List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? styles.isActive : ''}
            >
              <MdFormatListNumbered />
            </IconButton>
          </Tooltip>

          <Tooltip title="Task List">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={editor.isActive('taskList') ? styles.isActive : ''}
            >
              <MdCheckBox />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Alignment - 4 Standalone Buttons */}
          <Tooltip title="Align Left">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={editor.isActive({ textAlign: 'left' }) ? styles.isActive : ''}
            >
              <MdFormatAlignLeft />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Center">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={editor.isActive({ textAlign: 'center' }) ? styles.isActive : ''}
            >
              <MdFormatAlignCenter />
            </IconButton>
          </Tooltip>

          <Tooltip title="Align Right">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={editor.isActive({ textAlign: 'right' }) ? styles.isActive : ''}
            >
              <MdFormatAlignRight />
            </IconButton>
          </Tooltip>

          <Tooltip title="Justify">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={editor.isActive({ textAlign: 'justify' }) ? styles.isActive : ''}
            >
              <MdFormatAlignJustify />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Popovers - Single Icons */}
          <Tooltip title="Search & Replace">
            <IconButton size="small" onClick={(e) => setSearchAnchor(e.currentTarget)}>
              <MdSearch />
            </IconButton>
          </Tooltip>

          <Tooltip title="Font Color">
            <IconButton size="small" onClick={(e) => setColorAnchor(e.currentTarget)}>
              <MdColorLens />
            </IconButton>
          </Tooltip>

          <Tooltip title="Highlight">
            <IconButton size="small" onClick={(e) => setHighlightAnchor(e.currentTarget)}>
              <MdHighlight />
            </IconButton>
          </Tooltip>

          <Tooltip title="Link">
            <IconButton size="small" onClick={(e) => setLinkAnchor(e.currentTarget)}>
              <MdLink />
            </IconButton>
          </Tooltip>

          <Tooltip title="Table">
            <IconButton size="small" onClick={(e) => setTableAnchor(e.currentTarget)}>
              <MdTableChart />
            </IconButton>
          </Tooltip>

          <Tooltip title="Emoji">
            <IconButton size="small" onClick={(e) => setEmojiAnchor(e.currentTarget)}>
              <BsEmojiSmile />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* More Standalone Buttons */}
          <Tooltip title="Code Block">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? styles.isActive : ''}
            >
              <MdCode />
            </IconButton>
          </Tooltip>

          <Tooltip title="Blockquote">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? styles.isActive : ''}
            >
              <MdFormatQuote />
            </IconButton>
          </Tooltip>

          <Tooltip title="Horizontal Rule">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <MdHorizontalRule />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Dialog Buttons */}
          <Tooltip title="Insert Image">
            <IconButton size="small" onClick={() => setImageDialogOpen(true)}>
              <MdImage />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Video">
            <IconButton size="small" onClick={() => setVideoDialogOpen(true)}>
              <MdVideoLibrary />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert Callout">
            <IconButton size="small" onClick={() => setCalloutDialogOpen(true)}>
              <MdInfo />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* History */}
          <Tooltip title="Undo">
            <IconButton size="small" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
              <MdUndo />
            </IconButton>
          </Tooltip>

          <Tooltip title="Redo">
            <IconButton size="small" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
              <MdRedo />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Export Dropdown */}
          <Tooltip title="Export">
            <Button
              size="small"
              onClick={(e) => setExportAnchor(e.currentTarget)}
              endIcon={<MdArrowDropDown />}
              startIcon={<MdSave />}
            >
              Export
            </Button>
          </Tooltip>
          <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={handleCloseAll}>
            <MenuItem onClick={handleExportPDF}>
              <MdPictureAsPdf style={{ marginRight: 8 }} /> Export as PDF
            </MenuItem>
            <MenuItem onClick={handleExportMarkdown}>
              <BsMarkdown style={{ marginRight: 8 }} /> Export as Markdown
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          fontSize: '0.875rem',
          color: '#666',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2 }}>
          <MuiTypography variant="caption">
            <strong>{wordCount}</strong> words
          </MuiTypography>
          <MuiTypography variant="caption">
            <strong>{charCount}</strong> characters
          </MuiTypography>
        </Box>
        {lastSaved && (
          <Chip
            label={`Autosaved ${lastSaved.toLocaleTimeString()}`}
            size="small"
            color="success"
            variant="outlined"
          />
        )}
      </Box>

      {/* Editor Content */}
      <Box className={styles.editorContent}>
        <EditorContent editor={editor} />

        {/* Link Bubble Menu */}
        {editor && editor.isActive('link') && (
          <BubbleMenu editor={editor}>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                gap: 0.5,
                p: 0.5,
                backgroundColor: '#1e1e1e',
                borderRadius: 1,
              }}
            >
              <Tooltip title="Visit Link">
                <IconButton size="small" onClick={handleVisitLink} sx={{ color: '#fff' }}>
                  <MdOpenInNew fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Link">
                <IconButton size="small" onClick={handleEditLink} sx={{ color: '#fff' }}>
                  <MdEdit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove Link">
                <IconButton size="small" onClick={handleRemoveLink} sx={{ color: '#fff' }}>
                  <MdLinkOff fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>
          </BubbleMenu>
        )}
      </Box>

      {/* Popovers */}
      {/* Search & Replace Popover */}
      <Popover
        open={Boolean(searchAnchor)}
        anchorEl={searchAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, width: 320 }}>
          <MuiTypography variant="subtitle2" fontWeight="600" mb={1}>
            Search & Replace
          </MuiTypography>
          <TextField
            fullWidth
            size="small"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Replace with"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Checkbox checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />}
            label="Case sensitive"
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleSearch}>
              Find
            </Button>
            <Button variant="outlined" size="small" onClick={handleReplace}>
              Replace
            </Button>
            <Button variant="contained" size="small" onClick={handleReplaceAll}>
              Replace All
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Emoji Popover */}
      <Popover
        open={Boolean(emojiAnchor)}
        anchorEl={emojiAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 0.5, maxWidth: 320 }}>
          {EMOJIS.map((emoji) => (
            <Button
              key={emoji}
              onClick={() => {
                editor.chain().focus().insertContent(emoji).run();
                handleCloseAll();
              }}
              sx={{ minWidth: 36, fontSize: '1.25rem' }}
            >
              {emoji}
            </Button>
          ))}
        </Box>
      </Popover>

      {/* Font Color Popover */}
      <Popover
        open={Boolean(colorAnchor)}
        anchorEl={colorAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          <MuiTypography variant="caption" fontWeight="600" display="block" mb={1}>
            Text Color
          </MuiTypography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
            {TEXT_COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  handleCloseAll();
                }}
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: color,
                  border: '2px solid #ddd',
                  cursor: 'pointer',
                  borderRadius: 1,
                  '&:hover': { transform: 'scale(1.1)', borderColor: '#1976d2' },
                }}
              />
            ))}
          </Box>
        </Box>
      </Popover>

      {/* Highlight Popover */}
      <Popover
        open={Boolean(highlightAnchor)}
        anchorEl={highlightAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          <MuiTypography variant="caption" fontWeight="600" display="block" mb={1}>
            Highlight Color
          </MuiTypography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 0.5 }}>
            {HIGHLIGHT_COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => {
                  editor.chain().focus().toggleHighlight({ color }).run();
                  handleCloseAll();
                }}
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: color,
                  border: '2px solid #ddd',
                  cursor: 'pointer',
                  borderRadius: 1,
                  '&:hover': { transform: 'scale(1.1)', borderColor: '#1976d2' },
                }}
              />
            ))}
          </Box>
        </Box>
      </Popover>

      {/* Link Popover */}
      <Popover
        open={Boolean(linkAnchor)}
        anchorEl={linkAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, width: 320 }}>
          <MuiTypography variant="subtitle2" fontWeight="600" mb={1}>
            Insert Link
          </MuiTypography>
          <TextField
            fullWidth
            size="small"
            label="Text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            sx={{ mb: 1 }}
            placeholder="Link text (optional)"
          />
          <TextField
            fullWidth
            size="small"
            label="URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="https://example.com"
          />
          <Button variant="contained" fullWidth onClick={handleSetLink}>
            Insert Link
          </Button>
        </Box>
      </Popover>

      {/* Table Grid Selector Popover */}
      <Popover
        open={Boolean(tableAnchor)}
        anchorEl={tableAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2 }}>
          <MuiTypography variant="subtitle2" fontWeight="600" mb={1} textAlign="center">
            {tableHoverRows} × {tableHoverCols}
          </MuiTypography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 24px)',
              gap: '2px',
            }}
          >
            {Array.from({ length: 100 }, (_, index) => {
              const row = Math.floor(index / 10) + 1;
              const col = (index % 10) + 1;
              const isHighlighted = row <= tableHoverRows && col <= tableHoverCols;

              return (
                <Box
                  key={index}
                  onMouseEnter={() => {
                    setTableHoverRows(row);
                    setTableHoverCols(col);
                  }}
                  onClick={() => handleTableGridClick(row, col)}
                  sx={{
                    width: 24,
                    height: 24,
                    border: '1px solid #ccc',
                    backgroundColor: isHighlighted ? '#1976d2' : '#fff',
                    cursor: 'pointer',
                    transition: 'background-color 0.1s',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Popover>

      {/* Dialogs */}
      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Insert Image
            <IconButton onClick={() => setImageDialogOpen(false)} size="small">
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs value={imageTab} onChange={(_, v) => setImageTab(v)} sx={{ mb: 2 }}>
            <Tab label="Upload" />
            <Tab label="URL" />
          </Tabs>
          {imageTab === 0 && (
            <Box>
              <Button variant="outlined" component="label" fullWidth sx={{ mb: 2, py: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <MdImage size={32} style={{ marginBottom: 8 }} />
                  <MuiTypography>Choose Image File</MuiTypography>
                </Box>
                <input type="file" hidden accept="image/*" onChange={handleImageFileChange} />
              </Button>
              {imageUrl && (
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
                </Box>
              )}
            </Box>
          )}
          {imageTab === 1 && (
            <TextField
              fullWidth
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            fullWidth
            label="Alt Text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Image description"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            control={<Checkbox checked={imageInline} onChange={(e) => setImageInline(e.target.checked)} />}
            label="Inline image"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertImage} variant="contained" disabled={!imageUrl}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoDialogOpen} onClose={() => setVideoDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Insert Video
            <IconButton onClick={() => setVideoDialogOpen(false)} size="small">
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs value={videoTab} onChange={(_, v) => setVideoTab(v)} sx={{ mb: 2 }}>
            <Tab label="Upload" />
            <Tab label="Link" />
          </Tabs>
          {videoTab === 0 && (
            <Box>
              <Button variant="outlined" component="label" fullWidth sx={{ mb: 2, py: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <MdVideoLibrary size={32} style={{ marginBottom: 8 }} />
                  <MuiTypography>Choose Video File</MuiTypography>
                  <MuiTypography variant="caption" color="text.secondary" display="block" mt={1}>
                    Video upload requires backend integration
                  </MuiTypography>
                </Box>
                <input type="file" hidden accept="video/*" />
              </Button>
            </Box>
          )}
          {videoTab === 1 && (
            <TextField
              fullWidth
              label="YouTube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              helperText="Currently supports YouTube videos only"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertVideo} variant="contained" disabled={!videoUrl}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>

      {/* Callout Dialog */}
      <Dialog open={calloutDialogOpen} onClose={() => setCalloutDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Insert Callout
            <IconButton onClick={() => setCalloutDialogOpen(false)} size="small">
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <Select
              value={calloutType}
              onChange={(e) => setCalloutType(e.target.value)}
              displayEmpty
              renderValue={(value) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {value === 'info' && <MdInfo />}
                  {value === 'warning' && <MdWarning />}
                  {value === 'error' && <MdError />}
                  {value === 'success' && <MdCheckCircle />}
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Box>
              )}
            >
              <MenuItem value="info">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MdInfo /> Info
                </Box>
              </MenuItem>
              <MenuItem value="warning">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MdWarning /> Warning
                </Box>
              </MenuItem>
              <MenuItem value="error">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MdError /> Error
                </Box>
              </MenuItem>
              <MenuItem value="success">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MdCheckCircle /> Success
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Title (optional)"
            value={calloutTitle}
            onChange={(e) => setCalloutTitle(e.target.value)}
            sx={{ mb: 2 }}
            placeholder={calloutType.charAt(0).toUpperCase() + calloutType.slice(1)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Body Content"
            value={calloutBody}
            onChange={(e) => setCalloutBody(e.target.value)}
            placeholder="Enter callout content..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCalloutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInsertCallout} variant="contained">
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TiptapEditorFinal;
