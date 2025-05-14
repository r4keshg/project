// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'heimdal_user',
  host: 'localhost',
  database: 'heimdal_db',
  password: 'heimdal123',
  port: 5432,
});

module.exports = pool;
