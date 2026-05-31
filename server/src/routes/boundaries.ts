import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { pool } from '../db/pool';

export const boundariesRouter = Router();

/** GET /boundaries — returns the single active boundary (or 404). */
boundariesRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, amount, period FROM boundaries ORDER BY created_at DESC LIMIT 1',
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'No boundary set' });
      return;
    }
    res.json({ data: toClient(rows[0]) });
  } catch (err) {
    next(err);
  }
});

/** PUT /boundaries — upsert: replace the current boundary with a new one. */
boundariesRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, period } = req.body as { amount: number; period: string };

    // Delete old rows then insert fresh — boundary is a singleton.
    await pool.query('DELETE FROM boundaries');
    const { rows } = await pool.query(
      'INSERT INTO boundaries (amount, period) VALUES ($1, $2) RETURNING *',
      [amount, period],
    );
    res.json({ data: toClient(rows[0]) });
  } catch (err) {
    next(err);
  }
});

interface DbBoundary {
  id: string;
  amount: string;
  period: string;
}

function toClient(row: DbBoundary) {
  return {
    id: row.id,
    amount: Number(row.amount),
    period: row.period,
  };
}
