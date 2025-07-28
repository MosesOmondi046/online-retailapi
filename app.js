const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const swaggerDocument = YAML.load('./swagger.yaml');


const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/customers', require('./routes/customers'));
app.use('/order-details', require('./routes/orderDetails'));

app.get('/', (req, res) => {
  res.send('Welcome to the Online Retail API');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
