module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'marin2',
            host: '127.0.0.1',
            user: 'Nico1',
            password: '123456'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/production'
        }
    }
}