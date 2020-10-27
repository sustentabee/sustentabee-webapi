const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const equipments = await connection("equipments").select("*").where("company_id", user.company_id).orderBy("id", "desc");
            return res.json(equipments);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        try {
            const { user } = req.auth;
            const { id } = req.params;
            const equipment = await connection("equipments").select("*").where("company_id", user.company_id).where("id", id).first();
            return res.json(equipment);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async store(req, res) {
        try {
            const { user } = req.auth;
            req.body.company_id = user.company_id;
            const { name, serial, brand, model, dateAcquisition, potency, voltage, estimatedConsumption, company_id } = req.body;
            const [equipment] = await connection("equipments").returning("*").insert({ name, serial, brand, model, dateAcquisition, potency, voltage, estimatedConsumption, company_id });
            return res.status(201).json(equipment);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, serial, brand, model, dateAcquisition, potency, voltage, estimatedConsumption } = req.body;
            await connection("equipments").where("id", id).update({ name, serial, brand, model, dateAcquisition, potency, voltage, estimatedConsumption });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const equipment = await connection("equipments")
                .where("id", id)
                .select("id")
                .first();
            if (equipment) {
                await connection("equipments").where("id", equipment.id).delete();
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
};
