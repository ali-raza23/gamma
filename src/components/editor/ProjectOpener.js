import * as React from 'react';
import {
  Paper,
  Box,
  Typography,
  Link,
  Button,
  IconButton,
  Switch,
  FormControlLabel
} from '@mui/material';
import UploadButton from '../UploadButton.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

export default function ProjectOpener() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = React.useState(localStorage.getItem('uploadedFile') || null);
  const [fileName, setFileName] = React.useState(uploadedFile ? uploadedFile : 'Import Project');
  const [showContinue, setShowContinue] = React.useState(!!uploadedFile);
  const [showDelete, setShowDelete] = React.useState(!!uploadedFile);
  const [dragMode, setDragMode] = React.useState(false);

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result; // data:application/zip;base64,...
      const name = file.name.length > 20 ? file.name.slice(0, 17) + '...' : file.name;
  
      setFileName(name);
      setUploadedFile(base64Data); // Not file name
      setShowContinue(true);
      setShowDelete(true);
  
      localStorage.setItem('uploadedFile', base64Data); // Save the data
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };
  

  const handleDelete = () => {
    setFileName('Import Project');
    setUploadedFile(null);
    setShowContinue(false);
    setShowDelete(false);
    localStorage.removeItem('uploadedFile');
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.name.endsWith('.zip')) {
      handleFileSelect(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, noClick: true });

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
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Logo"
        style={{ maxWidth: '15vw' }}
      />

      <FormControlLabel
        control={<Switch checked={dragMode} onChange={(e) => setDragMode(e.target.checked)} />}
        label={<Typography sx={{ fontFamily: 'NeueMachina-Regular' }}>Enable Drag & Drop</Typography>}
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
          {!dragMode ? (
            <>
              <UploadButton text={fileName} onFileSelect={handleFileSelect} yellow={showContinue} />
              {showDelete && (
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              )}
            </>
          ) : (
            <Box
              {...getRootProps()}
              sx={{
                width: '300px',
                height: '150px',
                border: '2px dashed grey',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDragActive ? '#0d0d0d' : '#121212',
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                {isDragActive
                  ? <Typography sx={{ fontFamily: 'NeueMachina-Regular' }}>Drag and Drop the file here</Typography>
                  : uploadedFile
                  ? <Typography sx={{ fontFamily: 'NeueMachina-Regular' }}>{fileName}</Typography>
                  : <Typography sx={{ fontFamily: 'NeueMachina-Regular' }}>Drag and Drop a ZIP file</Typography>}
              </Typography>
            </Box>
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