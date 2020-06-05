const Pool = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  password:"c1mth00g",
  host: "localhost",
  port :5432,
  database:"myuser"
})

module.exports = pool;