const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const door_openings = await connection("door_openings").select("*");
            return res.json(door_openings);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        const { id } = req.params;
        const door_opening = await connection("door_openings").where("id", id).select("*").first();
        return res.json(door_opening);
    },
    async store(req, res) {
        try {
            const { sensorSerialNo, date, time, open } = req.body;
            const [door_opening] = await connection("door_openings").returning("*").insert({ sensorSerialNo, date, time, open });
            return res.status(201).json(door_opening);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { sensorSerialNo, date, time, open } = req.body;
            await connection("door_openings").where("id", id).update({ sensorSerialNo, date, time, open });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        const { id } = req.params;
        const door_opening = await connection("door_openings").where("id", id).select("id").first();
        if (door_opening) {
            await connection("door_openings").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
