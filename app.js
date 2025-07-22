const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const customerRoutes = require('./routes/customers');
const orderDetailsRoutes = require('./routes/orderDetails');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/customers', customerRoutes);
app.use('/order-details', orderDetailsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Online Retail API');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
