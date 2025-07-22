const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Customers route is working!' });
});

module.exports = router;
