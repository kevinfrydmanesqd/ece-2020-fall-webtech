
## Up until now

- NodeJS: simple HTTP server with your modules
- NPM to manage our application and modules
- ExpressJS:
  - Handle routing
  - Manage user auth and sessions with middlewares
  - Expose static content to display in a browser
- Transpilers to ease writing and reading code
- LevelDB to store the data
- ...

And also a set of best-practices and other tools to enhance the developer’s experience

## Final project

* Using the code from class

* Simple dashboard app :
  * User login
  * A user can insert metrics
  * A user can retrieve his metrics in a graph
  * A user can only access his own metrics
* See [PROJECT.md](../PROJECT.md)

## What's "production" ?

When your code is running in the final target environment e.g. your website is accessible to the public. It is not a final state, it will receive updates.

## Production considerations

- Running an app 
- Environment variables / Application arguments 
- Error handling 
- Security

## Running an app 

- Hosting platform: Google Cloud, DigitalOcean, AWS, Azure, ...
- Docker container

## Environment variables

`process.env.[VAR_NAME]`

- `NODE_ENV` -> production / development 
- ...

linux & mac: `export NODE_ENV=production`
windows: `$env:NODE_ENV = 'production'`

Example:
```
var dbDir = process.env.NODE_ENV == 'production' ? './db' : './db_test' ;
```

Use [dotenv](https://www.npmjs.com/package/dotenv) module to ease the use of env variables

## Application arguments 

`process.argv`

Try to print them like:
```
console.log(process.argv)
```

- Parsers: [argparse](http://nodeca.github.io/argparse/), [yargs](http://yargs.js.org), [parameters](https://github.com/adaltas/node-parameters)

## Error handling 

- An error can be wrapped in an `Error` object 
- Once thrown (`throw new Error("...")`) it becomes an Exception
- Exceptions can be caught like in any other language 
- In dev: [`errorhandler`](https://www.npmjs.com/package/errorhandler) module

```
var errorhandler = require('errorhandler')
var app = express()
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}
```
Lots of documentation on the subject, for ex: https://www.joyent.com/node-js/production/design/errors

## Security: HTTPS

```
import https = require('https')
import fs = require('fs')
import app = require('express')()

# prepare express app...

const options = {
  key: fs.readFileSync path_to_key,
  cert: fs.readFileSync path_to_cert
}

https.createServer(options, app).listen(port,  (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})
```

## Security: Others

- Hosting server 
- DB: access, stored pwd, ...
- User sessions
- !! *Nothing in front JS is secure* !!
- Beware of what you git (logins, api keys, tokens, ...)

## What else can you do with Node.JS ?

- Desktop apps with [electron](http://electronjs.org) (ex: Atom !) 
- CLIs / automation (ex: [`rimraf`](https://github.com/isaacs/rimraf) or Adaltas' [`nikita`](https://github.com/adaltas/node-nikita) )

## Some best practicies

- Always check for errors in callbacks
- Specify a start and test scripts (and many more, ex. `npm run populate`)
- Structure your code base
  ```
  - db
  - src 
  -- controllers
  --- metrics.ts
  --- ...
  -- routes
  --- metrics.ts
  --- ...
  -- views
  --- ...
  -- server.ts
  -- ...
  - tests
  - ...
  ```
