
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table)=>{
      table.increments();
      table.string('title');
      table.text('body');
      table.text('img_url');
      table.integer('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();    
      table.string('date');
      table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
