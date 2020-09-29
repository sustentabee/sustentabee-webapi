exports.up = function (knex) {
    return knex.schema.createTable("door_openings", function (table) {
        table.increments();
        table.string("sensorSerialNo").notNullable();
        table.date("date").notNullable();
        table.string("time").notNullable();
        table.boolean("open").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("door_openings");
};
