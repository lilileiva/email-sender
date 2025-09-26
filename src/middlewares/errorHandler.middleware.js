function errorHandlerMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: "Internal Server Error" });
};

export default errorHandlerMiddleware;