import crypto from "crypto";

function safeCompare(a, b) {
  const bufferA = Buffer.from(a || "");
  const bufferB = Buffer.from(b || "");

  return (
    bufferA.length === bufferB.length &&
    crypto.timingSafeEqual(bufferA, bufferB)
  );
}

export function apiKeyMiddleware(req, res, next) {
  const key = req.get("x-api-key");

  if (!key) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const validKeys = (process.env.API_KEYS || "")
    .split(",")
    .map(key => key.trim())
    .filter(Boolean);

  const isValid = validKeys.some(validKey => safeCompare(key, validKey));

  if (!isValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

export default apiKeyMiddleware;
