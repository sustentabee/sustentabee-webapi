exports.up = function (knex) {
    return knex.schema.createTable("companies", function (table) {
        table.increments();
        table.integer("user_id").unsigned();
        table.string("name").notNullable();
        table.string("status").defaultTo("active").notNullable();
        table.string("document_number").nullable();
        table.string("phone").nullable();
        table.timestamps(true, true);

        table.foreign("user_id").references("users.id");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("companies");
};
