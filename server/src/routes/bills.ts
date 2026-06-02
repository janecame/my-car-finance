import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { pool } from '../db/pool';

export const billsRouter = Router();

billsRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, category, amount_monthly, next_due_date, end_date, paid_months, created_at, updated_at FROM bills ORDER BY created_at ASC',
    );
    res.json({ data: rows.map(toClient) });
  } catch (err) {
    next(err);
  }
});

billsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, amountMonthly, nextDueDate, endDate } = req.body as {
      name: string;
      category: string;
      amountMonthly: number;
      nextDueDate: string;
      endDate?: string;
    };
    const { rows } = await pool.query(
      'INSERT INTO bills (name, category, amount_monthly, next_due_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, amountMonthly, nextDueDate, endDate ?? null],
    );
    res.status(201).json({ data: toClient(rows[0]) });
  } catch (err) {
    next(err);
  }
});

billsRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, category, amountMonthly, nextDueDate, endDate } = req.body as {
      name: string;
      category: string;
      amountMonthly: number;
      nextDueDate: string;
      endDate?: string;
    };
    const { rows } = await pool.query(
      `UPDATE bills
         SET name = $1, category = $2, amount_monthly = $3,
             next_due_date = $4, end_date = $5, updated_at = now()
       WHERE id = $6
       RETURNING *`,
      [name, category, amountMonthly, nextDueDate, endDate ?? null, id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Bill not found' });
      return;
    }
    res.json({ data: toClient(rows[0]) });
  } catch (err) {
    next(err);
  }
});

billsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM bills WHERE id = $1', [id]);
    if (rowCount === 0) {
      res.status(404).json({ error: 'Bill not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

/** Toggle paid state for a given month (defaults to current YYYY-MM). */
billsRouter.patch('/:id/toggle-paid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const month: string = (req.body as { month?: string }).month ?? currentMonthKey();

    const { rows } = await pool.query<DbBill>('SELECT paid_months FROM bills WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Bill not found' });
      return;
    }

    const current: string[] = rows[0].paid_months ?? [];
    const updated = current.includes(month)
      ? current.filter((m) => m !== month)
      : [...current, month];

    const { rows: updated_rows } = await pool.query(
      'UPDATE bills SET paid_months = $1, updated_at = now() WHERE id = $2 RETURNING *',
      [updated, id],
    );
    res.json({ data: toClient(updated_rows[0]) });
  } catch (err) {
    next(err);
  }
});

interface DbBill {
  id: string;
  name: string;
  category: string;
  amount_monthly: string;
  next_due_date: string;
  end_date: string | null;
  paid_months: string[];
  created_at: string;
  updated_at: string;
}

function toClient(row: DbBill) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    amountMonthly: Number(row.amount_monthly),
    nextDueDate: String(row.next_due_date).slice(0, 10),
    endDate: row.end_date ? String(row.end_date).slice(0, 10) : undefined,
    paidMonths: row.paid_months ?? [],
  };
}

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
