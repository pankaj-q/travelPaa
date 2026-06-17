import app from "./app";
import { env } from "./config/env";
import { logger } from "./shared/utils/logger";
import { prisma } from "./config/database";

async function main() {
  try {
    await prisma.$connect();
    logger.info("Connected to database");

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }
}

main();

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down...");
  await prisma.$disconnect();
  process.exit(0);
});
