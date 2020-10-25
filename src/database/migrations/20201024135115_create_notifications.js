exports.up = function (knex) {
return knex.schema.createTable("notifications", function (table) {
        table.increments();
        table.string("serial").notNullable();
        table.string("title").notNullable();
        table.string("type").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("notifications");
};
