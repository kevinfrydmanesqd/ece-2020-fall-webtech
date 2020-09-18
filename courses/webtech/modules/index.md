
# Node.js introduction

## About this course

You will use / do :

* Node.JS & NPM or yarn
* React and web UI
* Git & DevOps
* Unit tests & Travis CI
* Use frameworks & transpilers
* Embed a NoSQL storage (LevelDB)
* Read the doc, search and leverage Open Source

## About this course

Evaluation :

* Participation
* Build a project
* QCM at the end of the course

## In this module

* Part 1: Node.js
  * Creating "Hello world" project
  * Creating HTTP server
  * Routing with query parameters
  
* Part 2: Dependency managment in Node.js
  * Node.js modules
  * Packages
  * Using Nodemon utility

## JavaScript

* Developed in 1995 at NetScape
* Shipped with IE3 in 1996 as JScript
* Standardized with EcmaScript (ES) v1 in 1997   
  https://en.wikipedia.org/wiki/ECMAScript
* No relation to Java
* Rediscovered with Ajax around 2005 (Gmail, Maps…)
* Multi-paradigm : scripting, object-oriented, functional, imperative, event-driven
* One of the most popular languages today
* Fast

## Node.JS

* JavaScript runtime for server-side scripting   
  https://nodejs.org/en/
* Created in 2009 by Ryan Dahl, now working on Deno   
  https://deno.land/
* Uses Google's V8 JavaScript Engine   
  https://v8.dev/
* Package management using NPM   
  https://www.npmjs.com/
* Asynchronous IO
* Unix philosophy of small components

## Hello world !

```javascript
// Import a module
const http = require('http')

// Declare an http server
http.createServer(function (req, res) {

  // Write a response header
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Write a response content
  res.end('Hello World\n');

// Start the server
}).listen(8080)

// curl localhost:8080 or go to http://localhost:8080
```

## Callback functions 

* What makes JavaScript and NodeJS asynchronous 

```javascript
const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}

const server = http.createServer(serverHandle);
server.listen(8080)
```

## Sending back HTML

* Change the content type & response content

```javascript
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World !</p>' +
'    </body>' +
'</html>'

const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
```

## Routing

* Define endpoints to serve multiple pages 
* A route = an url [+ parameters] + a handler
* Use node's `url` module to parse `req.url`

## Get the current path 

```javascript 
// Import Node url module
const url = require('url')

const serverHandle = function (req, res) {
  // Retrieve and print the current path
  const path = url.parse(req.url).pathname;
  console.log(path);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
```

## Query parameters

* Web URL can be enriched with query parameters
* After the `?`
* Separated by `&`
* Formatted as `key=value`
```
http://my.site/my/page.html?username=toto&password=lulu
```
* Parseable with node's `querystring` module on url's query property

## Get query parameters

```javascript 
const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
  // Retrieve and print the queryParams
  const queryParams = qs.parse(url.parse(req.url).query);
  console.log(queryParams);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(content);
  res.end();
}
```

## Basic routing example

```javascript 
const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (path === '/hello' && 'name' in params) {
    res.write('Hello ' + params['name'])
  } else {
    res.write('Hello anonymous')
  }
  
  res.end();
}
```

## Work
  
* Create a basic app with three routes:   
  * `/` explains how `/hello` works 
  * `/hello` takes a `name` query parameter and 
    * random names replies `hello [name]`
    * your own name replies with a short intro of yourself
    * any other replies a 404 code with a not found message

## Dependency managment in Node.js

## What is a Node.js module ?

* What we call a library in other languages 
* One or more `.js` files doing something
* Module content is "exported"

## Creating Modules

* Use
  ```javascript
  module.exports = ...
  ```
* Export anything: a function, an array, an object...
  ```javascript
  // for an object
  module.exports = {
    a: ...,
    b: ...
  } 
  // or 
  module.exports.a = ...
  module.exports.b = ...
  ```
