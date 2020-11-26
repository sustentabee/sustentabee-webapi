
exports.up = function (knex) {
    return knex.schema.createTable("company_spectrum", function (table) {
        table.increments();
        table.integer("company_id").unsigned().notNullable();
        table.double("percent").notNullable();
        table.string("color").notNullable();
        table.timestamps(true, true);

        table.foreign("company_id").references("companies.id");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("company_spectrum");
};
