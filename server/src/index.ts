import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import musicianRoutes from './routes/musicians.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import { getDb } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/musicians', musicianRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Legacy health check (root level)
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Primary health check at /api/health — includes db connectivity probe
app.get('/api/health', async (_req, res) => {
  try {
    const db = await getDb();
    // Lightweight query to verify the DB connection is alive
    await db.get('SELECT 1');
    res.json({ status: 'ok', timestamp: Date.now(), db: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', timestamp: Date.now(), db: 'disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
