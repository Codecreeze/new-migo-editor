import { useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import CreateIcon from '@mui/icons-material/Create';
import { EditorDialog } from '../SubComponents/EditorDialog';

export const EditorPage = () => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'blank',
      title: 'Blank Document',
      description: 'Start with a clean slate',
      icon: <DescriptionIcon sx={{ fontSize: 48 }} />,
      content: '',
    },
    {
      id: 'meeting',
      title: 'Meeting Notes',
      description: 'Document your meeting discussions',
      icon: <CreateIcon sx={{ fontSize: 48 }} />,
      content: `
        <h1>Meeting Notes</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Attendees:</strong></p>
        <ul>
          <li>Person 1</li>
          <li>Person 2</li>
        </ul>
        <h2>Agenda</h2>
        <ol>
          <li>Topic 1</li>
          <li>Topic 2</li>
        </ol>
        <h2>Discussion Points</h2>
        <p>Add your notes here...</p>
        <h2>Action Items</h2>
        <ul>
          <li>Action item 1</li>
        </ul>
      `,
    },
    {
      id: 'article',
      title: 'Article/Blog',
      description: 'Write your next article',
      icon: <EditIcon sx={{ fontSize: 48 }} />,
      content: `
        <h1>Article Title</h1>
        <p><em>By Your Name | ${new Date().toLocaleDateString()}</em></p>
        <hr />
        <h2>Introduction</h2>
        <p>Start your article here...</p>
        <h2>Section 1</h2>
        <p>Content goes here...</p>
        <h2>Section 2</h2>
        <p>Content goes here...</p>
        <h2>Conclusion</h2>
        <p>Wrap up your article...</p>
      `,
    },
  ];

  const handleOpenEditor = (content: string = '') => {
    setSelectedTemplate(content);
    setEditorOpen(true);
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Rich Text Editor
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Create and edit documents with a powerful rich text editor
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Choose a Template
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {templates.map((template) => (
            <Card
              key={template.id}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleOpenEditor(template.content)}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: 4,
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  {template.icon}
                </Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{ mt: 3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEditor(template.content);
                  }}
                >
                  Open Editor
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Or
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<CreateIcon />}
            onClick={() => handleOpenEditor()}
          >
            Create Custom Document
          </Button>
        </Box>
      </Box>

      <EditorDialog
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        initialContent={selectedTemplate}
      />
    </Box>
  );
};

export default EditorPage;
