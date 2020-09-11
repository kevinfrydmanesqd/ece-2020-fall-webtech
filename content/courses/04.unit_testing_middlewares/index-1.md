
## About this course

* You will use / do :
  * JavaScript / TypeScript & Markdown
  * Node.JS & NPM or yarn
  * Git & Github / GitLab
  * Unit tests & Travis CI
  * Use a framework & transpiler
  * Use LevelDB
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

## Middleware

## What is it ?

* Very vague term, multiple definition
* In our case :

*Middleware are functions that have access to the request and the next 
middleware function in the application’s request-response cycle*

## What is it ?

Middleware are functions that can:

  * Execute any code.
  * Make changes to request and response objects.
  * End the request-response cycle.
  * Call the next middleware function in the stack.
  
If the current middleware function does not end the request-response 
cycle, it must call next() to pass control to the next middleware 
function. Otherwise, the request will be left hanging.


## Middlewares

* Application-level: executed every time the app receives a request
* Router-level: executed on every route of the router
* Error-handling: four arguments instead of three, specifically with the signature `(err, req, res, next)`
* Third-party: add functionality to Express apps with node module

## Application-level

* Executed every time the app receives a request  

```javascript
import express = require('express')
const app = express()

app.use(function (req: any, res: any, next: any) {
  console.log(req.method + ' on ' req.url)
  next()
})

app.get('/', (req: any, res: any) => {
  res.send('hello world')
})

app.listen('8080', (err: Error) => {
  if (err) throw err
  console.log('server is listening on port 8080')
})
```

## Router-level

* Executed on every route of the router

```javascript
import express = require('express')
const app = express()
const router = express.Router()

router.use(function (req: any, res: any, next: any) {
  console.log('router: '  + req.method + ' on ' req.url)
  next()
})

router.get('/', (req: any, res: any) => {
  res.send('hello world')
})

app.use(router)

app.listen('8080', (err: Error) => {
  if (err) throw err
  console.log('server is listening on port 8080')
})
```

## Error-handling

* Four arguments instead of three

```javascript
import express = require('express')
const app = express()

app.use(function (err: Error, req: any, res: any, next: any) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen('8080', (err: Error) => {
  if (err) throw err
  console.log('server is listening on port 8080')
})
```

## Third-party

