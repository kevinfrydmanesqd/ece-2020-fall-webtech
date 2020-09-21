---
date: 2020-10-22
disabled: true
---

# Databases and storage

* RDBMS (basis for SQL) : MySQL, PostgreSQL, Hive, Oracle
* NoSQL :
  * Filesystems: posix and object storage
  * Documents store: MongoDB, ElasticSearch
  * Key/value and sorted key/value stores: LevelDB
  * Column families: HBase, Cassandra
  * Graph DBs: JanusGraph (ex-TitanDB), Neo4J

## LevelDB

* In-memory key-value store embedded in Node
* OpenSource
* Embeddable, C and JS versions
* Originally written by Google
* [leveldb.org](http://leveldb.org)

## Why LevelDB for our project ?

* It’s blazing fast
* In memory & backed by the file system
* Keys are ordered : suitable for timeseries such as messages and metrics
* Data compression with Snappy
* Embedded in the app, nothing else to setup and manage

## Some limitations

* Not a SQL database
* Only a single process at a time

## Let’s setup

* Dependencies installation
  ```shell
  npm install --save encoding-down leveldown levelup level-ws 
  npm i --save-dev @types/levelup
  ```
* Create a `src/declarations.d.ts` file and add 
```javascript
declare module 'encoding-down'
declare module 'leveldown'
declare module 'levelup'
declare module 'level-ws'
```
* In `tsconfig.json` set 
```json
{
    "compilerOptions": {
      "noImplicitAny": false
    }
}
```

## Use the db

To open

```javascript
import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'

const db = levelup(encoding(
  leveldown("path"), 
  { valueEncoding: 'json' })
)
```

## Use the db

To write

```javascript
db.put(key, value, (err) => {
  if(err) {...}
})
```

To read

```javascript
db.get(key, (err, value) => {
  if(err) {...}
})
```

## Use the db

Let's create a wrapper  
Create a `leveldb.ts` file: 

```javascript
import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'

export class LevelDB {
  static open(path: string) {
    const encoded = encoding(leveldown(path), { valueEncoding: 'json' })
    return levelup(encoded)
  }
}
```

## The metrics

* Key: `metrics:#{id}:#{timestamp}`
* Value: an integer

## Read/write metrics

* One by one ? Too heavy !
* Use streaming :

```javascript
// Write
import WriteStream from 'level-ws'
const ws = WriteStream(db);

ws.on('error', function (err) {
  console.log('Oh my!', err)
})
ws.on('close', function () {
  console.log('Stream closed')
})
ws.write({ key: 'occupation', value: 'Clown' })
ws.end()
```

## Read/write metrics

* One by one ? Too heavy !
* Use streaming :

```javascript
// Read
const rs = db.createReadStream()
  .on('data', function (data) {
    console.log(data.key, '=', data.value)
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream ended')
  })
```

## Let’s post some metrics

In `src/metrics.ts`

* Update the class to open a database connection 

```javascript 
import LevelDB = require('./leveldb')

export class MetricsHandler {
  private db: any 
  
  constructor(dbPath: string) {
    this.db = LevelDB.open(dbPath)
  }
}
```

## Let’s post some metrics

In `src/metrics.ts`

* Add a function to save data

```javascript 
import WriteStream from 'level-ws'

export class MetricsHandler {
    public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
      const stream = WriteStream(this.db)
      stream.on('error', callback)
      stream.on('close', callback)
      metrics.forEach((m: Metric) => {
        stream.write({ key: `metric:${key}${m.timestamp}`, value: m.value })
      })
      stream.end()
    }
}
```

## Let’s post some metrics

Install `body-parser` to parse the request’s body

```shell
npm i --save body-parser
```

Configure Express to use it in `src/server.ts`

```javascript
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
```

## Let’s post some metrics

Add a route in `src/server.ts`

```javascript
const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send()
  })
})
```

## Let’s post some metrics

* Using Postman :
  * Set up a POST request on /metrics
  * Set the header Content-Type:application/json
  * Add an array of metrics as RAW body :

```shell
[
  { "timestamp":"1384686660000", "value":"10" }
]
```

## Or use a script ?

`tsc && ./node_modules/.bin/ts-node bin/populate.ts`

```javascript
#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics'

const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8)
]

const db = new MetricsHandler('./db')

db.save('0', met, (err: Error | null) => {
  if (err) throw err
  console.log('Data populated')
})
```

## Your work

* Add a `get` function to `metrics` module
* Add a route to get a metric (one of the metric, all the metrics)
* Add a `delete` function to `metrics` module
* Add a route to delete a metric based on its key
