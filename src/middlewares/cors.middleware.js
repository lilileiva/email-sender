const allowedDomains = process.env.ALLOWED_DOMAINS;

const corsMiddleware = (req, res, next) => {

    const origin = req.headers.origin;

    console.log("Origin:", origin);

    if (!allowedDomains.includes(origin)) {
        return res.status(403).json({ error: "Forbidden" });
    }

    res.header("Access-Control-Allow-Credentials", "false");

    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");

    res.header("Access-Control-Allow-Headers", "Content-Type, X-Api-Key");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
};

export default corsMiddleware;