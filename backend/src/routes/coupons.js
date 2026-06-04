// src/routes/coupons.js - Coupon Routes

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', (req, res) => {
  // TODO: Implement get coupons
  res.json({ message: 'Get coupons endpoint' });
});

router.post('/validate', protect, (req, res) => {
  // TODO: Implement validate coupon
  res.json({ message: 'Validate coupon endpoint' });
});

module.exports = router;
