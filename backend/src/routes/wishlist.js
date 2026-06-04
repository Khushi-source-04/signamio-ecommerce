// src/routes/wishlist.js - Wishlist Routes

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', protect, (req, res) => {
  // TODO: Implement wishlist controller
  res.json({ message: 'Wishlist endpoint' });
});

router.post('/add', protect, (req, res) => {
  // TODO: Implement add to wishlist
  res.json({ message: 'Add to wishlist endpoint' });
});

module.exports = router;
