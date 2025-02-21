const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const [tickets] = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single ticket
router.get('/:id', async (req, res) => {
  try {
    const [ticket] = await db.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    if (ticket.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create ticket
router.post('/', async (req, res) => {
  const { subject, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tickets (subject, description) VALUES (?, ?)',
      [subject, description]
    );
    const [newTicket] = await db.query('SELECT * FROM tickets WHERE id = ?', [result.insertId]);
    res.status(201).json(newTicket[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update ticket
router.put('/:id', async (req, res) => {
  const { subject, description, status } = req.body;
  try {
    await db.query(
      'UPDATE tickets SET subject = ?, description = ?, status = ? WHERE id = ?',
      [subject, description, status, req.params.id]
    );
    const [updatedTicket] = await db.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    res.json(updatedTicket[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete ticket
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;