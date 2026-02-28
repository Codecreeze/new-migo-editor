import React, { useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FiColumns } from 'react-icons/fi';
import { useRichTextEditor } from '../RichTextProvider';


interface BubbleMenuElement extends HTMLDivElement {
  currentColumn?: HTMLElement;
}

export const RichTextColumn: React.FC = () => {
  const editor = useRichTextEditor();

  useEffect(() => {
    setupColumnBubbleMenu();
    return () => {
      // Cleanup on unmount
      const existingMenu = document.querySelector('.column-bubble-menu');
      if (existingMenu) {
        existingMenu.remove();
      }
    };
  }, []);

  const handleInsertTwoColumns = () => {
    const columnId = `column-${Date.now()}`;
    const columnHtml = `
      <div class="column-container" data-column-id="${columnId}" style="
        display: flex; 
        gap: 12px; 
        margin: 16px 0; 
        padding: 12px;
        border: 1px solid #e0e0e0; 
        border-radius: 8px; 
        background: #fafafa;
        position: relative;
      ">
        <div class="column-item" data-column-index="0" style="
          flex: 1; 
          padding: 16px; 
          min-height: 120px; 
          border: 2px solid #ddd; 
          border-radius: 6px; 
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          <p style="margin: 0; color: #666; font-size: 14px;">Click to edit column 1...</p>
        </div>
        <div class="column-item" data-column-index="1" style="
          flex: 1; 
          padding: 16px; 
          min-height: 120px; 
          border: 2px solid #ddd; 
          border-radius: 6px; 
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          <p style="margin: 0; color: #666; font-size: 14px;">Click to edit column 2...</p>
        </div>
      </div>
    `;
    
    editor.chain().focus().insertContent(columnHtml).run();
    
    // Setup click handlers after insertion
    setTimeout(() => {
      setupColumnClickHandlers();
    }, 100);
  };

  const setupColumnClickHandlers = () => {
    const columnItems = document.querySelectorAll('.column-item');
    columnItems.forEach(item => {
      const element = item as HTMLElement;
      element.onclick = (e) => showColumnBubbleMenu(element, e);
    });
  };

  const setupColumnBubbleMenu = () => {
    // Remove existing bubble menu if any
    const existingMenu = document.querySelector('.column-bubble-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Create bubble menu
    const bubbleMenu = document.createElement('div') as BubbleMenuElement;
    bubbleMenu.className = 'column-bubble-menu';
    bubbleMenu.style.cssText = `
      position: fixed;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 4px;
      display: none;
      z-index: 1000;
      gap: 2px;
      flex-direction: row;
    `;

    // Add bubble menu buttons with proper icons
    const buttons = [
      { 
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>', 
        title: 'Add Column Left', 
        action: 'addLeft' 
      },
      { 
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>', 
        title: 'Add Column Right', 
        action: 'addRight' 
      },
      { 
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', 
        title: 'Delete Column', 
        action: 'deleteColumn' 
      },
      { 
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>', 
        title: 'Delete All Columns', 
        action: 'deleteAll' 
      }
    ];

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.innerHTML = btn.icon;
      button.title = btn.title;
      button.style.cssText = `
        border: none;
        background: #f5f5f5;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s ease;
        color: #666;
      `;
      button.onmouseover = () => {
        button.style.background = '#e0e0e0';
        button.style.color = '#333';
      };
      button.onmouseout = () => {
        button.style.background = '#f5f5f5';
        button.style.color = '#666';
      };
      button.onclick = (e) => {
        e.stopPropagation();
        if (bubbleMenu.currentColumn) {
          handleColumnAction(btn.action, bubbleMenu.currentColumn);
        }
        bubbleMenu.style.display = 'none';
      };
      bubbleMenu.appendChild(button);
    });

    document.body.appendChild(bubbleMenu);

    // Hide bubble menu on outside click
    document.addEventListener('click', (e) => {
      if (!bubbleMenu.contains(e.target as Node)) {
        bubbleMenu.style.display = 'none';
        document.querySelectorAll('.column-item').forEach(col => {
          (col as HTMLElement).style.border = '2px solid #ddd';
        });
      }
    });

    return bubbleMenu;
  };

  const showColumnBubbleMenu = (columnElement: HTMLElement, event: Event) => {
    event.stopPropagation();
    
    const bubbleMenu = document.querySelector('.column-bubble-menu') as BubbleMenuElement;
    if (!bubbleMenu) return;

    const rect = columnElement.getBoundingClientRect();
    bubbleMenu.style.display = 'flex';
    bubbleMenu.style.left = `${rect.left + rect.width / 2 - 100}px`;
    bubbleMenu.style.top = `${rect.top - 50}px`;
    bubbleMenu.currentColumn = columnElement;

    // Highlight selected column
    document.querySelectorAll('.column-item').forEach(col => {
      (col as HTMLElement).style.border = '2px solid #ddd';
    });
    columnElement.style.border = '2px solid #1976d2';
  };

  const handleColumnAction = (action: string, columnElement: HTMLElement) => {
    const container = columnElement.closest('.column-container') as HTMLElement;
    const columnIndex = parseInt(columnElement.dataset.columnIndex || '0');

    switch (action) {
      case 'addLeft':
        addColumnAt(container, columnIndex);
        break;
      case 'addRight':
        addColumnAt(container, columnIndex + 1);
        break;
      case 'deleteColumn':
        deleteColumn(container, columnElement);
        break;
      case 'deleteAll':
        deleteAllColumns(container);
        break;
    }
  };

  const addColumnAt = (container: HTMLElement, index: number) => {
    const newColumn = document.createElement('div');
    newColumn.className = 'column-item';
    newColumn.dataset.columnIndex = index.toString();
    newColumn.style.cssText = `
      flex: 1; 
      padding: 16px; 
      min-height: 120px; 
      border: 2px solid #ddd; 
      border-radius: 6px; 
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    newColumn.onclick = (e) => showColumnBubbleMenu(newColumn, e);
    newColumn.innerHTML = `<p style="margin: 0; color: #666; font-size: 14px;">Click to edit new column...</p>`;

    const columns = Array.from(container.querySelectorAll('.column-item'));
    if (index >= columns.length) {
      container.appendChild(newColumn);
    } else {
      container.insertBefore(newColumn, columns[index]);
    }

    // Update column indices
    updateColumnIndices(container);
  };

  const deleteColumn = (container: HTMLElement, columnElement: HTMLElement) => {
    const columns = container.querySelectorAll('.column-item');
    if (columns.length > 1) {
      columnElement.remove();
      updateColumnIndices(container);
    } else {
      deleteAllColumns(container);
    }
  };

  const deleteAllColumns = (container: HTMLElement) => {
    container.remove();
  };

  const updateColumnIndices = (container: HTMLElement) => {
    const columns = container.querySelectorAll('.column-item');
    columns.forEach((col, index) => {
      (col as HTMLElement).dataset.columnIndex = index.toString();
    });
  };

  return (
    <Tooltip title="Insert Columns" arrow>
      <IconButton
        size="small"
        onClick={handleInsertTwoColumns}
      >
        <FiColumns />
      </IconButton>
    </Tooltip>
  );
};

export default RichTextColumn;
