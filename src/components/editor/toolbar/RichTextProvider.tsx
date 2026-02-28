import React, { createContext, useContext, useState } from 'react';
import { Editor } from '@tiptap/react';

type ThemeMode = 'light' | 'dark';

interface RichTextContextType {
  editor: Editor;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const RichTextContext = createContext<RichTextContextType | null>(null);

export const useRichTextEditor = () => {
  const context = useContext(RichTextContext);
  if (!context) {
    throw new Error('useRichTextEditor must be used within a RichTextProvider');
  }
  return context.editor;
};

export const useRichTextTheme = () => {
  const context = useContext(RichTextContext);
  if (!context) {
    throw new Error('useRichTextTheme must be used within a RichTextProvider');
  }
  return { themeMode: context.themeMode, setThemeMode: context.setThemeMode };
};

interface RichTextProviderProps {
  editor: Editor;
  children: React.ReactNode;
}

export const RichTextProvider: React.FC<RichTextProviderProps> = ({ editor, children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <RichTextContext.Provider value={{ editor, themeMode, setThemeMode }}>
      {children}
    </RichTextContext.Provider>
  );
};

export default RichTextProvider;
