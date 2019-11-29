const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../db/knex.js');

module.exports = (app) => {
    const store = new KnexSessionStore({
        knex: knex,
        tablename: 'sessions'
    });

    app.use(session({
        secret: process.env.SECRET_SESSION,  
        cookie: {
            maxAge: 86400000 //24 hours
        },
        resave: false,
        saveUninitialized: false,
        store: store
    }));
}
