import React from 'react';
import { Typography } from '@mui/material';

const PreviewDetails = ({ turf }) => (
  <>
    <Typography variant="subtitle1" color="text.secondary">
      {turf?.title}
    </Typography>
    <Typography variant="subtitle2" color="text.secondary">
      Owner: {turf?.ownerName}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      License No: {turf?.license}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Address: {turf?.address}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Opening Time: {turf?.openingTime}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Phone: {turf?.phone}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Services: {turf?.services}
    </Typography>
  </>
);

export default PreviewDetails;
