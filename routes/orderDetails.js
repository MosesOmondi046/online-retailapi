const express = require('express');
const router = express.Router();

// Sample test route for Order Details
router.get('/', (req, res) => {
  res.json({ message: 'List of order details will go here.' });
});

module.exports = router;
