---
date: 2020-10-22
duration: 3 hours
---

# Express.js

The course will introduce Node.JS frameworks and focus on ExpressJS to write a web application that exposes REST services and renders HTML pages.

## What is ExpressJS ?

* Minimalist framework for NodeJS apps
* Provides features for web app development
* Create robust APIs
* Functions to expose a front end

[ExpressJS guide](https://expressjs.com/en/guide/routing.html)

## Create a basic server

* Manually: use `node-http`
* With express:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8000, function() {
  console.log(`server listening on 8000`);
});
```

## JSON Response

Dans le cadre de notre service Web, il n’est pas très intéressant de retourner un simple texte car nous ne voulons pas avoir une interface graphique mais plutôt échanger de la donnée. Pour cela, nous allons donc utiliser le format texte JSON dans les réponses des actions. Heureusement, Javascript permet une implémentation très simple de ce genre de réponse :

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const response = {
    message: 'Hello World!',
  };

  res.send(JSON.stringify(response));
  //Vous pouvez aussi faire à la place de la ligne précedente : return res.status(200).json(response);
});

app.listen(8000, function() {
  console.log(`server listening on 8000`);
});
```

## Routes statiques

Comme vu précédemment, il est possible d’associer une fonction à une route afin d’effectuer différentes actions en fonction de l’URL. Pour cela, nous allons tout d’abord mettre en place plusieurs routes qui seront statiques :

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const response = {
    message: 'Hello World!',
  };

  res.send(JSON.stringify(response));
});

app.get('/users', function(req, res) {
  const users = [
    {
       id: '1234',
       name: 'user1',
    },
    {
      id: '1234',
      name: 'user1',
    },
  ];
  
  return res.status(200).json(users);
});

app.listen(8000, function() {
  console.log(`server listening on 8000`);
});
```

## Routes dynamiques

Dans le cadre d’un service Web, il est très peu intéressant d’avoir des routes statiques car la requête à faire pour le service se trouve dans l’URL et donc cet URL change en permanence.
C’est donc pour cela qu’est utilisé le principe de paramètre de routage ​qui représente une variable de routage dans l’URL. Ce paramètre est indiqué dans la route avec “:”.

```javascript
app.get('/users/:id', function(req, res) {
  const userId = req.params.id;
  
  return res.status(200).json(userId);
});
```

Ici nous avons créé un paramètre id dans la route, il sera disponible dans l’objet req.params. Exemple: http://localhost:8000/users/420
Remarque sur la propriété de l'objet "params" : 
Dans cet exemple, on a fait params.id car on a écrit "/:id". Si on avait écrit "/:userId", il aurait fallu faire req.params.userId.

La variable sera d'ailleurs au format string.

## Conditions de routes

Afin de mieux paramétrer les routes, il est possible de mettre en place des conditions sur les variables de routage afin que l’action ne soit qu’appeler si l’URL remplit ces conditions. Nous aborderons différents paramétrage de conditions :

Les expressions régulières sont un moyen très utile d’extraire de l’information dans du texte. Si vous souhaitez en apprendre plus, je vous invite à lire ​https://regexone.com/​ (en anglais). Par la suite, les expressions régulières qui vous seront présentées seront expliquées.
Afin de blinder un paramètre de routage en tant que chiffre, il est possible de faire ceci avec les expressions régulières:

```javascript
app.get('/users/:id(\\d+)', function(req, res) {
  const userId = req.params.id;
  
  return res.status(200).json(userId);
});
```

## Méthode HTTP

```javascript
app.get('/', function (req, res) {
  // GET
});

app.post('/', (req, res) => {
  // POST
});

app.put('/', function (req, res) {
    // PUT
});
app.delete('/', (req, res) => {
    // DELETE
});
```

## Postman

* Dashboard to test your API
* Simulate HTTP request
* Specify custom body & headers
* [getpostman.com](http://getpostman.com)

## Other tools for testing API

* [Swagger Inspector](https://inspector.swagger.io)
* `curl` bush command:
```shell
curl 
```

## Transmettre des données au format JSON

Sur Postman, vous devez régler le header Content-Type : application/json

Vous devez installer une lib supplémentaire : body-parser

Il permet d'analyser et de parser pour vous les paramètres transmis dans un POST, PUT
C'est le premier middleware que vous allez installer !

```shell
npm install --save body-parser
```

Ensuite ajoutez les lignes suivantes dans votre code juste après avoir déclarer express :

```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

```javascript
app.post('/users', (req, res) => {
  const body = req.body;

  return res.status(201).json(body);
});
```
