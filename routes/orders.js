const express = require('express');
const router = express.Router();
const pool = require('../db');
const Joi = require('joi');

const orderSchema = Joi.object({
  order_id: Joi.string().required(),
  customer_id: Joi.string().required(),
  order_date: Joi.date().required()
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders WHERE order_id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).send('Order not found');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { order_id, customer_id, order_date } = req.body;
    const result = await pool.query(
      'INSERT INTO orders (order_id, customer_id, order_date) VALUES ($1, $2, $3) RETURNING *',
      [order_id, customer_id, order_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  const { error } = orderSchema.validate({ ...req.body, order_id: req.params.id });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { customer_id, order_date } = req.body;
    const result = await pool.query(
      'UPDATE orders SET customer_id = $1, order_date = $2 WHERE order_id = $3 RETURNING *',
      [customer_id, order_date, req.params.id]
    );
    if (!result.rows.length) return res.status(404).send('Order not found');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [req.params.id]);
    if (!result.rows.length) return res.status(404).send('Order not found');
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
