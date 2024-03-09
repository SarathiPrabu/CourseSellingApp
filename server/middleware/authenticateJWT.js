const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
};
module.exports = authenticateJWT;
