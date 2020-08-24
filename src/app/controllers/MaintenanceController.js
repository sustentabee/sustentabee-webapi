const connection = require("../../database/connection");

module.exports = {

    async index(req, res) {
        const { user } = req.auth;
        const maintenances = await connection('maintenances').select('*').where('user_id', user.id);
        return res.json(maintenances);
    },
    async show(req, res) {
        const { id } = req.params;
        const maintenance = await connection('maintenances').where('id', id).select('*').first();
        return res.json(maintenance);
    },
    async store(req, res) {
        const { user } = req.auth;
        const { equipment_id, description = "" } = req.body;

        const [maintenance] = await connection('maintenances').returning('*').insert({
            user_id: user.id,
            equipment_id,
            description
        });

        return res.status(201).json(maintenance);
    },
    async update(req, res) {
        const { id } = req.params;
        const { equipment_id, description = "" } = req.body;
        await connection('maintenances').where('id', id).update({
            equipment_id,
            description
        });
        return res.send();
    },
    async destroy(req, res) {
        const { id } = req.params;
        const maintenance = await connection('maintenances').where('id', id).select('id').first();
        if (maintenance) {
            await connection('maintenances').where('id', id).delete();
        }
        return res.status(204).send();
    }

}