* Import in another file: (NB: **no extension**)
  ```javascript
  const my_mod = require('/path/to/my_file')
  ```

## Let's create a module !

```javascript
// ./handles.js
// Necessary imports
module.exports = {
  serverHandle: function (req, res) {...} 
}
```                         
```javascript 
// ./index.js
const http = require('http')
const handles = require('./handles')
const server = http.createServer(handles.serverHandle);
server.listen(8080)
```

## Dependency Management

* Download and install existing packages 
* State versions used by your app
* Not reinvent the wheel
* Participate to the community

## NPM 

* Package manager for Node.JS
* Developed by Isaac Z. Schlueter
* Upload, share & download packages
* Two modes: global & local
* Modules: system I/O, networking, cryptography, framework, …
* [npmjs.com](http://npmjs.com)

## yarn

* Alternative package manager for Node.JS
* Developed & open-sourced by Facebook
* Introduced novelties recuperated by NPM v4 & 5
* Equivalent nowadays

## Install dependencies

* Add using NPM / yarn / package.json (manual)
* Specify version
* Install locally / globally

```shell
npm i[nstall] [--save] [--save-dev] [-g] package_name
yarn add package_name [--dev]
```

* Installation location: node_modules

## Module declaration

`package.json`: stores a module's informations

* `name`, `description`, `version`, `license` and `private`
* `dependencies` and `devDependencies`
* scripts and commands
```json
{
  "name": "ece-ast",
  "description": "NodeJS project for ECE class",
  "version": "0.1.0",
  "license": "UNLICENSED",
  "private": true,
  "dependencies": {},
  "devDependencies": {}
}
```

[package.json documentation](https://docs.npmjs.com/files/package.json)

## Module declaration

Interactive `package.json` creation with 

```shell
npm init
yarn init
```

[package.json doc](https://docs.npmjs.com/files/package.json)

## Dependencies declaration

* dependencies: necessary to make your app run   
  ```js
  { "dependencies": {
    "foo": "1.0.0", // Version 1.0.0 exactly
    "bar": ">1.0.0", // Any superior to 1.0.0
    "baz": "1.2.x", // Any 1.2 version
    "boo": "owner/repo", // The github project repo from owner
    "asd": "[git url]", // The module in given repo
    "local": "file:/path/to/file",
    "tar": "http://web.site/my.tar.gz"
  }}
  ```
* devDependencies: test runners, doc framework, ...

[package.json doc](https://docs.npmjs.com/files/package.json)

## Versioning with Semver

* [Semantic Versionning](https://semver.org/)
* Version X.Y.Z
  - X = Major, breaking changes
  - Y = Minor, new features and backward compatible 
  - Z = Patch, bug fixing
* Version 0.Y.Z = unitial dev, unstable

## Deterministic Installs: lock file

* `package-lock.json` for NPM 
* `yarn.lock` for yarn
* Fixes dependency versions
* Avoids the "but it works on my computer!" situation

## Nodemon

## What is it ?

* A simple utility
* Watches your development files
* Restarts the server on saving

## How to use it ?

```shell
npm i --save nodemon
# or
yarn add nodemon
# then 
./node_modules/.bin/nodemon main.js
```

Or add this to package.json:

```json
"scripts": {
  "dev": "./node_modules/.bin/nodemon "
}
```
and then:
```shell
npm run dev app.js
```

## Presenting your work: `readme.md`

* Written in Markdown
* Should contain:
  * Short introduction
  * Installation instructions 
  * Usage instruction with simple (and advanced) examples
  * List of contributors

[Markdown documentation](https://daringfireball.net/projects/markdown/syntax)

[How to write README](https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9)

## Work
  
* You should have an `index.js` file with the server creation and `handles.js` defining the server's callback
* Add a `package.json` file with you module declaration
* Add a `readme.md` file with title, introduction, run instructions and your name
* Push it all to a GitLab / GitHub repository and send a link to your repository to sergei@adaltas.com
