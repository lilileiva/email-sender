const allowedDomains = process.env.ALLOWED_DOMAINS || "http://localhost:3000";
const apiKey = process.env.API_KEY;

function domainAuthMiddleware(req, res, next) {
    const key = req.headers["x-api-key"];
    const origin = req.headers["host"] || "";

    console.log("Origin host:", origin);

    console.log('apiKey:', apiKey, key);
    if (key !== apiKey || !allowedDomains.includes(origin)) {
        return res.status(403).json({ error: "Forbidden" });
    }

    next();
}

export default domainAuthMiddleware;
