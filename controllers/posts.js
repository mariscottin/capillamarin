const knex = require('../db/knex');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };

  
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

    // Define POST route
    create: (request, response) => {
        const form = new multiparty.Form();    
          form.parse(request, async (error, fields, files) => {
            if (error) throw new Error(error);
            try {
                const path = files.fileName[0].path;
                const fieldsTitle = fields.title[0];
                const fieldsBody = fields.body[0];
                const fieldsSection = fields.section[0];
                const buffer = fs.readFileSync(path);
                const type = fileType(buffer);
                const timestamp = Date.now().toString();
                const fileName = `bucketFolder/${timestamp}-lg`;
                const data = await uploadFile(buffer, fileName, type);
                knex('posts').insert(
                    {
                    title: fieldsTitle,
                    body: fieldsBody,
                    img_url: data.Location,
                    user_id: 2, //Hardcoded
                    date: new Date(),
                    section: fieldsSection
                    })
                    .then(() => console.log('sent!'))
                    .catch(err=> console.log('could not add post: ' + err))
                return response.status(400).send(data)
            } catch (error) {
                return response.status(400).send(error);
            }
        })

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