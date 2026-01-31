import rateLimit from "express-rate-limit";

const rateLimitWindowMs = process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000;
const rateLimitMax = process.env.RATE_LIMIT_MAX || 100;

if (isNaN(rateLimitWindowMs) || isNaN(rateLimitMax)) {
    throw new Error("RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX must be numbers");
}

const rateLimitMiddleware = rateLimit({
    windowMs: Number(rateLimitWindowMs),
    max: Number(rateLimitMax),
    message: {
        error: "Too many requests, please try again later."
    }
});

export default rateLimitMiddleware;
