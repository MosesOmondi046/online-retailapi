const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  const { product_id, name, unit_price, stock } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (product_id, name, unit_price, stock) VALUES ($1, $2, $3, $4)',
      [product_id, name, unit_price, stock]
    );
    res.status(201).json({ message: 'Product added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, unit_price, stock } = req.body;
  try {
    await pool.query(
      'UPDATE products SET name = $1, unit_price = $2, stock = $3 WHERE product_id = $4',
      [name, unit_price, stock, id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
