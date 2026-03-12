import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../dev.db');

export async function initDb(): Promise<Database> {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS musicians (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE,
      name TEXT NOT NULL,
      headline TEXT,
      bio TEXT,
      location TEXT,
      remoteAvailable INTEGER DEFAULT 0,
      timezone TEXT,
      languages TEXT DEFAULT '[]',
      instruments TEXT DEFAULT '[]',
      genres TEXT DEFAULT '[]',
      skills TEXT DEFAULT '[]',
      ratingAverage REAL DEFAULT 0,
      ratingCount INTEGER DEFAULT 0,
      completedJobs INTEGER DEFAULT 0,
      responseTime TEXT,
      gallery TEXT DEFAULT '[]',
      audioSamples TEXT DEFAULT '[]',
      videoSamples TEXT DEFAULT '[]',
      badges TEXT DEFAULT '[]',
      avatarSrc TEXT,
      coverSrc TEXT,
      tier TEXT DEFAULT 'none',
      startingPrice REAL,
      currency TEXT DEFAULT 'USD',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      musicianId TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL,
      description TEXT,
      deliverables TEXT DEFAULT '[]',
      startingPrice REAL NOT NULL,
      priceType TEXT NOT NULL,
      turnaroundTime TEXT,
      revisionsIncluded INTEGER DEFAULT 0,
      tags TEXT DEFAULT '[]',
      deliveryMode TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (musicianId) REFERENCES musicians(id) ON DELETE CASCADE
    );
  `);

  // Migrations: add columns to existing tables if they don't exist yet
  const musicianCols = await db.all(`PRAGMA table_info(musicians)`);
  const musicianColNames = new Set((musicianCols as any[]).map((c) => c.name));
  if (!musicianColNames.has('userId')) {
    await db.exec(`ALTER TABLE musicians ADD COLUMN userId TEXT REFERENCES users(id) ON DELETE SET NULL`);
  }
  if (!musicianColNames.has('remoteAvailable')) {
    await db.exec(`ALTER TABLE musicians ADD COLUMN remoteAvailable INTEGER DEFAULT 0`);
  }

  const serviceCols = await db.all(`PRAGMA table_info(services)`);
  const serviceColNames = new Set((serviceCols as any[]).map((c) => c.name));
  if (!serviceColNames.has('category')) {
    await db.exec(`ALTER TABLE services ADD COLUMN category TEXT NOT NULL DEFAULT 'other'`);
  }

  return db;
}

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await initDb();
  }
  return dbInstance;
}
