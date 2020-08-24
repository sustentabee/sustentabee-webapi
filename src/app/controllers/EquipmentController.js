const connection = require("../../database/connection");

module.exports = {

    async index(req, res) {
        const { user } = req.auth;
        const equipments = await connection('equipments').select('*').where('user_id', user.id);
        return res.json(equipments);
    },
    async show(req, res) {
        const { id } = req.params;
        const equipment = await connection('equipments').where('id', id).select('*').first();
        return res.json(equipment);
    },
    async store(req, res) {
        const { user } = req.auth;
        const { name } = req.body;

        const [equipment] = await connection('equipments').returning('*').insert({
            user_id: user.id,
            name
        });

        return res.status(201).json(equipment);
    },
    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        await connection('equipments').where('id', id).update({
            name
        });
        return res.send();
    },
    async destroy(req, res) {
        const { id } = req.params;
        const equipment = await connection('equipments').where('id', id).select('id').first();
        if (equipment) {
            await connection('equipments').where('id', id).delete();
        }
        return res.status(204).send();
    }

}