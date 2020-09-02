const connection = require("../../database/connection");

module.exports = {
  async index(req, res) {
    const companies = await connection("companies").select("*");
    return res.json(companies);
  },
  async show(req, res) {
    const { id } = req.params;
    const company = await connection("companies")
      .where("id", id)
      .select("*")
      .first();
    return res.json(company);
  },
  async store(req, res) {
    const {
      name,
      status = "active",
      cnpj,
      telefone,
      endereco,
      adress_id,
    } = req.body;

    const [company] = await connection("companies").returning("*").insert({
      name,
      adress_id,
      status,
      cnpj,
      telefone,
      endereco,
    });

    return res.status(201).json(company);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, status } = req.body;
    await connection("companies").where("id", id).update({
      name,
      status,
    });
    return res.send();
  },
  async destroy(req, res) {
    const { id } = req.params;
    const company = await connection("companies")
      .where("id", id)
      .select("id")
      .first();
    if (company) {
      await connection("companies").where("id", id).delete();
    }
    return res.status(204).send();
  },
};
