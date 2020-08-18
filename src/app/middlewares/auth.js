const jwt = require("jsonwebtoken");
require("dotenv/config");

const auth = (req, res, next) => {
    const token = cleanToken(req.headers['authorization']);
    if (token) {
        jwt.verify(token, process.env.SECRET_API_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ error: err.name });
            req.auth = decoded;
            next();
        });
    } else {
        return res.status(401).json({ error: "Auth token is not supplied" });
    }
}

const cleanToken = (token) => (String(token).startsWith('Bearer ')) ? token.slice(7, token.length) : token;

module.exports = auth; 