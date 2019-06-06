const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/session.js')(app);

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));


const routes_setter = require('./config/routes.js');
routes_setter(app);


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})