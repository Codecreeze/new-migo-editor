import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useRichTextTheme } from '../RichTextProvider';

export const RichTextThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { themeMode, setThemeMode } = useRichTextTheme();

  const handleToggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const isDark = themeMode === 'dark';

  return (
    <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`} arrow>
      <IconButton
        size="small"
        onClick={handleToggleTheme}
        sx={{
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: `rgba(${theme.palette.primary.main}, 0.1)`,
          },
        }}
      >
        {isDark ? <MdLightMode /> : <MdDarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default RichTextThemeToggle;
