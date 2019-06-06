const knex = require('../db/knex');
const multiparty = require('multiparty');


module.exports = {
    allPosts: (req, res)=>{
        knex('posts').orderBy('created_at', 'DESC')
            .then(results => {
                results.forEach(post => {
                    if(post.body.length > 80) {
                        shortPost = post.body.substr(0, 80);
                        post.body = shortPost + '...';
                    }
                    let date = post.date.substr(0, 10);
                    let time = post.date.substr(11, 5);
                    
                    post.date = date;
                    post.time = time;
                })
                res.render('./admin/all_posts', {posts: results, alert: req.query.alert});
            })
            .catch(err => res.status(400).send('error getting posts: ' + err))
    },

    new: (req, res)=>{
        res.render('./admin/new_post');
    },

    create: (req, res)=>{
        // const form = new multiparty.Form();
        console.log(req);
        console.log(form);
        knex('posts').insert({
            title: req.body.title,
            body: req.body.body,
            img_url: req.body.img_url,
            user_id: 1, //Hardcoded
            date: new Date()

        })
        .then(() => res.redirect('/admin/posts?alert=Novedad%20creada%20con%20exito'))
        .catch(err=> console.log('could not add post: ' + err))
    },

    delete: (req, res)=> {
        knex('posts').where('id', req.params.id).del()
        .then(()=> res.redirect('/admin/posts?alert=Novedad%20eliminada%20con%20exito'))
    },

    editShow: (req, res)=> {
        knex('posts').where('id', req.params.id)
        .then((result) => {
            res.render('./admin/edit_post', {post: result[0]});
        })
    },

    edit: (req, res)=> {
        knex('posts').where('id', req.params.id).update({
            title: req.body.title,
            img_url: req.body.img_url,
            body: req.body.body
        })
        .then(()=> res.redirect('/admin/posts?alert=Novedad%20editada%20con%20exito'))
    }
}