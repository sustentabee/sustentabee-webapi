const connection = require("../../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv/config');

module.exports = {

    async login(req, res) {
        const { email, password } = req.body;
        const user = await connection('users').where('email', email).select('*').first();
        if (user) {
            if (user.status == "active") {
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ user }, process.env.SECRET_API_KEY);
                    return res.json({ token });
                }
                return res.status(400).json({ error: "Password incorrect" });
            }
            return res.status(400).json({ error: "Inactive account" });
        }
        return res.status(400).json({ error: "User not found" });
    }

}