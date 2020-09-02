exports.up = function (knex) {
  return knex.schema.createTable("equipments", function (table) {
    table.increments();
    table.integer("company_id").unsigned().notNullable();
    table.string("name").notNullable();
    table.string("serial").notNullable();
    table.string("brand").notNullable();
    table.string("model").notNullable();
    table.date("dateAcquisition").notNullable();
    table.float("potency").notNullable();
    table.float("voltage").notNullable();
    table.float("estimatedConsumption").notNullable();
    table.timestamps(true, true);

    table.foreign("company_id").references("companies.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("equipments");
};
