const connection = require("../../database/connection");
const moment = require('moment');

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const measurements = await connection("measurements")
                .innerJoin(
                    "equipments",
                    "equipments.serial",
                    "measurements.sensorSerialNo"
                )
                .select(
                    "measurements.*",
                    "equipments.name",
                    "equipments.brand",
                    "equipments.model",
                    "equipments.id AS equipment_id",
                )
                .where("equipments.company_id", "=", user.company_id)
                .orderBy("created_at", "desc");
            return res.json(measurements);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async show(req, res) {
        try {
            const { user } = req.auth;
            const { id } = req.params;
            const measurements = await connection("measurements")
                .innerJoin(
                    "equipments",
                    "equipments.serial",
                    "measurements.sensorSerialNo"
                )
                .select(
                    "measurements.*",
                    "equipments.name",
                    "equipments.brand",
                    "equipments.model",
                    "equipments.id AS equipment_id",
                )
                .where("equipments.company_id", "=", user.company_id)
                .where("equipments.id", "=", id);
            return res.json(measurements);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async store(req, res) {
        try {
            const { sensorSerialNo, date, time, temperature, current, voltage, power, consumption, } = req.body;
            const [measurement] = await connection("measurements").returning("*").insert({ sensorSerialNo, date, time, temperature, current, voltage, power, consumption, });
            const [equipment] = await connection("equipments").select("*").where("serial", sensorSerialNo);
            if (equipment) {
                const arr_alerts = [];
                if (parseFloat(power) > 700) {
                    const n = await connection("notifications").innerJoin("measurements", "measurements.sensorSerialNo", "notifications.serial").select("notifications.*").where("notifications.serial", sensorSerialNo).where("measurements.power", ">", 700).orderBy("notifications.created_at", "desc").first();
                    const d1 = moment(new Date());
                    const d2 = moment((n !== undefined) ? n.created_at : new Date("2020-01-01"));
                    if (d1.diff(d2) > 600000) {
                        arr_alerts.push({ serial: sensorSerialNo, title: "Alto consumo de energia", type: "danger" });
                        req.io.emit("notification", { serial: sensorSerialNo, title: "Alto consumo de energia", type: "danger", equipment_id: equipment.id, brand: equipment.brand, model: equipment.model, newAlert: true });
                    }
                }
                if (parseInt(temperature) > 12) {
                    const n = await connection("notifications").innerJoin("measurements", "measurements.sensorSerialNo", "notifications.serial").select("notifications.*").where("notifications.serial", sensorSerialNo).where("measurements.temperature", ">", 12).orderBy("notifications.created_at", "desc").first();
                    const d1 = moment(new Date());
                    const d2 = moment((n !== undefined) ? n.created_at : new Date("2020-01-01"));
                    if (d1.diff(d2) > 600000) {
                        arr_alerts.push({ serial: sensorSerialNo, title: "Temperatura interna alta", type: "danger" });
                        req.io.emit("notification", { serial: sensorSerialNo, title: "Temperatura interna alta", type: "danger", equipment_id: equipment.id, brand: equipment.brand, model: equipment.model, newAlert: true });
                    }
                }
                for (let i = 0; i < arr_alerts.length; i++) {
                    await connection("notifications").insert(arr_alerts[i]);
                }
            }
            return res.status(201).json(measurement);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                sensorSerialNo,
                date,
                time,
                temperature,
                current,
                voltage,
                power,
                consumption,
            } = req.body;
            await connection("measurements")
                .where("id", id)
                .update({
                    sensorSerialNo,
                    date,
                    time,
                    temperature,
                    current,
                    voltage,
                    power,
                    consumption,
                });
            return res.send();
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async destroy(req, res) {
        const { id } = req.params;
        const measurement = await connection("measurements")
            .where("id", id)
            .select("id")
            .first();
        if (measurement) {
            await connection("measurements").where("id", id).delete();
        }
        return res.status(204).send();
    },
};
