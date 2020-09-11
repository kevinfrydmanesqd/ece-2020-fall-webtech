
## Recap

* Developer tools: terminal, editor, github, stack overflow
* Best practices on Node.js projects :
  * `scripts` in package.json - don’t repeat long commands
  * Examples in README.md - tell people how to use your code
  * `npm install` - external libraries (ExpressJS, Nodemon)
  * Modules - split your code intelligently
  * Transpilers and TypeScript - write reliable code faster

## Final project

* Based on code from class

* Simple dashboard app :
  * User login
  * A user can insert metrics
  * A user can retrieve his metrics in a graph
  * A user can only access his own metrics
* See [PROJECT.md](../PROJECT.md)

## Questions ?

## Unit testing

* Test atomic components of code 
* Make sure it does what it is supposed to
* Prevent regression & ease future development
* Automate tests with a pipeline

## [Mocha](http://mochajs.org/)

Test framework
```javascript
describe('MyObject', function () {
  before(function () {
    // Ran before all tests of 'MyObject'
  })
  beforeEach(function () {
    // Ran before each tests of 'MyObject'
  })
  after(function () { ... }) // Same but after  
  afterEach(function () { ... }) // Same but after each
  
  describe('#myFunction', function() { // Sub suite of 'MyObject'
    it('should have an expected behaviour', function () {
      // A test
    })
  })
})
```

## [Chai](https://www.chaijs.com/api/bdd/)

Assertion library
```javascript
import { expect } from 'chai'

expect(2).to.equal(2)
expect(2).to.not.equal(1)

const a: string = "something"
expect(a).to.be.a('string')
```

## Setup

```shell
npm i --save-dev mocha @types/mocha chai @types/chai
```
In `src/metrics.test.ts`:

```js
import {expect} from'chai'

const a: number = 0

describe('Metrics', function () {
  it('should save and get', function () {
    expect(a).to.equal(0)
  })
})
```
Then run with:

```shell
./node_modules/.bin/mocha -r ts-node/register src/**/*.test.ts
```

## Npm script          

* In `package.json`:

```json
"scripts": {
  "test": "./node_modules/.bin/mocha -r ts-node/register src/**/*.test.ts",
  ...
}
```
* Now running with `npm test` command

## Run pipeline

* In `.travis.yml`

```json
language: node_js
node_js:
  - "v12.13.0"
```
* On [http://travis-ci.org](http://travis-ci.org), add the repository
* Could be done with gitlab-ci, [example here](https://gitlab.com/gitlab-examples/nodejs/).

## Testing Metrics
  
* Prepare database connection

```javascript
import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler

describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  after(function () {
    dbMet.db.close()
  })
})
```

## Testing Metrics
  
* Install `del` module

```shell
npm i --save del
```
* Add the clear function to `LevelDB` module

```javascript
import fs = require('fs')
import del = require('del')

export class LevelDB {
  ...
  
  static clear(path: string) {
    if (fs.existsSync(path)) {
      del.sync(path, { force: true })
    }
  }
}
```

## Testing Metrics
  
* Test `db#get`

```javascript
describe('#get', function () {
  it('should get empty array on non existing group', function (done) {
    dbMet.get("0", function (err: Error | null, result?: Metric[]) {
      expect(err).to.be.null
      expect(result).to.not.be.undefined
      expect(result).to.be.empty
      done()
    })
  })
})
```

## Work
  
* TODO: test save & delete functions
  - '#save' should save data
  - '#save' should update existing data
  - '#delete' should delete data 
  - '#delete' should not fail if data does not exist
