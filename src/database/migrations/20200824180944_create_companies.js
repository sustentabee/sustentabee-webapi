
exports.up = function (knex) {
    return knex.schema.createTable('companies', function (table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.string('name').notNullable();
        table.string('status').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('users.id')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('companies');
};
