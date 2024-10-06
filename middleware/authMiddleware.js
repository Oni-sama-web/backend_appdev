const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';  

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Get the token from the Authorization header
    if (!token) return res.status(401).send('Access denied. No token provided.'); // Return error if no token
     
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');  // Return error if the token is invalid
    }
};

module.exports = authMiddleware;