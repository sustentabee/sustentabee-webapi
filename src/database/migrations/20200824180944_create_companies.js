exports.up = function (knex) {
  return knex.schema.createTable("companies", function (table) {
    table.increments();
    table.integer("adress_id").unsigned().notNullable();
    table.string("name").notNullable();
    table.string("status").notNullable();
    table.string("cnpj").notNullable();
    table.string("telefone").notNullable();
    table.string("endereco").notNullable();
    table.timestamps(true, true);

    table.foreign("adress_id").references("addresses.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("companies");
};
