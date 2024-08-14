import React, { useState, useEffect, useCallback } from 'react';
import { TextField, IconButton, Grid, Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import defaultCardImage from '../WhatsApp Image 2024-07-29 at 10.19.49_376f7aab.jpg';

const AdminFormPreview = ({ turf, onCancel, onSave, mode, onDecline }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(mode === 'add' || mode === 'edit');
  const [showPreview, setShowPreview] = useState(!(mode === 'add' || mode === 'edit'));
  const [showDeclineView, setShowDeclineView] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ownerName: '',
    license: '',
    address: '',
    openingTime: '',
    phone: '',
    services: '',
    file: null,
    rejectedBy: '',
    reason: '',
    customReason: '',
    id: '',
    image:'',
    ownerPersonalNumber:'',
    amountPerHour:'',
    maxMembersPerHour:''
  });

  useEffect(() => {
    if (turf) {
      setFormData({
        title: turf.title || '',
        ownerName: turf.ownerName || '',
        license: turf.license || '',
        address: turf.address || '',
        openingTime: turf.openingTime || '',
        phone: turf.phone || '',
        services: turf.services || '',
        file: null,
        rejectedBy: '', 
        reason: '',
        customReason: '',
        id: turf.id || '',
        image: turf.image || '',
        ownerPersonalNumber: turf.ownerPersonalNumber || '',
        amountPerHour:turf.amountPerHour||'',
        maxMembersPerHour:turf.maxMembersPerHour||''
      });
    }
  }, [turf]);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  }, []);

  const handleSave = async () => {
    try {
      if (mode === 'notification' && turf.id) {
        await axios.post('http://localhost:8081/api/turfs', formData);
        await axios.delete(`http://localhost:8080/api/turfs/${turf.id}`);
      } else if (mode === 'edit' && formData.id) {
        await axios.put(`http://localhost:8081/api/turfs/${formData.id}`, formData);
      } else if (mode === 'add') {
        await axios.post('http://localhost:8081/api/turfs', formData);
      } else {
        console.error('Invalid mode for saving');
        return;
      }
  
      onSave();
      setIsEditing(false);
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to save turf:', error);
    }
  };

  const handleSaveAndDelete = async () => {
    try {
      const declineData = {
        title: formData.title || '',
        rejectedBy: formData.rejectedBy || '',
        reason: formData.reason || ''
      };

      const saveResponse = await axios.post('http://localhost:8084/api/save', declineData);

      if (turf && turf.id) {
        await axios.delete(`http://localhost:8080/api/turfs/${turf.id}`);
        onDecline(turf.id);
      } else {
        console.warn('No turf ID provided for deletion');
      }

      onSave(saveResponse.data);
      setIsEditing(false);
      setShowPreview(true);

    } catch (error) {
      console.error('Failed to save and delete turf:', error.message);
    }
  };

  const handleDecline = () => {
    setShowDeclineView(true);
  };

  const handleReasonChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleEdit = () => {
    setIsEditing(true);
    setShowPreview(false);
  };

  

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Card sx={{ padding: 2, position: 'relative', minHeight: '400px' }}>
        {showDeclineView ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <Typography variant="h6">Decline Proposal</Typography>
              <IconButton onClick={() => setShowDeclineView(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
              <form>
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
                      label="Rejected by"
                      name="rejectedBy"
                      value={formData.rejectedBy}
                      onChange={handleChange}
                      fullWidth
                      required
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleReasonChange}
                      fullWidth
                      required
                      size="small"
                      select
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="">Select a reason</option>
                      <option value="Reason 1">Reason 1</option>
                      <option value="Reason 2">Reason 2</option>
                      <option value="Reason 3">Reason 3</option>
                      <option value="Custom">Custom</option>
                    </TextField>
                    {formData.reason === 'Custom' && (
                      <TextField
                        label="Custom Reason"
                        name="customReason"
                        value={formData.customReason}
                        onChange={handleReasonChange}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: 1 }}
                      />
                    )}
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
                >
                  <Button variant="contained" color="primary" onClick={handleSaveAndDelete}>
                    Save & Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginLeft: 1 }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item>
                {mode === 'add' ? (
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
              image={`data:image/jpeg;base64,${turf.image}`} // Ensure proper Base64 formatting
              alt="Turf Image"
              onError={(e) => {
                console.error('Error loading image:', e.target.src);
                e.target.src = defaultCardImage; // Provide fallback image
              }}
            />
                )}
              </Grid>
              <Grid item xs>
                <CardContent sx={{ flex: '1 0 auto', padding: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <Typography variant="h6">
                      {mode === 'add' || mode === 'notification'
                        ? 'Add New Turf'
                        : 'Edit Turf'}
                    </Typography>
                    <Box>
                      {showPreview && (
                        <>
                          <IconButton onClick={handleEdit} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={onCancel} size="small">
                            <CloseIcon />
                          </IconButton>
                        </>
                      )}
                    </Box>
                  </Box>
                  {showPreview ? (
                    <div style={{ textAlign: 'left' }}>
                      <Typography variant="h5" sx={{ marginBottom: 1 }}>
                        <i className="fas fa-futbol"></i>{' '}
                        {formData.title || 'Turf Name'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-user"></i>{' '}
                        {formData.ownerName || 'Owner Details'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-id-card"></i>{' '}
                        {formData.license || 'License'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-clock"></i>{' '}
                        {formData.openingTime || 'Opening Time'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-phone"></i>{' '}
                        {formData.phone || 'Phone'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {formData.address || 'Address'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        sx={{ marginBottom: 1 }}
                      >
                        <i className="fas fa-cogs"></i>{' '}
                        {formData.services || 'Services'}
                      </Typography>
                      <Typography
  variant="subtitle1"
  color="textSecondary"
  sx={{ marginBottom: 1 }}
>
  <i className="fas fa-rupee-sign"></i> {formData.amountPerHour || 'Amount Per Hour'}
</Typography>
                      {mode === 'notification' && (
  <Box sx={{ marginTop: 2 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        handleSave();
        // handleAccept(); // Use the new handleAccept function
        setShowPreview(true);
      }}
    >
      Accept
    </Button>
    <Button
      variant="contained"
      color="secondary"
      sx={{ marginLeft: 1 }}
      onClick={handleDecline}
    >
      Decline
    </Button>
  </Box>
                      )}
                    </div>
                  ) : (
                    <form>
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
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="License"
                            name="license"
                            value={formData.license}
                            onChange={handleChange}
                            fullWidth
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
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12}>
  <TextField
    label="Amount Per Hour"
    name="amountPerHour"
    value={formData.amountPerHour}
    onChange={handleChange}
    fullWidth
    size="small"
    InputLabelProps={{ shrink: true }}
  />
</Grid>
                      </Grid>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}
                      >
                        <Button variant="contained" color="primary" onClick={handleSave}>
                          {mode === 'add' ? 'Add' : 'Make Changes'}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{ marginLeft: 1 }}
                          onClick={onCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </Box>
  );
};

export default AdminFormPreview;
