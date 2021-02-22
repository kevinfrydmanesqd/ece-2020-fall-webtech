const level = require('level'); //import de level

//configuration des dossiers de la base de données en fonction de l'environnement
const path = `${__dirname}/${process.env.NODE_ENV === 'testing' ? 'db_test' : 'db'}`;
const db = level(path);

module.exports = db; //on export db pour pouvoir l'utiliser partout où on aurait besoin
