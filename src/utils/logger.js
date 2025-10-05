import winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;

let logger;

const initializeLogger = () => {
  if (logger) return;

  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(
      colorize({ all: true }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console(),
    ],
  });
};

export const getLogger = () => {
  initializeLogger();
  return logger;
};
