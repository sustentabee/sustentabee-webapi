exports.up = function (knex) {
  return knex.schema.createTable("addresses", function (table) {
    table.increments();
    table.string("country").notNullable();
    table.string("state").notNullable();
    table.string("city").notNullable();
    table.string("adress").notNullable();
    table.string("number").notNullable();
    table.string("zipcode").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
