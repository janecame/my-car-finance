import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { pool } from '../db/pool';

export const ridesRouter = Router();

ridesRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, fare, timestamp, note FROM rides ORDER BY timestamp DESC',
    );
    res.json({ data: rows.map(toClient) });
  } catch (err) {
    next(err);
  }
});

ridesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fare, note, date } = req.body as { fare: number; note?: string; date?: string };
    const timestamp = date ?? new Date().toISOString();
    const { rows } = await pool.query(
      'INSERT INTO rides (fare, timestamp, note) VALUES ($1, $2, $3) RETURNING *',
      [fare, timestamp, note ?? null],
    );
    res.status(201).json({ data: toClient(rows[0]) });
  } catch (err) {
    next(err);
  }
});

ridesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM rides WHERE id = $1', [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Ride not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

interface DbRide {
  id: string;
  fare: string;
  timestamp: string;
  note: string | null;
}

function toClient(row: DbRide) {
  return {
    id: row.id,
    fare: Number(row.fare),
    date: row.timestamp,
    note: row.note ?? undefined,
  };
}
