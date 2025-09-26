import { getLogger } from "../utils/logger.js";

const logger = getLogger();

function requestLogMiddleware(req, res, next) {
    logger.info(`${req.method} ${req.hostname} ${req.path}`);
    next();
};

export default requestLogMiddleware;