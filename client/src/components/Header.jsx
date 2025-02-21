import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Header({ onCreateTicket }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Support Ticket System
        </Typography>
        <Button 
          color="inherit" 
          startIcon={<AddIcon />}
          onClick={onCreateTicket}
        >
          Create Ticket
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;