import { PrismaClient } from '@prisma/client';
import path from 'path';

// Ensure SQLite database URL always points to absolute path of prisma/dev.db in Next.js runtime
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('file:.')) {
  const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
  process.env.DATABASE_URL = `file:${dbPath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
