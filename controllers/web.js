const knex = require('../db/knex');

module.exports = {
    index: (req, res) => {
        knex('audios').orderBy('audio_date', 'DESC')
            .then(audios => {
                if (audios.length === "undefined") {
                    audios = [];
                } else if (audios.length > 3) {
                    audios = audios.slice(0, 4);
                }
                knex('posts').orderBy('created_at', 'DESC')
                    .then((results) => {
                        let threePosts = [results[0], results[1], results[2]];
                        threePosts.forEach(post => {
                            let str = post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
                            post.body = str;
                            if (post.body.length > 150) {
                                let shortPost = post.body.substr(0, 150);
                                post.body = shortPost + '...';
                            }
                            let date = post.date.substr(0, 10);
                            let time = post.date.substr(11, 5);

                            post.date = date;
                            post.time = time;
                        })
                        res.render('./web/index', { posts: threePosts, audios: audios })
                    })
            })
    },

    nosotros: (req, res) => {
        knex('posts').where('section', 'Nosotros').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/nosotros', { posts: data });
            })
    },

    novedad: (req, res) => {
        knex('posts').where('id', req.params.id)
            .then(result => {
                let post = result[0];
                let str = post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
                post.body = str;
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                post.date = date;
                post.time = time;
                res.render('./web/novedad', { post });
            })
    },

    // -- Colecta Virtual --
    colecta: (req, res) => {
        res.render('./web/colecta')
    },

    // -- Servicios para la Comunidad --

    matrimonios: (req, res) => {
        knex('posts').where('section', 'Matrimonios').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/servicios_comunidad/matrimonios', { posts: data });
            })
    },

    cursosPrematrimoniales: (req, res) => {
        knex('posts').where('section', 'Cursos Prematrimoniales').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/servicios_comunidad/cursos_prematrimoniales', { posts: data });
            })
    },
    
    bautismos: (req, res) => {
        knex('posts').where('section', 'Bautismos').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/servicios_comunidad/bautismos', { posts: data });
            })
    },

    reconciliacionesCharlas: (req, res) => {
        knex('posts').where('section', 'Reconciliaciones y Charlas').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/servicios_comunidad/reconciliacion_charlas', { posts: data });
            })
    },


    visitasEnfermos: (req, res) => {
        knex('posts').where('section', 'Visitas a Enfermos').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/servicios_comunidad/visitas_enfermos', { posts: data });
            })
    },

    // -- Espiritualidad --

    adoracion: (req, res) => {
        knex('posts').where('section', 'Adoración').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/adoracion', { posts: data });
            })
    },

    liturgiaEspiritualidad: (req, res) => {
        knex('posts').where('section', 'Liturgia y Espiritualidad').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/liturgia_espiritualidad', { posts: data });
            })
    },

    ministros: (req, res) => {
        knex('posts').where('section', 'Ministros').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/ministros', { posts: data });
            })
    },

    coro: (req, res) => {
        knex('posts').where('section', 'Coro').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/coro', { posts: data });
            })
    },

    aletheia: (req, res) => {
        knex('posts').where('section', 'Aletheia').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/aletheia', { posts: data });
            })
    },

    meditacionCristiana: (req, res) => {
        knex('posts').where('section', 'Meditacion Cristiana').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/meditacion_cristiana', { posts: data });
            })
    },

    circulosOracion: (req, res) => {
        knex('posts').where('section', 'Circulos de Oracion').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/circulos_oracion', { posts: data });
            })
    },

    ciclosConferencias: (req, res) => {
        knex('posts').where('section', 'VFyC').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/espiritualidad/ciclos_conferencias', { posts: data });
            })
    },

    // -- Retiros --

    entretiempo: (req, res) => {
        knex('posts').where('section', 'Entretiempo').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/retiros/entretiempo', { posts: data });
            })
    },

    oportunidad: (req, res) => {
        knex('posts').where('section', 'Oportunidad').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/retiros/oportunidad', { posts: data });
            })
    },

    retirosComunitarios: (req, res) => {
        knex('posts').where('section', 'Comunitarios').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/retiros/retiros_comunitarios', { posts: data });
            })
    },

    // -- Jovenes --

    confirmacion: (req, res) => {
        knex('posts').where('section', 'Confirmacion').orderBy('created_at', 'DESC')
            .then((data) => {
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/jovenes/confirmacion', { posts: data });
            })
    },

    postConfirmacion: (req, res) => {
        knex('posts').where('section', 'Post Confirmacion').orderBy('created_at', 'DESC')
        .then((data) => {
            data.forEach(post => {
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                post.date = date;
                post.time = time;
            })
            res.render('./web/jovenes/post_confirmacion', { posts: data });
        })
    },

    mision: (req, res) => {
        knex('posts').where('section', 'Mision').orderBy('created_at', 'DESC')
        .then((data) => {
            data.forEach(post => {
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                post.date = date;
                post.time = time;
            })
            res.render('./web/jovenes/mision', { posts: data });
        })
    },

    // -- Proyectos Comunitarios --

    caritas: (req, res) => {
        knex('posts').where('section', 'Caritas').orderBy('created_at', 'DESC')
        .then((data) => {
            data.forEach(post => {
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                post.date = date;
                post.time = time;
            })
            res.render('./web/iniciativas_solidarias/caritas', { posts: data });
        })
    },

    proyectosComunidad: (req, res) => {
        knex('posts').where('section', 'Proyectos Comunidad').orderBy('created_at', 'DESC')
        .then((data) => {
            data.forEach(post => {
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                post.date = date;
                post.time = time;
            })
            res.render('./web/iniciativas_solidarias/proyectos', { posts: data });
        })
    }

}