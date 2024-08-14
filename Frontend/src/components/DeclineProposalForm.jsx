import React from 'react';
import { Box, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DeclineProposalForm = ({ formData, handleChange, handleReasonChange, handleSaveAndDelete, onCancel, setShowDeclineView }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
      <Typography variant="h6">Decline Proposal</Typography>
      <IconButton onClick={() => setShowDeclineView(false)} size="small">
        <CloseIcon />
      </IconButton>
    </Box>
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSaveAndDelete}>
          Save & Delete
        </Button>
        <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </form>
  </>
);

export default DeclineProposalForm;
