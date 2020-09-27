const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        const equipments = await connection("equipments").select("*");
        return res.json(equipments);
    },
    async show(req, res) {
        const { id } = req.params;
        const equipment = await connection("equipments")
            .where("id", id)
            .select("*")
            .first();
        return res.json(equipment);
    },
    async store(req, res) {
        const {
            name,
            serial,
            brand,
            model,
            dateAcquisition,
            potency,
            voltage,
            estimatedConsumption,
            company_id,
        } = req.body;

        const [equipment] = await connection("equipments").returning("*").insert({
            name,
            serial,
            brand,
            model,
            dateAcquisition,
            potency,
            voltage,
            estimatedConsumption,
            company_id,
        });

        return res.status(201).json(equipment);
    },
    async update(req, res) {
        const { id } = req.params;
        const {
            name,
            serial,
            brand,
            model,
            dateAcquisition,
            potency,
            voltage,
            estimatedConsumption,
            company_id,
        } = req.body;
        await connection("equipments").where("id", id).update({
            name,
            serial,
            brand,
            model,
            dateAcquisition,
            potency,
            voltage,
            estimatedConsumption,
            company_id,
        });
        return res.send();
    },
    async destroy(req, res) {
        const { id } = req.params;
        const equipment = await connection("equipments")
            .where("id", id)
            .select("id")
            .first();
        if (equipment) {
            await connection("equipments").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
