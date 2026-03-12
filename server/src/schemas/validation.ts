import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const profileSchema = z.object({
  fullName: z.string().min(2),
  stageName: z.string().optional(),
  bio: z.string().optional(),
  instruments: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  socialLinks: z.string().optional(),
});
