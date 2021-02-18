const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Permet de lire du json. Ne pas oublier d'avoir le header Content-Type avec comme valeur application/json
//https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type

const {
	listAllUsers,
	createNewUser,
	showUser,
	updateUser,
	deleteUser,
} = require('./users');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/users', listAllUsers);
app.post('/users', createNewUser);
app.get('/users/:userId', showUser);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);

app.listen(8000, function() {
	console.log(`server listening on 8000`);
});
