import React from 'react';
import { Button, CardMedia } from '@mui/material';

const ImageUploadOrDisplay = ({ mode, turf, handleChange, defaultCardImage }) => (
  mode === 'add' ? (
    <label htmlFor="file-input">
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-input"
        type="file"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        component="span"
        sx={{ width: 250, height: 220, borderRadius: '8%' }}
      >
        Upload Image
      </Button>
    </label>
  ) : (
    <CardMedia
      component="img"
      sx={{ width: 250, height: 220, borderRadius: '8%' }}
      image={turf?.image || defaultCardImage} 
      alt="Turf Image"
    />
  )
);

export default ImageUploadOrDisplay;
