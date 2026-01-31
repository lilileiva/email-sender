import crypto from "crypto";
import { getLogger } from "../utils/logger.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

const logger = getLogger();

function safeCompare(a, b) {
  const bufferA = Buffer.from(a || "");
  const bufferB = Buffer.from(b || "");

  return (
    bufferA.length === bufferB.length &&
    crypto.timingSafeEqual(bufferA, bufferB)
  );
}

export function apiKeyMiddleware(req, res, next) {
  const key = req.get("x-api-key" || "X-Api-Key");

  if (!key) {
    logger.debug("API key not provided");
    throw new UnauthorizedError();
  }

  const validKeys = (process.env.API_KEYS || "")
    .split(",")
    .map(key => key.trim())
    .filter(Boolean);

  const isValid = validKeys.some(validKey => safeCompare(key, validKey));

  if (!isValid) {
    logger.debug("Invalid API key");
    throw new UnauthorizedError();
  }

  next();
}

export default apiKeyMiddleware;
