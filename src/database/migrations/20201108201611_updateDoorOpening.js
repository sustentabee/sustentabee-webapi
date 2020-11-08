
exports.up = function (knex) {
    return knex.schema.alterTable("door_openings", function (table) {
        table.boolean("notification").defaultTo(false).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("door_openings", function (table) {
        table.dropColumn('notification');
    });
};
