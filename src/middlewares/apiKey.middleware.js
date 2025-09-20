const apiKey = process.env.API_KEY;

function apiKeyMiddleware(req, res, next) {
    const key = req.headers["x-api-key"];

    if (key !== apiKey) {
        return res.status(403).json({ error: "Forbidden" });
    }

    next();
}

export default apiKeyMiddleware;
