import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { TbFileTypePdf } from 'react-icons/tb';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextExportPdf: React.FC = () => {
  const editor = useRichTextEditor();

  const handleExportPdf = () => {
    const content = editor.getHTML();
    
    // Create a new window with the content for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Export PDF</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, h3, h4, h5, h6 { margin: 16px 0 8px 0; }
            p { margin: 8px 0; line-height: 1.6; }
            ul, ol { margin: 8px 0; padding-left: 24px; }
            blockquote { border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; }
            code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
            pre { background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; }
            table { border-collapse: collapse; width: 100%; margin: 16px 0; }
            td, th { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Tooltip title="Export PDF" arrow>
      <IconButton
        size="small"
        onClick={handleExportPdf}
      >
        <TbFileTypePdf />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextExportPdf;