* Add functionality to Express apps with node module
* Install [`morgan`](https://github.com/expressjs/morgan) module

```javascript
import express = require('express')
import morgan = require('morgan')
const app = express()

app.use(morgan('dev'))

app.get('/', (req: any, res: any) => {
  res.send('hello world')
})

app.listen('8080', (err: Error) => {
  if (err) throw err
  console.log('server is listening on port 8080')
})
```

## What can we use it for ?

* Anything !
* Content validation / parsing
* Data completion
* User authentication / authorization
* Logging
* ...

## Some middlewares

* body-parser
* errorhandler
* cookie-parser
* morgan
* ...

[Exhaustive list](http://expressjs.com/en/resources/middleware.html), use the ones you find useful !
[Express doc on middlewares](http://expressjs.com/en/guide/using-middleware.html)

## Let's setup authentication

* We'll need :
  * User CRUD (Create Read Update Delete)
  * DB persistance
  * User sessions
  * User auth
  * Authorization middleware
  * Login pages
* We could also use [PassportJS](http://passportjs.org/)

### User CRUD part 1

In a `src/user.ts` file:

```Javascript
export class User {
  public username: string
  public email: string
  private password: string = ""

  constructor(username: string, email: string, password: string, passwordHashed: boolean = false) {
    this.username = username
    this.email = email

    if (!passwordHashed) {
      this.setPassword(password)
    } else this.password = password
  }
  
  ...
```

### User CRUD part 1

In a `src/user.ts` file:

```Javascript
...
  static fromDb(username: string, value: any): User {
    const [password, email] = value.split(":")
    return new User(username, email, password)
  }

  public setPassword(toSet: string): void {
    // Hash and set password
  }

  public getPassword(): string {
    return this.password
  }

  public validatePassword(toValidate: String): boolean {
    // return comparison with hashed password
  }
}
```

### User CRUD part 2

In a `src/user.ts` file:

```Javascript
import { LevelDB } from "./leveldb"
import WriteStream from 'level-ws'

export class UserHandler {
  public db: any

  public get(username: string, callback: (err: Error | null, result?: User) => void) {
    this.db.get(`user:${username}`, function (err: Error, data: any) {
      if (err) callback(err)
      else if (data === undefined) callback(null, data)
      callback(null, User.fromDb(username, data))
    })
  }

  public save(user: User, callback: (err: Error | null) => void) {
    this.db.put(`user:${user.username}`, `${user.getPassword}:${user.email}`, (err: Error | null) => {
      callback(err)
    })
  }
  
  public delete(username: string, callback: (err: Error | null) => void) {
    // TODO
  }

  constructor(path: string) {
    this.db = LevelDB.open(path)
  }
}
```

### User sessions

* `npm i --save level level-session-store express-session`
* In `src/server.ts` 

```javascript
import session = require('express-session')
import levelSession = require('level-session-store')

const LevelStore = levelSession(session)

app.use(session({
  secret: 'my very secret phrase',
  store: new LevelStore('./db/sessions'),
  resave: true,
  saveUninitialized: true
}))
```

### User authentication

In `src/server.ts`

```javascript
import { UserHandler, User } from './users'
const dbUser: UserHandler = new UserHandler('./db/users')
const authRouter = express.Router()

authRouter.get('/login', (req: any, res: any) => {
  res.render('login')
})

authRouter.get('/signup', (req: any, res: any) => {
  res.render('signup')
})

authRouter.get('/logout', (req: any, res: any) => {
  delete req.session.loggedIn
  delete req.session.user
  res.redirect('/login')
})

...
```

### User authentication

In `src/server.ts`

```javascript
...

authRouter.post('/login', (req: any, res: any, next: any) => {
  dbUser.get(req.body.username, (err: Error | null, result?: User) => {
    if (err) next(err)
    if (result === undefined || !result.validatePassword(req.body.password)) {
      res.redirect('/login')
    } else {
      req.session.loggedIn = true
      req.session.user = result
      res.redirect('/')
    }
  })
})

app.use(authRouter)
...
```

### User creation and retrieval

In `src/server.ts`

```javascript
...

const userRouter = express.Router()

userRouter.post('/', (req: any, res: any, next: any) => {
  dbUser.get(req.body.username, function (err: Error | null, result?: User) {
    if (!err || result !== undefined) {
     res.status(409).send("user already exists")
    } else {
      dbUser.save(req.body, function (err: Error | null) {
        if (err) next(err)
        else res.status(201).send("user persisted")
      })
    }
  })
})

userRouter.get('/:username', (req: any, res: any, next: any) => {
  dbUser.get(req.params.username, function (err: Error | null, result?: User) {
    if (err || result === undefined) {
      res.status(404).send("user not found")
    } else res.status(200).json(result)
  })
})

app.use('/user', userRouter)
```

### User authorization middleware

In `src/server.ts`

```javascript
const authCheck = function (req: any, res: any, next: any) {
  if (req.session.loggedIn) {
    next()
  } else res.redirect('/login')
}

app.get('/', authCheck, (req: any, res: any) => {
  res.render('index', { name: req.session.username })
})
```

### Login page layout

In `views/login.ejs`

```html
<div id="form">
  <p>Please login to your account</p>
  <hr/>
  <form action="/login" method="post">
    <div class="form-group">
      <label for="form_username">Username</label>
      <input id="form_username" type="text" name="username" />
    </div>
    <div class="form-group">
      <label for="form_password">Password</label>
      <input id="form_password" type="password" name="password" />
    </div>
    <button class="btn btn-primary btn-block" type="submit" value="Submit">Connect</button>
  </form>
  <hr/>
  <button class="btn btn-success btn-block" type="submit" href="/signup" onClick='document.location.href="/signup"'>
    Create an account
  </button>
</div>
```

### Index page layout

In `views/index.ejs` (renamed from `hello.ejs`) :

```html
<button class="btn btn-danger" href="/logout" onClick='document.location.href="/logout"'>
  Logout
</button>
```

### Your turn

* Do the `remove` functions for a user
* Do the `/signup` form and link to /user POST

## Your work

* Fully implement User module: auth, CRUD & unit tests
* Using the `metrics` module implemented on past work:
  * Link metrics to users 
  * Implement the mechanisms for a user to add metrics and retrieve them (only its own !)
* On the front-end:
  * Display data accordingly to the connected user
