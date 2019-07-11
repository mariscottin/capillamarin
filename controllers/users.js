const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    
    login: (req, res) => {
        req.session.destroy();
        res.render('./admin/login', {error: req.query.error});
    },


    validate: (req, res) => {
        knex('users').where('username', req.body.username)
        .then((results)=>{
            let user = results[0];
            const isValid = bcrypt.compareSync(req.body.hash, user.hash);
            if(!user){
                res.redirect('/login?error=invalid');
                return;
            }
            if(isValid){
                req.session.user_id = user.id;
                req.session.save(()=>{
                    res.redirect('/admin');
                })
            }else{
                res.redirect('/login?error=invalid')
            }
        })
        .catch((error)=> {
            console.log(error);
            res.redirect('/login?error=invalid');
        })
    },

    admin: (req, res) => {
        res.render('./admin/admin')
    },
}