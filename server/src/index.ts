import express from 'express';
import cors from 'cors';
import { config } from './config';
import { pool } from './db/pool';
import { billsRouter } from './routes/bills';
import { boundariesRouter } from './routes/boundaries';
import { ridesRouter } from './routes/rides';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'ok' });
  } catch {
    res.json({ status: 'degraded', db: 'error' });
  }
});

app.use('/bills', billsRouter);
app.use('/boundaries', boundariesRouter);
app.use('/rides', ridesRouter);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
