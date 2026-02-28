import React, { useState } from 'react';
import { IconButton, Tooltip, Popover, Box, Typography } from '@mui/material';
import { BiTable } from 'react-icons/bi';
import { useRichTextEditor } from '../RichTextProvider';


export const RichTextTable: React.FC = () => {
  const editor = useRichTextEditor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const handleTableGridClick = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setAnchorEl(null);
    setHoveredCell(null);
  };

  const handleCellHover = (row: number, col: number) => {
    setHoveredCell({ row, col });
  };

  const renderTableGrid = () => {
    const grid = [];
    for (let row = 1; row <= 10; row++) {
      const rowCells = [];
      for (let col = 1; col <= 10; col++) {
        const isHighlighted = hoveredCell && row <= hoveredCell.row && col <= hoveredCell.col;
        rowCells.push(
          <Box
            key={`${row}-${col}`}
            sx={{
              width: 20,
              height: 20,
              border: '1px solid #e0e0e0',
              backgroundColor: isHighlighted ? '#1976d2' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.1s ease',
              '&:hover': {
                backgroundColor: '#1976d2',
              }
            }}
            onMouseEnter={() => handleCellHover(row, col)}
            onClick={() => handleTableGridClick(row, col)}
          />
        );
      }
      grid.push(
        <Box key={row} sx={{ display: 'flex' }}>
          {rowCells}
        </Box>
      );
    }
    return grid;
  };

  return (
    <>
      <Tooltip title="Insert Table" arrow>
        <IconButton
          size="small"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <BiTable />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setHoveredCell(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, textAlign: 'center', color: '#666' }}>
            {hoveredCell ? `${hoveredCell.row} × ${hoveredCell.col} Table` : 'Select table size'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {renderTableGrid()}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default RichTextTable;
