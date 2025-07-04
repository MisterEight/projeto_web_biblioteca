const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'biblioteca',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'biblioteca',
  password: process.env.DB_PASS || 'biblioteca',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
