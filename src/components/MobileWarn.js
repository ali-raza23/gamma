import React from "react";
import { Box, Typography, Link, Paper } from "@mui/material";

export default function MobileWarn() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{ maxWidth: '50vw', marginTop: 20 }}  
      />
      
      <Paper 
        elevation={0.5}
        square={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px', 
          maxWidth: '80%', 
          width: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: 'NeueMachina-Regular', 
            fontSize: '4vw', 
            padding: '10px', 
          }}
        >
          Gamma does not support Mobile yet. Unfortunately.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'flex-end', 
          paddingBottom: 2,
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'NeueMachina-Regular', 
            fontSize: '3vw',
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