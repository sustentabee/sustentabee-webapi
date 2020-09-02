exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.integer("company_id").unsigned();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("status").notNullable();
    table.timestamps(true, true);

    table.foreign("company_id").references("companies.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
