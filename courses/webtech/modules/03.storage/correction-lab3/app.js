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

const channelRoutes = require('./app/routes/channel_routes');
const userRoutes = require('./app/routes/user_routes');
const messageRoutes = require('./app/routes/message_routes');

app.use('/api/v1/channels', channelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', messageRoutes);

module.exports = app;
