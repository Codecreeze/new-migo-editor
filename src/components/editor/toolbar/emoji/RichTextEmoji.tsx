import React, { useState } from 'react';
import { IconButton, Tooltip, Popover, Box, Typography } from '@mui/material';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRichTextEditor } from '../RichTextProvider';


const EMOJIS = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
  '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
];

export const RichTextEmoji: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleEmojiClick = (emoji: string) => {
    editor.chain().focus().insertContent(emoji).run();
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Emoji" arrow>
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <BsEmojiSmile />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ p: 1, borderBottom: '1px solid #e0e0e0' }}>
            Select Emoji
          </Typography>
          <Box>
            {EMOJIS.map((emoji, index) => (
              <Box
                key={index}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default RichTextEmoji;
