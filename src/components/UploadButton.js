import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadButton({ text, onFileSelect, yellow }) {
  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        fontFamily: 'NeueMachina-Ultrabold',
        backgroundColor: yellow ? '#FFD700' : undefined,
        maxWidth: '20vw',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <VisuallyHiddenInput
        type="file"
        accept=".zip"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) onFileSelect(file);
        }}
      />
    </Button>
  );
}