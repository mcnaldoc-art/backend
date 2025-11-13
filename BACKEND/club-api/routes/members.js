const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all members
router.get('/', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET one member by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST new member
router.post('/', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO members SET ?', data, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, ...data });
  });
});

// PUT update member
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  db.query('UPDATE members SET ? WHERE id = ?', [data, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...data });
  });
});

// DELETE member
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM members WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Member deleted', id });
  });
});

module.exports = router;
