import { getLogger } from "../utils/logger.js";

const logger = getLogger();

function errorHandlerMiddleware(err, req, res, next) {
    logger.error(err.stack);
    res.status(err.status || 500).json({ error: "Internal Server Error" });
};

export default errorHandlerMiddleware;