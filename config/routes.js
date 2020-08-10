const posts = require('../controllers/posts');
const users = require('../controllers/users');
const web = require('../controllers/web');

module.exports = (app) => {

    //---- Unprotected Routes ---
    
    //WEB
    app.get('/', web.index);

    app.get('/nosotros', web.nosotros);

    app.get('/novedad/:id', web.novedad)

    // -- Colecta Virtual --
    app.get('/colecta', web.colecta);

    // -- Servicios para la Comunidad --
    app.get('/servicios-para-la-comunidad/matrimonios', web.matrimonios);

    app.get('/servicios-para-la-comunidad/cursos-prematrimoniales', web.cursosPrematrimoniales);

    app.get('/servicios-para-la-comunidad/reconciliaciones-y-charlas-espirituales', web.reconciliacionesCharlas);

    app.get('/servicios-para-la-comunidad/bautismos', web.bautismos);

    app.get('/servicios-para-la-comunidad/visitas-a-enfermos', web.visitasEnfermos);

    // -- Espiritualidad --

    app.get('/espiritualidad/adoracion', web.adoracion);

    app.get('/espiritualidad/liturgia-y-espiritualidad', web.liturgiaEspiritualidad);

    app.get('/espiritualidad/ministros', web.ministros);

    app.get('/espiritualidad/coro', web.coro);

    app.get('/espiritualidad/aletheia', web.aletheia);

    app.get('/espiritualidad/meditacion-cristiana', web.meditacionCristiana);

    app.get('/espiritualidad/circulos-de-oracion', web.circulosOracion);

    app.get('/espiritualidad/ciclos-de-conferencias-vida-fe-y-cultura', web.ciclosConferencias);

    // -- Retiros --

    app.get('/retiros/entretiempo', web.entretiempo);

    app.get('/retiros/oportunidad', web.oportunidad);

    app.get('/retiros/retiros-comunitarios', web.retirosComunitarios);

    // -- Jovenes --

    app.get('/jovenes/confirmacion', web.confirmacion);

    app.get('/jovenes/post-confirmacion', web.postConfirmacion);

    app.get('/jovenes/mision', web.mision);

    // -- Proyectos Comunitarios --

    app.get('/iniciativas-solidarias/caritas', web.caritas);

    app.get('/iniciativas-solidarias/proyectos-de-la-comunidad', web.proyectosComunidad);


    //LOGIN
    app.get('/login', users.login);

    app.post('/login/validate', users.validate);
   

    //----Auth Middleware----
    app.use(authMiddleware);

    //---- Protected Routes ----

    //ADMIN
    app.get('/admin', users.admin);

    //POSTS

    app.get('/admin/posts', posts.redirectToAllPosts);

    app.get('/admin/posts/:page', posts.allPosts);
    
    app.get('/admin/new-post', posts.new);
    
    app.post('/posts', posts.create);

    app.get('/post/edit/:id', posts.editShow);

    app.post('/post/edit/:id', posts.edit);

    app.post('/post/delete/:id', posts.delete);

    //AUDIOS
    app.get('/admin/homilias', posts.redirectToAllAudios);

    app.get('/admin/homilias/:page', posts.allAudios);

    app.get('/admin/new-audio',posts.newAudio);

    app.post('/audio', posts.createAudio);

    app.post('/audio/delete/:id', posts.deleteAudio);


    
}

function authMiddleware(req, res, next){
    if(!req.session.user_id){
        res.redirect('/login');
    }else{
        next();
    }
}
