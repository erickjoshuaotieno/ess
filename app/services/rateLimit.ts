import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function checkRateLimit(identifier: string) {
  const client = await pool.connect();

  try {
    const now = new Date();

    await client.query('BEGIN');

    const { rows } = await client.query(
      `
      SELECT count, window_start
      FROM contact_rate_limits
      WHERE identifier = $1
      FOR UPDATE
      `,
      [identifier]
    );

    if (rows.length === 0) {
      // First request
      await client.query(
        `
        INSERT INTO contact_rate_limits (identifier, count, window_start)
        VALUES ($1, 1, $2)
        `,
        [identifier, now]
      );

      await client.query('COMMIT');
      return { allowed: true };
    }

    const { count, window_start } = rows[0];
    const windowAge = now.getTime() - new Date(window_start).getTime();

    if (windowAge > WINDOW_MS) {
      // Reset window
      await client.query(
        `
        UPDATE contact_rate_limits
        SET count = 1, window_start = $2
        WHERE identifier = $1
        `,
        [identifier, now]
      );

      await client.query('COMMIT');
      return { allowed: true };
    }

    if (count >= MAX_REQUESTS) {
      await client.query('ROLLBACK');
      return {
        allowed: false,
        retryAfter: Math.ceil((WINDOW_MS - windowAge) / 1000),
      };
    }

    await client.query(
      `
      UPDATE contact_rate_limits
      SET count = count + 1
      WHERE identifier = $1
      `,
      [identifier]
    );

    await client.query('COMMIT');
    return { allowed: true };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
