
const db = require('./db') //import de notre module db. db est un objet contenat différentes propriétés implémentées dans le module
const express = require('express') //import de express
const app = express() //lancement de express

app.use(require('body-parser').json()) //cette bibliothèque nous permet de parser le body de la requête sous le format JSON. N'oubliez pas d'effectuer des requetes avec le header Content-Type avec comme valeur application/json
//Implémentation d'une route / par défaut
app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

//Lister tous les channels
app.get('/channels', async (req, res) => {
  const channels = await db.channels.list() //On appel la fonction list de notre module "db" qui va nous retourner tous les channels stockés en base de données
  res.json(channels) //On renvoie du json en sortie
})

//Créer un channel
app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel) //petite spécificité ici, on précise le status code 201. Pour apprendre plus sur les status code : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
})

//Syntaxe async/await : https://blog.engineering.publicissapient.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/

//Voir un channel
app.get('/channels/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

//Modifier un channel
app.put('/channels/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})

//Add missing routes here...

module.exports = app
