function requestLogMiddleware(req, res, next) {
    const time = new Date(Date.now()).toString();
    console.log(`[${time}] ${req.method} ${req.hostname} ${req.path}`);
    next();
};

export default requestLogMiddleware;