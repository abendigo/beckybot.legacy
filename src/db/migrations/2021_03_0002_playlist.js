export function up(knex) {
  return knex.schema.createTable('playlist', (table) => {
    table.string('id').primary();
    table.json('config');
  });
}

export function down(knex) {
  return knex.schema.dropTable('playlist');
}
