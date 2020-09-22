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
