const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //Permet de lire du json. Ne pas oublier d'avoir le header Content-Type avec comme valeur application/json
//https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type

//Routes
app.get('/', (req, res) => {
    res.send([
        "<h1>E'Chat</h1>"
    ].join(''));
});

const channelRoutes = require('./app/routes/channel');

app.use('/api/v1/channels', channelRoutes);

module.exports = app;
