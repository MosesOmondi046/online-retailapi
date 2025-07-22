// routes/orders.js
const express = require('express');
const router = express.Router();

// Sample orders data (replace with DB logic later)
const orders = [
  { order_id: 1, customer_id: 'C001', product_id: 'P20001', quantity: 2 },
  { order_id: 2, customer_id: 'C002', product_id: 'P20004', quantity: 1 },
];

router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
