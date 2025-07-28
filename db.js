const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'online_retail',
  password: 'julie2010',   
  port: 5432,                  
});

module.exports = pool;