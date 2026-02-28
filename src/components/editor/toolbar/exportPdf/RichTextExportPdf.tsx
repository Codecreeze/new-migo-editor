import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { TbFileTypePdf } from "react-icons/tb";
import { useRichTextEditor } from "../RichTextProvider";
import jsPDF from "jspdf";

export const RichTextExportPdf: React.FC = () => {
  const editor = useRichTextEditor();

  const handleExportPDF = async () => {
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
    pdf.save("document.pdf");
  };

  return (
    <Tooltip title="Export PDF" arrow>
      <IconButton size="small" onClick={handleExportPDF}>
        <TbFileTypePdf />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextExportPdf;
