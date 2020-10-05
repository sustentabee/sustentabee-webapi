const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const companies = await connection("companies").innerJoin("addresses", "companies.address_id", "addresses.id").select("*").where("user_id", "=", user.id).orderBy("name", "asc");
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
            const { name = "", user_id, status = "active", document_number = "", phone = "", zipcode = "", address = "", neighborhood = "", city = "", state = "", number = "", complement } = req.body;
            const [newAddress] = await connection("addresses").returning("*").insert({ zipcode, address, neighborhood, city, state, number, complement });
            if (newAddress) {
                const [company] = await connection("companies").returning("*").insert({ user_id, address_id: newAddress.id, name, status, document_number, phone });
                return res.status(201).json(company);
            }
            return res.status(400).json({ error: "Error when registering the address." });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, status, document_number = "", phone = "", address_id, zipcode = "", address = "", neighborhood = "", city = "", state = "", number = "", complement } = req.body;
            await connection("companies").where("id", id).update({ name, status, document_number, phone });
            await connection("addresses").where("id", address_id).update({ zipcode, address, neighborhood, city, state, number, complement })
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const company = await connection("companies").where("id", id).select("*").first();
            if (company) {
                await connection("companies").where("id", id).delete();
                await connection("addresses").where("id", company.address_id).delete();
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
};
