exports.up = function (knex) {
    return knex.schema.createTable("addresses", function (table) {
        table.increments();
        table.string("zipcode").notNullable();
        table.string("address").notNullable();
        table.string("neighborhood").notNullable();
        table.string("city").notNullable();
        table.string("state").notNullable();
        table.string("number").notNullable();
        table.string("complement").nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("addresses");
};
