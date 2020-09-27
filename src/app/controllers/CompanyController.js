const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const companies = await connection("companies").select("*").where("user_id", "=", user.id).orderBy("name", "asc");
            return res.json(companies);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        const { id } = req.params;
        const company = await connection("companies")
            .where("id", id)
            .select("*")
            .first();
        return res.json(company);
    },
    async store(req, res) {
        try {
            const { user } = req.auth;
            req.body.user_id = user.id;
            const { name = "", user_id, status = "active", document_number = "", phone = "" } = req.body;
            const [company] = await connection("companies").returning("*").insert({ user_id, name, status, document_number, phone });
            return res.status(201).json(company);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        const { id } = req.params;
        const { name, status, document_number = "", phone = "" } = req.body;
        await connection("companies").where("id", id).update({
            name,
            status,
            document_number,
            phone
        });
        return res.send();
    },
    async destroy(req, res) {
        const { id } = req.params;
        const company = await connection("companies")
            .where("id", id)
            .select("id")
            .first();
        if (company) {
            await connection("companies").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
