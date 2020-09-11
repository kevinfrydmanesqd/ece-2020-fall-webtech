
## About this course

* You will use / do :
  * JavaScript / TypeScript & Markdown
  * Node.JS & NPM or yarn
  * Git & Github / GitLab
  * Unit tests & Travis CI
  * Use a framework & transpiler
  * Use a storage (LevelDB)
  * Read the doc ! Ask Google !
* You will apprehend tools of the Open Source

## About this course

* Evaluation :
  * Continuous using Git
  * Simple project at the end of the course
* Planning: [CALENDAR.md](../CALENDAR.md)

## Final project

* Based on code from class
* Using presented technologies
* Simple dashboard app :
  * User login
  * A user can insert simple metrics
  * A user can retrieve his metrics displayed nicely in a graph
  * A user can only access his own metrics
* See [PROJECT.md](../PROJECT.md)

## Recap

* Tools & concepts for web development
  * Client / sever concepts
  * HTTP requests
  * Terminal
  * NodeJS and NPM
  * Git & Github
  * ...
* What’s JS & NodeJS
* How do you setup a NodeJS server with basic routing
* What’s a package? How is it made?

## Summary

* Part 1: ExpressJS (framework)
  - REST API
  - Postman (tool)
  - Create 
* Part 2: TypeScript and transpilation

##  Part 1: ExpressJS 

## What is ExpressJS ?

* Minimalist framework for NodeJS apps
* Provides features for web app development
* Create robust APIs
* Functions to expose a front end

