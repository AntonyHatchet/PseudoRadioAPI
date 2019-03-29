import logger from "./logger";

process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandledRejection", reason, promise);
  process.exit(1);
});
