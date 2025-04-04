import * as React from 'react';
import { Paper, Box, Typography, Link, Button, IconButton } from '@mui/material';
import UploadButton from '../UploadButton.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function ProjectOpener() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = React.useState(localStorage.getItem('uploadedFile') || null);
  const [fileName, setFileName] = React.useState(uploadedFile ? uploadedFile : 'Import Project');
  const [showContinue, setShowContinue] = React.useState(!!uploadedFile);
  const [showDelete, setShowDelete] = React.useState(!!uploadedFile);

  const handleFileSelect = (file) => {
    const name = file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name;
    setFileName(name);
    setUploadedFile(file);
    setShowContinue(true);
    setShowDelete(true);
    localStorage.setItem('uploadedFile', file.name); // Save file name to localStorage
  };

  const handleDelete = () => {
    setFileName('Import Project');
    setUploadedFile(null);
    setShowContinue(false);
    setShowDelete(false);
    localStorage.removeItem('uploadedFile'); // Remove file from localStorage
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img
        src='./assets/logo.png'
        alt="Logo"
        style={{ maxWidth: '15vw' }}
      />

      <Paper
        elevation={0.5}
        square={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          textAlign: 'center',
          gap: '12px'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'NeueMachina-Ultrabold',
            fontSize: '1.5vw',
            padding: '10px',
          }}
        >
          Import your Project
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'NeueMachina-Regular',
            fontSize: '1.2vw',
            padding: '10px',
          }}
        >
          Generate a new Mod from{' '}
          <Link
            href="https://fabricmc.net/develop/template/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold', textDecoration: 'none' }}
          >
            fabricmc.net/develop/template/
          </Link>
          <br />
          Ensure <Box component="span" sx={{ fontFamily: 'NeueMachina-Ultrabold' }}>Data Generation</Box> and <Box component="span" sx={{ fontFamily: 'NeueMachina-Ultrabold' }}>'Split client and common sources'</Box> is on
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <UploadButton text={fileName} onFileSelect={handleFileSelect} yellow={showContinue} />
          {showDelete && (
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>

        {showContinue && (
          <Button
            variant="contained"
            sx={{
              fontFamily: 'NeueMachina-Ultrabold',
              backgroundColor: '#4caf50',
              color: 'white'
            }}
            onClick={() => navigate('/editor')}
          >
            Continue
          </Button>
        )}
      </Paper>

      <Button color="error"
            variant="contained"
            sx={{
              fontFamily: 'NeueMachina-Ultrabold',
              position: 'absolute',
              bottom: 20,
              left: 20,
              display: 'flex',
            }}
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'NeueMachina-Regular',
            fontSize: '1vw',
          }}
        >
          Developed By{" "}
          <Link
            href="https://www.instagram.com/zi_aliraza/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold', textDecoration: 'none' }}
          >
            @zi_aliraza
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}