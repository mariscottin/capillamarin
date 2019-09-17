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
      //POSTS
      allPosts: (req, res)=>{
          let page = req.params.page;
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
                let pagesAmount = Math.ceil((results.length)/10)
                let fromPost = (page-1)*10;
                let toPost = fromPost + 10;
                results = results.slice(fromPost, toPost);                
                res.render('./admin/all_posts', {posts: results, alert: req.query.alert, error: req.query.error, pages: pagesAmount, currentPage: page});
            })
            .catch(err => res.status(400).send('error getting posts: ' + err))
    },

    redirectToAllPosts: (req, res) => {
        res.redirect('/admin/posts/1');
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
                const fileName = `/${timestamp}-lg`;
                const data = await uploadFile(buffer, fileName, type);
                knex('posts').insert(
                    {
                    title: fieldsTitle,
                    body: fieldsBody,
                    img_url: data.Location,
                    user_id: 2, //Hardcoded
                    date: new Date(),
                    section: fieldsSection,
                    img_path: path,
                    aws_key: data.Key
                    })
                    .then(() => console.log('sent!'))
                    .catch(err=> console.log('could not add post: ' + err))
                return response.status(200).send(data)
            } catch (error) {
                return response.status(400).send(error);
            }
        })

    },

    delete: (req, res)=> {
        knex('posts').where('id', req.params.id)
        .then((knexData) => {
            /* The following example deletes an object from an S3 bucket. */
            var par = {
                Bucket: process.env.S3_BUCKET,
                Key: knexData[0].aws_key
            };
            s3.deleteObject(par, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
                /*
                data = {
                }
                */
            });
        })
        knex('posts').where('id', req.params.id).del()
        .then(res.redirect('/admin/posts/1?alert=Novedad%20eliminada%20con%20exito'))
        .catch(err => console.log(err))
    },

    editShow: (req, res)=> {
        knex('posts').where('id', req.params.id)
        .then((result) => {
            res.render('./admin/edit_post', {post: result[0]});
        })
    },

    edit: (req, res)=> {
        console.log(req.body.section)
        if(req.body.section !== "default" && req.body.title !== "" && req.body.body !== "" ) {
            knex('posts').where('id', req.params.id).update({
                section: req.body.section,
                title: req.body.title,
                body: req.body.body
            })
            .then(()=> res.redirect('/admin/posts/1?alert=Novedad%20editada%20con%20exito'))
        }
        else{
            res.redirect('/admin/posts/1?error=Error%20editando%20novedad.%20Por%20favor%20intentar%20de%20nuevo.');
        }
    },

    //AUDIOS
    allAudios: (req, res) => {
        let page = req.params.page;
        knex('audios').orderBy('created_at', 'DESC')
            .then(results => {
                results.forEach(audio => {
                    let date = audio.date.substr(0, 10);
                    let time = audio.date.substr(11, 5);

                    audio.date = date;
                    audio.time = time;
                })
                let pagesAmount = Math.ceil((results.length) / 10)
                let fromAudio = (page - 1) * 10;
                let toAudio = fromAudio + 10;
                results = results.slice(fromAudio, toAudio);
                res.render('./admin/all_audios', { audios: results, alert: req.query.alert, error: req.query.error, pages: pagesAmount, currentPage: page });
            })
            .catch(err => res.status(400).send('error getting audios: ' + err))
    },

    redirectToAllAudios: (req, res) => {
        res.redirect('/admin/homilias/1');
    },

    newAudio: (req, res) => {
        res.render('./admin/new_audio');
    },

    // Define POST route
    createAudio: (request, response) => {
        const form = new multiparty.Form();    
          form.parse(request, async (error, fields, files) => {
            if (error) throw new Error(error);
            try {
                const path = files.fileName[0].path;
                const fieldsTitle = fields.title[0];
                const buffer = fs.readFileSync(path);
                const type = fileType(buffer);
                const timestamp = Date.now().toString();
                const fileName = `/${timestamp}-lg`;
                const data = await uploadFile(buffer, fileName, type);
                knex('audios').insert(
                    {
                    title: fieldsTitle,
                    audio_url: data.Location,
                    user_id: 2, //Hardcoded
                    date: new Date(),
                    audio_path: path,
                    aws_key: data.Key
                    })
                    .then(() => console.log('sent!'))
                    .catch(err=> console.log('could not add audio: ' + err))
                return response.status(200).send(data)
            } catch (error) {
                return response.status(400).send(error);
            }
        })

    }
}