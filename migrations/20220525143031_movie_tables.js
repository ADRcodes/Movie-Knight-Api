exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("user_id").primary();
      table.string("username").notNullable();
      table.string("display_name");
    })
    .createTable("movie", (table) => {
      table.increments("movie_id").primary();
      table.string("title").notNullable();
      table.string("imdb_id").notNullable();
    })
    .createTable("streaming_service", (table) => {
      table.increments("streaming_id").primary();
      table.string("streaming_name").notNullable();
    })
    .createTable("movie_availability", (table) => {
      table
        .integer("movie_id")
        .unsigned()
        .notNullable()
        .references("movie_id")
        .inTable("movie")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("streaming_id")
        .unsigned()
        .notNullable()
        .references("streaming_id")
        .inTable("streaming_service")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("rating", (table) => {
      table
        .integer("movie_id")
        .unsigned()
        .notNullable()
        .references("movie_id")
        .inTable("movie")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("user_rating").notNullable();
    })
    .createTable("user_streaming_service", (table) => {
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("streaming_id")
        .unsigned()
        .notNullable()
        .references("streaming_id")
        .inTable("streaming_service")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("rating")
    .dropTable("movie_availability")
    .dropTable("movie")
    .dropTable("user_streaming_service")
    .dropTable("user")
    .dropTable("streaming_service");
};
