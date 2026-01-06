import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL, // <- direct access
  ssl: { rejectUnauthorized: false },        // required for Neon
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected successfully to Neon DB!');
    const res = await client.query('SELECT NOW()');
    console.log('Server time:', res.rows[0]);
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

testConnection();
