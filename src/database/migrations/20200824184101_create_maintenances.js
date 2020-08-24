
exports.up = function (knex) {
    return knex.schema.createTable('maintenances', function (table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.integer('equipment_id').unsigned().notNullable();
        table.text('description').notNullable();
        table.timestamps(true, true);

        table.foreign('user_id').references('users.id');
        table.foreign('equipment_id').references('equipments.id');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('maintenances');
};
