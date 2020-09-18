---
duration: 1.5 hours
---

## Part 2: Transpilation

The language used across the course such as JavaScript, CSS, HTML can be written in alternative syntaxes. The rest of the course will present and use TypeScript, CoffeeScript, Jade, Stylus and friends.

## Compiler & transpiler

* Compile: transforming a source code written in a language A (source language) to a language B (target language)
* Transpile (or transcompile): a source-to-source compilation, meaning that the source language and the target language are of the same level (cf: high/low level of programming languages)
* A transpiler **is** a compiler

## Why

* Enhance code quality and readability
* Accelerate programming (eg: CoffeeScript)
* Change strong/weak typing (eg: TypeScript)
* Change programmation paradigm
* Add fancy features (eg: Babel, CoffeeScript, Stylus)

## Example

```js
function checkAllMyArgsAgain(check, please) {
  if( ! check instanceof CheckObject) {
    throw Error('Invalid check...')
  }
  if( ! typeof please === 'boolean') {
    throw Error('Invalid please...')
  }
  return 'What is the argument check?';
}
```

## Typing with typescript 

```ts
function checkAllMyArgsAgain(
  check: CheckObject,
  please: boolean
): string {
    return 'What is the argument check?';
}
```

## Readability with CoffeeScript

```coffee
checkAllMyArgsAgain = (check, please) ->
  throw Error 'Invalid check...' unless check instanceof CheckObject
  throw Error 'Invalid please...' unless typeof please is 'boolean'
  'What is the argument check?'
```

## In web technologies

* Development speed is very important
* No impact on execution speed
* Allow a pretty, clean, commented source code
* Compiles into size-optimized files

## TypeScript

* Javascript transpiler
* Quick learning
* Adds optional typing to JS
* New JS features from EcmaScript

Doc: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/home.html)  
Resource: [basarat.gitbooks.io/typescript](https://basarat.gitbooks.io/typescript/docs/why-typescript.html)

## Typing

Two types:

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

```js
"compilerOptions": {
    // ...
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
    "build": "npx tsc -p tsconfig.json"
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
