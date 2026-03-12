import { Router } from 'express';
import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';

const router = Router();

const VALID_STATUSES = ['pending', 'accepted', 'declined', 'in_progress', 'delivered', 'completed', 'cancelled'];

// POST /api/bookings — create a new booking (authenticated customer)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { musicianId, serviceId, packageName, packagePrice, currency, scheduledDate, brief } = req.body;

    if (!musicianId) {
      return res.status(400).json({ message: 'musicianId is required' });
    }

    const db = await getDb();

    const musician = await db.get('SELECT id FROM musicians WHERE id = ?', musicianId);
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }

    if (serviceId) {
      const service = await db.get('SELECT id FROM services WHERE id = ? AND musicianId = ?', [serviceId, musicianId]);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
    }

    const price = typeof packagePrice === 'number' ? packagePrice : null;
    const platformFee = price !== null ? Math.round(price * 0.1) : null;
    const totalPrice = price !== null && platformFee !== null ? price + platformFee : null;

    const id = uuidv4();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO bookings (id, customerId, musicianId, serviceId, status, packageName, packagePrice, platformFee, totalPrice, currency, scheduledDate, brief, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, req.user!.id, musicianId, serviceId || null, packageName || null, price, platformFee, totalPrice, currency || 'USD', scheduledDate || null, brief || null, now, now]
    );

    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', id);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/bookings — list bookings for the authenticated user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const bookings = await db.all(
      `SELECT * FROM bookings WHERE customerId = ? ORDER BY createdAt DESC`,
      req.user!.id
    );
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/bookings/:id — get a single booking
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PATCH /api/bookings/:id/status — update booking status
router.patch('/:id/status', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const db = await getDb();
    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customerId !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const now = new Date().toISOString();
    await db.run('UPDATE bookings SET status = ?, updatedAt = ? WHERE id = ?', [status, now, req.params.id]);

    const updated = await db.get('SELECT * FROM bookings WHERE id = ?', req.params.id);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
