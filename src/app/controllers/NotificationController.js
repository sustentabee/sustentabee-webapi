const connection = require("../../database/connection");

module.exports = {
    async index(req, res) {
        try {
            const { user } = req.auth;
            const notifications = await connection("notifications")
                .innerJoin("equipments", "equipments.serial", "notifications.serial")
                .select("notifications.*", "equipments.name", "equipments.brand", "equipments.model", "equipments.id AS equipment_id")
                .where("equipments.company_id", "=", user.company_id)
                .orderBy("created_at", "desc");
            return res.json(notifications);
        } catch (error) {
            return res.status(400).json({ error });
        }
    },
    async store(req, res) {
        const { serial, title, type } = req.body;
        const equipment = await connection("equipments").select("*").where("serial", "=", serial).first();
        if (equipment) {
            await connection("notifications").insert(req.body);
            req.io.emit("notification", { serial, title, type, equipment_id: equipment.id, brand: equipment.brand, model: equipment.model, newAlert: true });
        }
        return res.send();
    }
};
