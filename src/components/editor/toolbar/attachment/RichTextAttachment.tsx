import React, { useRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useRichTextEditor } from '../RichTextProvider';
import { IoDocumentAttachOutline } from "react-icons/io5";

export const RichTextAttachment: React.FC = () => {
  const editor = useRichTextEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'ppt':
      case 'pptx': return '📈';
      case 'zip':
      case 'rar': return '🗜️';
      case 'mp3':
      case 'wav': return '🎵';
      case 'mp4':
      case 'avi': return '🎬';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      default: return '📎';
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a file URL for preview
      const fileUrl = URL.createObjectURL(file);
      const fileName = file.name;
      const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
      const fileIcon = getFileIcon(fileName);
      
      // Insert file as a styled attachment with border and radius
      const fileHtml = `
        <div style="
          display: inline-block; 
          margin: 8px 4px; 
          padding: 8px 12px; 
          border: 2px solid #1976d2; 
          border-radius: 10px; 
          background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
          box-shadow: 0 2px 4px rgba(25, 118, 210, 0.1);
          transition: all 0.2s ease;
        ">
          <a href="${fileUrl}" download="${fileName}" style="
            text-decoration: none; 
            color: #1976d2; 
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
          ">
            <span style="font-size: 16px;">${fileIcon}</span>
            <span>${fileName}</span>
            <span style="color: #666; font-size: 12px; margin-left: 4px;">(${fileSize} MB)</span>
          </a>
        </div>
      `;
      editor.chain().focus().insertContent(fileHtml).run();
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Tooltip title="Attach File" arrow>
        <IconButton
          size="small"
          onClick={handleClick}
        >
          <IoDocumentAttachOutline />
        </IconButton>
      </Tooltip>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        accept="*/*"
      />
    </>
  );
};

export default RichTextAttachment;
