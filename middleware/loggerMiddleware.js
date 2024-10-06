const logger = (req, res, next) => {
    const now = new Date().toISOString(); // Get the current timestamp in ISO format
    console.log(`[${now}] ${req.method} ${req.url}`);  // Log the HTTP method and request URL with the timestamp
    next();
};

module.exports = logger;
