const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const company_spectrum = await connection("company_spectrum").select("*").where("company_spectrum.company_id", "=", user.company_id).orderBy("percent", "asc");
            return res.json(company_spectrum);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        const { id } = req.params;
        const company_spectrum = await connection("company_spectrum")
            .where("id", id)
            .select("*")
            .first();
        return res.json(company_spectrum);
    },
    async store(req, res) {
        try {
            const { user } = req.auth;
            const { percent = 0, color } = req.body;
            const [company_spectrum] = await connection("company_spectrum").returning("*").insert({ company_id: user.company_id, percent, color });
            return res.status(201).json(company_spectrum);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { percent, color } = req.body;
            await connection("company_spectrum").where("id", id).update({ percent, color });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        const { id } = req.params;
        const company_spectrum = await connection("company_spectrum")
            .where("id", id)
            .select("id")
            .first();
        if (company_spectrum) {
            await connection("company_spectrum").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
