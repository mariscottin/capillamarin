const knex = require('../db/knex');

module.exports = {
    index: (req, res) => {
        knex('posts').orderBy('created_at', 'DESC').then((results) => {
            let threePosts = [results[0], results[1], results[2]];
            threePosts.forEach(post => {
                let str = post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
                post.body = str;
                if(post.body.length > 150) {
                    let shortPost = post.body.substr(0, 150);
                    post.body = shortPost + '...';
                }
                let date = post.date.substr(0, 10);
                let time = post.date.substr(11, 5);
                
                post.date = date;
                post.time = time;

                knex('audios').orderBy('date', 'DESC').then((audios) => {
                    if(audios.length >= 10){
                        let audios = audios.slice(0, 10);
                    }
                })
            })
            console.log(results)
            console.log(audios)
            res.render('./web/index', {posts: threePosts, audios: audios})
        })
    },

    nosotros: (req, res) => {
        res.render('./web/nosotros');
    },

    novedad: (req, res) => {
        knex('posts').where('id', req.params.id)
        .then(result =>{
            let post = result[0];
            let str = post.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
                post.body = str;
            let date =post.date.substr(0, 10);
            let time =post.date.substr(11, 5);
                post.date = date;
                post.time = time;
            console.log(post)
            res.render('./web/novedad', {post});
        }) 
    },

    // -- Servicios para la Comunidad --

    matrimonios: (req, res) => {
        knex('posts').where('section', 'Matrimonios')
            .then((data) => {
                console.log(data);
                res.render('./web/servicios_comunidad/matrimonios');
            })

    },

    cursosPrematrimoniales: (req, res) => {
        res.render('./web/servicios_comunidad/cursos_prematrimoniales');
    },

    reconciliacionesCharlas: (req, res) => {
        res.render('./web/servicios_comunidad/reconciliacion_charlas');
    },

    bautismos: (req, res) => {
        res.render('./web/servicios_comunidad/bautismos');
    },

    visitasEnfermos: (req, res) => {
        res.render('./web/servicios_comunidad/visitas_enfermos');
    },

    // -- Espiritualidad --

    adoracion: (req, res) => {
        res.render('./web/espiritualidad/adoracion');
    },

    liturgiaEspiritualidad: (req, res) => {
        res.render('./web/espiritualidad/liturgia_espiritualidad');
    },

    ministros: (req, res) => {
        res.render('./web/espiritualidad/ministros');
    },

    coro: (req, res) => {
        res.render('./web/espiritualidad/coro');
    },

    aletheia: (req, res) => {
        res.render('./web/espiritualidad/aletheia');
    },

    meditacionCristiana: (req, res) => {
        res.render('./web/espiritualidad/meditacion_cristiana');
    },

    circulosOracion: (req, res) => {
        res.render('./web/espiritualidad/circulos_oracion');
    },

    ciclosConferencias: (req, res) => {
        res.render('./web/espiritualidad/ciclos_conferencias');
    },

    // -- Retiros --

    entretiempo: (req, res) => {
        res.render('./web/retiros/entretiempo');
    },

    oportunidad: (req, res) => {
        res.render('./web/retiros/oportunidad');
    },

    retirosComunitarios: (req, res) => {
        knex('posts').where('section', 'Retiros Comunitarios').orderBy('created_at', 'DESC')
            .then((data) => {
                console.log(data);
                data.forEach(post => {
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    post.date = date;
                    post.time = time;
                })
                res.render('./web/retiros/retiros_comunitarios', {posts: data});
            })
    },

    // -- Jovenes --

    confirmacion: (req, res) => {
        res.render('./web/jovenes/confirmacion');
    },

    postConfirmacion: (req, res) => {
        res.render('./web/jovenes/post_confirmacion');
    },

    universitarios: (req, res) => {
        res.render('./web/jovenes/universitarios');
    },

    mision: (req, res) => {
        res.render('./web/jovenes/mision');
    },

    // -- Proyectos Comunitarios --

    caritas: (req, res) => {
        res.render('./web/iniciativas_solidarias/caritas');
    },

    proyectosComunidad: (req, res) => {
        res.render('./web/iniciativas_solidarias/proyectos');
    }

}