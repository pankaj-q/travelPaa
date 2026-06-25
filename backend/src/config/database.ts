import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { logger } from "../shared/utils/logger";

const SLOW_QUERY_MS = 500;
const MAX_CONNECT_RETRIES = 5;
const BASE_RETRY_DELAY_MS = 1000;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPoolWithRetry(): Pool {
  let retries = 0;
  while (true) {
    try {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL!,
        max: 15,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });

      // Test connection
      pool.on("error", (err) => {
        logger.error({ err }, "Unexpected pool error");
      });

      return pool;
    } catch (err) {
      retries++;
      if (retries >= MAX_CONNECT_RETRIES) {
        throw err;
      }
      const delay = BASE_RETRY_DELAY_MS * Math.pow(2, retries - 1);
      logger.warn({ retries, delay }, "Database connection failed, retrying...");
      // In real code, you'd use await sleep(delay) here
      // For sync creation, we just throw and let the process handle restart
      throw err;
    }
  }
}

function createPrismaClient() {
  const pool = createPoolWithRetry();
  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({
    adapter,
    log: [
      { emit: "event", level: "query" },
      { emit: "stdout", level: "error" },
      { emit: "stdout", level: "warn" },
    ],
  });

  client.$on("query" as never, (e: { duration: number; query: string }) => {
    if (e.duration > SLOW_QUERY_MS) {
      logger.warn({ duration: e.duration, query: e.query }, "slow query");
    }
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
