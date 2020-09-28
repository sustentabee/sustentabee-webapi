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
    },

    async selectCompany(req, res) {
        const { user } = req.auth;
        const { company_id } = req.body;
        const company = await connection('companies').where('id', company_id).select('*').first();
        if (company) {
            const token = jwt.sign({ user: { id: user.id, name: user.name, company_id: company.id, company_name: company.name } }, process.env.SECRET_API_KEY);
            return res.json({ token });
        }
        return res.status(400).json({ error: "Company not found." });
    },

}