exports.up = function (knex) {
    return knex.schema.createTable("measurements", function (table) {
        table.increments();
        table.string("sensorSerialNo").notNullable();
        table.date("date").notNullable();
        table.string("time").notNullable();
        table.float("temperature").notNullable();
        table.float("current").notNullable();
        table.float("voltage").notNullable();
        table.float("power").notNullable();
        table.float("consumption").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("measurements");
};
