
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          first_name: 'Alejandro',
          last_name: 'Bertollini',
          email: 'alebertollini@gmail.com',
          hash: 'admin',
      },
      ]);
    });
};
