// client/src/components/TicketDetail.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import axios from 'axios';

function TicketDetail({ ticket, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    subject: ticket.subject,
    description: ticket.description,
    status: ticket.status
  });

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tickets/${ticket.id}`, formData);
      setEditMode(false);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode ? 'Edit Ticket' : 'Ticket Details'}
      </DialogTitle>
      <DialogContent>
        {editMode ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Subject"
              fullWidth
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Subject:</strong> {ticket.subject}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Status:</strong> {ticket.status}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Last Updated:</strong> {new Date(ticket.updated_at).toLocaleString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Description:</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
              {ticket.description}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        {editMode ? (
          <>
            <Button onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="contained">
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setEditMode(true)} variant="contained">
            Edit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default TicketDetail;