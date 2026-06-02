import { Pool, types } from 'pg';
import { config } from '../config';

// Keep DATE columns as plain YYYY-MM-DD strings instead of JS Date objects.
types.setTypeParser(1082, (val: string) => val);

export const pool = new Pool({
  ...config.db,
  ssl: { rejectUnauthorized: false },
});
