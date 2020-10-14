const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const measurements = await connection("measurements").innerJoin("equipments", "equipments.serial", "measurements.sensorSerialNo").select("measurements.*", "equipments.name", "equipments.brand", "equipments.model").where("equipments.company_id", "=", user.company_id).orderBy("created_at", "desc");
            return res.json(measurements);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        const { id } = req.params;
        const measurement = await connection("measurements").where("id", id).select("*").first();
        return res.json(measurement);
    },
    async store(req, res) {
        try {
            const { sensorSerialNo, date, time, temperature, current, voltage, power, consumption } = req.body;
            const [measurement] = await connection("measurements").returning("*").insert({ sensorSerialNo, date, time, temperature, current, voltage, power, consumption });
            return res.status(201).json(measurement);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { sensorSerialNo, date, time, temperature, current, voltage, power, consumption } = req.body;
            await connection("measurements").where("id", id).update({ sensorSerialNo, date, time, temperature, current, voltage, power, consumption });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        const { id } = req.params;
        const measurement = await connection("measurements").where("id", id).select("id").first();
        if (measurement) {
            await connection("measurements").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
