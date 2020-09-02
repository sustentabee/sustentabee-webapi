const connection = require("../../database/connection");

module.exports = {
  async index(req, res) {
    const addresses = await connection("addresses").select("*");
    return res.json(addresses);
  },
  async show(req, res) {
    const { id } = req.params;

    const adress = await connection("addresses")
      .where("id", id)
      .select("*")
      .first();
    return res.json(adress);
  },
  async store(req, res) {
    const {
      country,
      state,
      city,
      adress: endereco,
      number,
      zipcode = "",
    } = req.body;

    const [adress] = await connection("addresses").returning("*").insert({
      country,
      state,
      city,
      adress: endereco,
      number,
      zipcode,
    });

    return res.status(201).json(adress);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      country,
      state,
      city,
      adress: endereco,
      number,
      zipcode = "",
    } = req.body;
    await connection("addresses").where("id", id).update({
      country,
      state,
      city,
      adress: endereco,
      number,
      zipcode,
    });
    return res.send();
  },
  async destroy(req, res) {
    const { id } = req.params;
    const adress = await connection("addresses")
      .where("id", id)
      .select("id")
      .first();
    if (adress) {
      await connection("addresses").where("id", id).delete();
    }
    return res.status(204).send();
  },
};
