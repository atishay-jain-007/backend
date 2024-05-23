// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token not provided' });
    }
console.log(token)
    // Verify token
    jwt.verify(token, 'jsooon', (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        // Attach user information to request for further processing
        req.user = decoded;
        next(); // Pass control to the next middleware
    });
};

module.exports = verifyToken;
