import React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import './PhotosVideos.css';
import th1 from '../th(1).jpeg';
import th2 from '../th(2).jpeg';
import th3 from '../th(3).jpeg';
import th4 from '../th(4).jpeg';
import th5 from '../th(5).jpeg';
import th6 from '../th(6).jpeg';

const photos = [
  { id: 1, src: th1, alt: 'Photo 1' },
  { id: 2, src: th2, alt: 'Photo 2' },
  { id: 3, src: th3, alt: 'Photo 3' },
  { id: 4, src: th4, alt: 'Photo 4' },
  { id: 5, src: th5, alt: 'Photo 5' },
  { id: 6, src: th6, alt: 'Photo 6' },
  // Add more photos as needed
];

export default function Photos() {
  return (
    <div className="photos-section">
      <h5 className="section-header">Photos</h5>
      <Grid container spacing={2} justifyContent="flex-start">
        {photos.length === 0 ? (
          <Grid item xs={12}>
            <Sheet className="empty-state">
              <p>No Photos Available</p>
            </Sheet>
          </Grid>
        ) : (
          photos.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={4}>
              <Sheet
                component="img"
                src={photo.src}
                alt={photo.alt}
                className="photo"
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
