import React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import './PhotosVideos.css';

const videos = [
  { id: 1, src: 'https://www.youtube.com/embed/videoid1', title: 'Video 1' },
  { id: 2, src: 'https://www.youtube.com/embed/videoid2', title: 'Video 2' },
  { id: 3, src: 'https://www.youtube.com/embed/videoid3', title: 'Video 3' },
  { id: 4, src: 'https://www.youtube.com/embed/videoid4', title: 'Video 4' },
  { id: 5, src: 'https://www.youtube.com/embed/videoid5', title: 'Video 5' },
  // Add more videos as needed
];

export default function Videos() {
  return (
    <div className="videos-section">
      <h5 className="section-header">Videos</h5>
      <Grid container spacing={2} justifyContent="flex-start">
        {videos.map((video) => (
          <Grid key={video.id} item xs={12} sm={6} md={4}>
            <Sheet
              component="iframe"
              src={video.src}
              title={video.title}
              className="video"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
