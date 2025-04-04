import * as React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <img
        src='./assets/logo.png'
        alt="Logo"
        style={{ maxWidth: '10vw' }}  
      />
      
      <Button
        variant="contained"
        sx={{
          fontFamily: 'NeueMachina-Ultrabold',
          backgroundColor: '#4caf50',
          color: 'white',
        }}
        onClick={() => navigate('/project')}
      >
        Create Fabric Project
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