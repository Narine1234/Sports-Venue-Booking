import React from 'react';
import { Grid, TextField } from '@mui/material';

const TurfFormFields = ({ formData, handleChange }) => (
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField
        label="Turf Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Owner Name"
        name="ownerName"
        value={formData.ownerName}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="License No"
        name="license"
        value={formData.license}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Opening Time"
        name="openingTime"
        value={formData.openingTime}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Services"
        name="services"
        value={formData.services}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
  </Grid>
);

export default TurfFormFields;
