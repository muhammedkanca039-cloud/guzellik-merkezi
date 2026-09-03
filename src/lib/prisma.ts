import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

/**
 * Geliştirme ve prodüksiyon (Vercel) ortamları için uygun veritabanı bağlantı URLsini döner.
 * Vercel serverless ortamında veritabanı dosyasına yazma yetkisi olmadığı için /tmp klasörüne kopyalar.
 */
function getDatabaseUrl(): string {
  if (process.env.VERCEL) {
    // Vercel serverless environment: copy bundled pre-seeded dev.db to /tmp/dev.db for write access
    const tmpDbPath = '/tmp/dev.db';
    const bundledDbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');

    try {
      if (!fs.existsSync(tmpDbPath) && fs.existsSync(bundledDbPath)) {
        fs.copyFileSync(bundledDbPath, tmpDbPath);
      }
    } catch (e) {
      console.error('Failed to copy database to /tmp:', e);
    }

    return fs.existsSync(tmpDbPath) ? `file:${tmpDbPath}` : `file:${bundledDbPath}`;
  }

  // Local development environment
  const localDbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
  return `file:${localDbPath}`;
}

const dbUrl = getDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

// PrismaClient'ın global bir örneğini tutmak için nesne (Next.js'te hot-reload sırasında birden fazla client oluşmasını engeller)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Singleton Prisma client örneği dışarı aktarılır
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
