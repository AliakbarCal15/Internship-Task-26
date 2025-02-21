import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from './components/Header';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetail from './components/TicketDetail';

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleCreateSuccess = () => {
    setIsFormOpen(false);
    setRefreshList(prev => !prev); // Toggle to trigger refresh
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header onCreateTicket={() => setIsFormOpen(true)} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TicketList 
          onTicketSelect={setSelectedTicket}
          refreshTrigger={refreshList}
        />
        <TicketForm 
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleCreateSuccess}
        />
        {selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            onSuccess={() => setRefreshList(prev => !prev)}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;