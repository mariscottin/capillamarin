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
    console.log('got to uploadFile!!');
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

    new: (req, res) => {
        res.render('./admin/new_audio');
    },

    // Define POST route
    create: (request, response) => {
        const form = new multiparty.Form();    
          form.parse(request, async (error, fields, files) => {
            console.log(form)
            if (error) throw new Error(error);
            try {
                const path = files.fileName[0].path;
                const fieldsTitle = fields.title[0];
                const buffer = fs.readFileSync(path);
                const type = fileType(buffer);
                const timestamp = Date.now().toString();
                const fileName = `/${timestamp}-lg`;
                const data = await uploadFile(buffer, fileName, type);
                console.log(data);
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