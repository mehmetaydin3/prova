import { Router } from 'express';
import type { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';
import { bookingSchema } from '../schemas/validation.js';

const router = Router();

const VALID_STATUSES = ['pending', 'accepted', 'declined', 'in_progress', 'delivered', 'completed', 'cancelled'];

// POST /api/bookings — create a new booking (authenticated customer)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    // 1. Validate request body shape and field constraints
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Invalid booking request',
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { musicianId, serviceId, scheduledDate, brief } = parsed.data;

    const db = await getDb();

    // 2. Resolve musician — must exist
    const musician = await db.get('SELECT id, currency FROM musicians WHERE id = ?', musicianId);
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }

    // 3. Resolve service — must exist and belong to this musician
    const service = await db.get(
      'SELECT id, title, startingPrice FROM services WHERE id = ? AND musicianId = ?',
      [serviceId, musicianId]
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found or does not belong to this musician' });
    }

    // 4. Validate resolved price — must be a finite non-negative number
    const price: number = service.startingPrice;
    if (typeof price !== 'number' || !isFinite(price) || price < 0) {
      return res.status(422).json({ message: 'Service has an invalid price and cannot be booked' });
    }

    // 5. Validate resolved package name — must be a non-empty string
    const packageName: string = service.title;
    if (!packageName || typeof packageName !== 'string' || packageName.trim().length === 0) {
      return res.status(422).json({ message: 'Service title is missing and cannot be booked' });
    }

    // 6. Calculate derived financial fields and assert they are finite
    const platformFee = Math.round(price * 0.1);
    const totalPrice = price + platformFee;
    if (!isFinite(platformFee) || !isFinite(totalPrice)) {
      return res.status(422).json({ message: 'Price calculation failed — booking cannot be created' });
    }

    const currency = musician.currency || 'USD';
    const id = uuidv4();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO bookings (id, customerId, musicianId, serviceId, status, packageName, packagePrice, platformFee, totalPrice, currency, scheduledDate, brief, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, req.user!.id, musicianId, serviceId, packageName.trim(), price, platformFee, totalPrice, currency, scheduledDate || null, brief || null, now, now]
    );

    const booking = await db.get('SELECT * FROM bookings WHERE id = ?', id);
    res.status(201).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/bookings/incoming — bookings where the caller IS the musician
// Must be declared before /:id to avoid Express matching "incoming" as an id.
router.get('/incoming', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const musician = await db.get(
      'SELECT id FROM musicians WHERE userId = ?',
      req.user!.id
    );

    if (!musician) {
      // User has no musician profile yet — return empty list, not an error
      return res.json({ bookings: [] });
    }

    const bookings = await db.all(
      `SELECT * FROM bookings WHERE musicianId = ? ORDER BY createdAt DESC`,
      musician.id
    );

    res.json({ bookings });
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

    const musician = await db.get(
      'SELECT userId FROM musicians WHERE id = ?',
      booking.musicianId
    );
    const isCustomer = booking.customerId === (req as any).user.id;
    const isMusician = musician?.userId === (req as any).user.id;

    if (!isCustomer && !isMusician) {
      return res.status(403).json({ error: 'Not authorized' });
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
