import { getLogger } from "../utils/logger.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

const allowedDomains = process.env.ALLOWED_CORS_DOMAINS.split(',') || [];

const logger = getLogger();

const corsMiddleware = (req, res, next) => {

    const origin = req.headers["origin"];

    logger.debug("Origin request:", origin);

    if (!allowedDomains.includes(origin)) {
        logger.warn(`Blocked CORS request from origin: ${origin}`);
        throw new ForbiddenError();
    }

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Api-Key");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
};

export default corsMiddleware;