[ExpressJS guide](https://expressjs.com/en/guide/routing.html)

## What’s an API ?

* Application Programming Interface
* In web: REST
  * Expose a set of HTTP routes
  * Use HTTP verbs (GET / POST / PUT / DELETE)
  * Client connects to communicate
  * Usually communicating in JSON
  
REST API example: https://petstore.swagger.io/

## How to use an API ?

* Combination of two sides:
  * Back-end: rest api
  * Front-end: web pages w/ JS, mobile app, …
* ExpressJS brings both for the web !

## Create a basic server

* Manually: use `node-http`
* With express:

```javascript
express = require('express')
app = express()

app.set('port', 1337)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)
```

## Routing

* Manually: parse the url and apply corresponding logic
* With Express:

```javascript
app.get('/', function (req, res) {
  // GET
})

app.post('/', (req, res) => {
  // POST
})

app
  .put('/', function (req, res) {
    // PUT
  })
  .delete('/', (req, res) => {
    // DELETE
  })
```

## Routing

You can add parameters in the routes :

```javascript
app.get(
  '/hello/:name', 
  (req, res) => res.send("Hello " + req.params.name)
)
```

## Prepare a quick front end

* Install package `ejs` - [read docs ejs.co](https://ejs.co/)
* Create a `view/` directory
* Create a `hello.ejs` file in it:

```html
<h1>Hello <%= name %></h1>
<p>Welcome to our humble application</p>
```

## Prepare a front end

Tell express to expose our views with ejs templating:

```javascript
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
```

Render our index on `/hello/:name`:

```javascript
app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)
```

## Make it sexy !

* Expose static content (JS, CSS, Images, …)
* Download bootstrap [getbootstrap.com/getting-started/#download](http://getbootstrap.com/getting-started/#download)
* Download JQuery [code.jquery.com/jquery-3.4.1.min.js](https://code.jquery.com/jquery-3.4.1.min.js)
* Add the css in public/css and the js in public/js

## Make it sexy !

* In `index.js`
```js
path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
```
* Put JQuery & bootstrap files in `public/js` and `public/css`
* In a `views/partials/head.ejs` file:

```html
<meta charset="UTF-8">
<title>ECE AST</title>

<link rel="stylesheet" href="/css/bootstrap.min.css">
<style>
    body    { padding-top:50px; }
</style>

<script src="/js/jquery-2.1.4.min.js"></script>
<script src="/js/bootstrap.min.js" /></script>
```

## Make it sexy !

* In `views/hello.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <% include partials/head %>
  </head>
  <body class="container">
    <h1>Hello <%= name %></h1>
    <p>Welcome to our humble application</p>
  </body>
</html>
```

## Let’s bring some AJAX

* Technologies used to dynamically update static pages
* Use JS embedded in HTML
* Get data from a server
* Update page without reloading

## Create dummy data

* Prepare the data on the back-end
* Let’s create a new module called `metrics.js`:

```js
module.exports = {
  get: (callback) => {
    callback(null, [
      { timestamp: new Date('2013-11-04 14:00 UTC').getTime(), value:12}
    , { timestamp: new Date('2013-11-04 14:30 UTC').getTime(), value:15}
    ])
  }
}
```

## Create dummy data

* Expose the metrics on the back-end

```javascript
app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})
```

## And get it on the front !

* In our `hello.ejs`

```html
<body class="container">
  <div class="col-md-6 col-md-offset-3">
    <h1>Hello <%= name %></h1>
    <button class="btn btn-success" id="show-metrics">
      Bring the metrics
    </button>
    <div id="metrics"></div>
  </div>
</body>
```

## And get it on the front !

* And after the end of the body between script tags:

```js
$('#show-metrics').click((e) => {
  e.preventDefault();
  $.getJSON("/metrics.json", {}, (data) => {
    const content = data.map(d => {
      return '<p>timestamp: '+d.timestamp+', value: '+d.value+'</p>';
    })
    $('#metrics').append(content.join("\n"));
  });
})
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

## Work of Part 1

* Using the code and repo from last module, convert everything to use `express` 
instead of doing routing and server setup manually. You should have:
  - `/` home page with description 
  - `/hello` page with the button and AJAX request for obtaining metrics

## Part 2: TypeScript and transpilation

## Compiler & transpiler

* Compile: transforming a source code written in a language A (source language) to a language B (target language)
* Transpile (or transcompile): a source-to-source compilation, meaning that the source language and the target language are of the same level (cf: high/low level of programming languages)
* A transpiler **is** a compiler

## Why

* Enhance code quality and readability
* Accelerate programming
* Change strong/weak typing (eg: TypeScript)
* Change programmation paradigm
* Add fancy features (eg: Babel, CoffeeScript)

## Why

* Enhance code quality and readability
* Accelerate programming

JavaScript:
```js
function checkAllMyArgsAgain(check, me, please) {
  if (check && me && please) {
    if (check instanceof CheckObject) {
      console.log('Yippee!');
    } else {
      console.log('Exception again...')
    }
    if (me) { } // And so on...
  }
}
```

## Why

* Enhance code quality and readability
* Accelerate programming

TypeScript:
```js
function checkAllMyArgsAgain(
  check: CheckObject,
  me: MeObject,
  please: string
): string {
    return 'What is the argument check?';
}
```

## In web technologies

* Development speed is very important
* No impact on execution speed
* Allow a pretty, clean, commented source code
* Compiles into size-optimized files

## TypeScript

## TypeScript

* Javascript transpiler
* Quick learning
* Adds optional typing to JS
* New JS features from EcmaScript

Doc: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/home.html)  
Resource: [basarat.gitbooks.io/typescript](https://basarat.gitbooks.io/typescript/docs/why-typescript.html)

## Typing

Two types
* Implicit
```js
var foo = 123; // TypeScript infers `number`
foo = '456'; // Error: cannot assign `string` to `number`
```
NB: this code will emit an error but still output JavaScript

* Explicit
```js
var foo: number = '123'; // Error: cannot assign a `string` to a `number`
```

## Duck Typing 

*"If it walks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck."*

* Typed objects only need to have method/attributes

```js
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({ x: 0 }); // Error: missing information `y`
```

## TypeScript Setup

* Install `typescript` as a dev dependency
```bash
npm install typescript --save-dev
```
* Run `./node_modules/.bin/tsc --init`
* Convert your `.js` files to `.ts` manualy

## tsconfig.json

* Presence declares a TypeScript project 
* Specifies how to compile

## tsconfig.json
    
* Move all your JS files to an `src/` directory
* Add the following lines to the root object:

```JSON
"compilerOptions": {
    ...,
    "outDir": "./dist",
    "moduleResolution": "node"
},
"include": [
    "src/**/*"
],
"exclude": [
    "node_modules",
    "**/*.spec.ts"
]
```
```shell
./node_modules/.bin/tsc 
## or 
./node_modules/.bin/tsc -p tsconfig.json
```

## Automating build

* Through IDE, with `tsconfig.json`
```json
"compileOnSave": true,
```
* Through `package.json` and `npm run build`
```json
...
"scripts": {
  "build": "./node_modules/.bin/tsc -p tsconfig.json"
}
...
```

## Dev setup

* Install `nodemon` & `ts-node` as dev dependencies
* Create a `nodemon.json` file with content:
```json
{
  "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"],
  "watch": ["src"],
  "exec": "npm start", 
  "ext": "ts"
}
```
* Enrich `package.json`
```json
"scripts": {
  "start": "./node_modules/.bin/ts-node src/server.ts",
  "dev": "./node_modules/.bin/nodemon "
}
```

## TS with Node.JS 

* Add dependencies types:           
```shell
npm i --save-dev @types/node @types/express
```
* In a `src/server.ts` file: 

```javascript
import express = require('express')

const app = express()
const port: string = process.env.PORT || '8080'

app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
```

## TS with Node.JS

* In a `src/metrics.ts` file: 

```javascript
export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {
  static get(callback: (error: Error | null, result?: Metric[]) => void) {
    const result = [
      new Metric('2013-11-04 14:00 UTC', 12),
      new Metric('2013-11-04 14:30 UTC', 15)
    ]
    callback(null, result)
  }
}
```

## TS with Node.JS

* In the `src/server.ts` file: 
```javascript
import { MetricsHandler } from './metrics'
app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
})
```

## Questions ?

## Work of Part 2

* Add to `src/server.ts` the code to expose the front that we had previously
in the `index.js`. You should have:
  - `/` home page with description 
  - `/hello` page with the button and AJAX request for obtaining metrics
