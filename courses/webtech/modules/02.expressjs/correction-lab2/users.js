const crypto = require('crypto');

//Notre tableau d'utilisateurs global
const users = [
	{
		id: '123',
		name: 'user1',
	},
	{
		id: '1234',
		name: 'user2',
	}
];

const findUser = userId => users.find(user => user.id === userId);

const listAllUsers = (req, res) => res.status(200).json(users);

const createNewUser = (req, res) => {
	const {body: {name}} = req;

	//blindage pour vérifier que le nom est correctement donné
	if(! name) {
		return res.status(400).json({name: 'Name is required.'});
	}

	//Blindage à faire en supplément : vérifier que le nom est unique

	//on utilise crypto qui est une bibliothèque dispo dans l'api nodejs: https://nodejs.org/api/crypto.html
	const id = crypto.randomBytes(12).toString('hex');

	const user = {
		id,
		name,
	};

	//on insère l'objet utilisateur dans le taleau d'utilisateurs pour le "conserver"
	users.push(user);

	return res.status(200).json(user);
};

const showUser = (req, res) => {
	const userId = req.params.userId;

	//On cherche un utilisateur qui a cet id dans notre tableau
	const user = findUser(userId);

	//Si l'utilisateur n'a pas été trouvé
	if(!user) {
		return res.status(404).json({message: 'User not found'});
	}

	return res.status(200).json(user);
};

const updateUser = (req, res) => {
	const userId = req.params.userId;
	const {body: {name}} = req;

	//On cherche un utilisateur qui a cet id dans notre tableau
	const user = findUser(userId);

	//Si l'utilisateur n'a pas été trouvé
	if(!user) {
		return res.status(404).json({message: 'User not found'});
	}

	//blindage pour vérifier que le nom est correctement donné
	if(! name) {
		return res.status(400).json({name: 'Name is required.'});
	}

	//vu que ce n'est pas immutable, on peut le modifier directement...
	user.name = name;

	return res.status(200).json(user);
};

const deleteUser = (req, res) => {
	const userId = req.params.userId;

	//On cherche un utilisateur qui a cet id dans notre tableau
	const index = users.findIndex(user => user.id === userId);

	//Si l'utilisateur n'a pas été trouvé
	if(index < 0) {
		return res.status(404).json({message: 'User not found'});
	}

	//on le supprime grace à la méthode splice : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/splice
	users.splice(index, 1);

	return res.status(204).json();
};

module.exports = {
	listAllUsers,
	createNewUser,
	showUser,
	updateUser,
	deleteUser,
};
