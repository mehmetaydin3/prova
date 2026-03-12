import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Primary profile schema — maps to the musicians table
export const musicianProfileSchema = z.object({
  name: z.string().min(2, 'Display name must be at least 2 characters'),
  headline: z.string().max(120).optional().or(z.literal('')),
  bio: z.string().max(2000).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  remoteAvailable: z.boolean().optional().default(false),
  instruments: z.array(z.string()).optional().default([]),
  genres: z.array(z.string()).optional().default([]),
  avatarSrc: z.string().url().optional().or(z.literal('')),
});

export const SERVICE_CATEGORIES = [
  'recording',
  'mixing',
  'mastering',
  'production',
  'lessons',
  'live-performance',
  'session-work',
  'songwriting',
  'other',
] as const;

export const serviceSchema = z.object({
  category: z.enum(SERVICE_CATEGORIES).default('other'),
  title: z.string().min(3).max(120),
  description: z.string().max(1000).optional().or(z.literal('')),
  deliverables: z.array(z.string()).optional().default([]),
  startingPrice: z.number().min(0),
  priceType: z.enum(['fixed', 'hourly', 'per-project']),
  turnaroundTime: z.string().optional().or(z.literal('')),
  revisionsIncluded: z.number().int().min(0).optional().default(0),
  tags: z.array(z.string()).optional().default([]),
  deliveryMode: z.enum(['remote', 'in-person', 'both']),
});
