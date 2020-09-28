exports.up = function (knex) {
  return knex.schema.createTable("maintenances", function (table) {
    table.increments();
    table.integer("equipment_id").unsigned().notNullable();
    table.date("date").notNullable();
    table.text("description").notNullable();
    table.timestamps(true, true);

    table.foreign("equipment_id").references("equipments.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("maintenances");
};
