import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MessageOverlay({ open, onClose, text }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column', }}>
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ fontFamily: 'NeueMachina-Regular', fontSize: '2vw' }}
        >
          {text}
        </Typography>
        <Button variant="contained" color="error"
          sx={{ fontFamily: 'NeueMachina-Regular', fontSize: '1vw', marginTop: '16px' }} 
          onClick={onClose}
        >
          back
        </Button>
      </DialogContent>
    </Dialog>
  );
}