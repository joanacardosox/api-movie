exports.up = function (knex) {
  return knex.schema.createTable("notes", function (table) {
    table.increments("id");
    table.text("title")
    table.text("description")
    table.integer("rating").notNullable().checkBetween([1, 5]);
    
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("id").inTable("users");

    table.date("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notes");
};
