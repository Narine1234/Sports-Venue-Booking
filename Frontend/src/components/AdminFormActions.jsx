import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const AdminFormActions = ({ showPreview, handleEdit, onCancel, handleSave }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
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
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  </Box>
);

export default AdminFormActions;
