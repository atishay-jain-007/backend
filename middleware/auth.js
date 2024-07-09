
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'Token not provided' });
    }
// console.log(token)

    jwt.verify(token, 'jsooon', (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

       
        req.user = decoded;
        next(); 
    });
};

module.exports = verifyToken;
