import { Router } from 'express';
import type { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import type { AuthRequest } from '../middleware/auth.js';
import { profileSchema } from '../schemas/validation.js';

const router = Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const db = await getDb();
    const profile = await db.get('SELECT * FROM musician_profiles WHERE userId = ?', req.user?.id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = profileSchema.parse(req.body);
    const userId = req.user?.id as string;
    const db = await getDb();

    const existingProfile = await db.get('SELECT id FROM musician_profiles WHERE userId = ?', userId);

    if (existingProfile) {
      const keys = Object.keys(validatedData);
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(validatedData), userId];
      
      await db.run(
        `UPDATE musician_profiles SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`,
        values
      );
    } else {
      const id = uuidv4();
      const keys = ['id', 'userId', ...Object.keys(validatedData)];
      const placeholders = keys.map(() => '?').join(', ');
      const values = [id, userId, ...Object.values(validatedData)];
      
      await db.run(
        `INSERT INTO musician_profiles (${keys.join(', ')}) VALUES (${placeholders})`,
        values
      );
    }

    const updatedProfile = await db.get('SELECT * FROM musician_profiles WHERE userId = ?', userId);
    res.json(updatedProfile);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
