
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          title: 'Cambio de Cura',
          body: 'A partir de mañana vamos a tener al Cholo hablando de películas!!',
          img_url: 'https://previews.123rf.com/images/ljupco/ljupco1508/ljupco150800141/43769073-tiro-vertical-de-un-joven-sacerdote-cat%C3%B3lico-celebraci%C3%B3n-de-la-biblia-y-mirando-a-la-c%C3%A1mara-aislada-en-el-fo.jpg',
          user_id: 1,
          date: new Date()
        },
        {
          title: 'Nuevos Horarios',
          body: 'La semana que viene comenzamos a trabajar con horarios nuevos porque me dan fiaca los actuales!',
          img_url: 'https://d15kx7sft32rtl.cloudfront.net/imagenes_articulosweb/803578780540839_PE653259_S5.JPG?v=10',
          user_id: 1,
          date: new Date()
        }
      ]);
    });
};
