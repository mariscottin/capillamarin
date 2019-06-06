const knex = require('../db/knex');

module.exports = {
    
    login: (req, res) => {
        req.session.destroy();
        res.render('./admin/login', {error: req.query.error});
    },


    validate: (req, res) => {
        knex('users').where('username', req.body.username).then((results)=>{
            let user = results[0];
            if(!user){
                res.redirect('/login?error=invalid');
                return;
            }
            if(user.hash === req.body.hash){
                req.session.user_id = user.id;
                req.session.save(()=>{
                    res.redirect('/admin');
                })
            }else{
                res.redirect('/login?error=invalid')
            }
        })
    },

    admin: (req, res) => {
        res.render('./admin/admin')
    }
}