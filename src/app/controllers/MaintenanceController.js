const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const maintenances = await connection("maintenances").innerJoin("equipments", "equipments.id", "maintenances.equipment_id").select("maintenances.*", "equipments.name", "equipments.brand", "equipments.model").where("equipments.company_id", "=", user.company_id).orderBy("date", "desc");
            return res.json(maintenances);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        const { id } = req.params;
        const maintenance = await connection("maintenances")
            .where("id", id)
            .select("*")
            .first();
        return res.json(maintenance);
    },
    async store(req, res) {
        try {
            const { equipment_id, date, description = "" } = req.body;
            const [maintenance] = await connection("maintenances").returning("*").insert({ equipment_id, date, description });
            return res.status(201).json(maintenance);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { equipment_id, date, description = "" } = req.body;
            await connection("maintenances").where("id", id).update({ equipment_id, date, description });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        const { id } = req.params;
        const maintenance = await connection("maintenances")
            .where("id", id)
            .select("id")
            .first();
        if (maintenance) {
            await connection("maintenances").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
