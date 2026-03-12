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

    CREATE TABLE IF NOT EXISTS musician_profiles (
      id TEXT PRIMARY KEY,
      userId TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      stageName TEXT,
      bio TEXT,
      instruments TEXT,
      location TEXT,
      website TEXT,
      socialLinks TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS musicians (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      headline TEXT,
      bio TEXT,
      location TEXT,
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
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      musicianId TEXT NOT NULL,
      serviceType TEXT NOT NULL,
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

  return db;
}

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await initDb();
  }
  return dbInstance;
}
