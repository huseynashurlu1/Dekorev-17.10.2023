const jwt = require('jsonwebtoken');
const secretKey = 'devlife85***';

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'Token təqdim edilməyib.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token doğrulanmadı.' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = { verifyToken };
