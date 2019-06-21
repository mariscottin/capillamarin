const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    
    login: (req, res) => {
        req.session.destroy();
        res.render('./admin/login', {error: req.query.error});
    },


    validate: (req, res) => {
        knex('users').where('username', req.body.username).then((results)=>{
            let user = results[0];
            console.log(user.hash);
            console.log(req.body.hash);
            const isValid = bcrypt.compareSync(req.body.hash, user.hash);
            console.log(isValid);
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
    },

    admin: (req, res) => {
        res.render('./admin/admin')
    },

    //CREATE NEW USER USING POSTMAN
    //DELETE ON PRODUCTIONs
    register: (req, res) => {
        const {username, first_name, last_name, email, password} = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                knex('users').insert({
                    username,
                    first_name,
                    last_name,
                    email,
                    hash
                })
                .then(()=> res.redirect('/'))
                .catch(err=> console.log(err))
            });
        });
        
    }
}