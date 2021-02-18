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
  npm install --save level
  ```

## Use the db

To open

```javascript
const level = require('level');
const db = level('./path/to/db');
```

## Use the db

To write

```javascript
db.put(key, value, (err) => {
  if(err) {...}
});
```

To read

```javascript
db.get(key, (err, value) => {
  if(err) {...}
});
```

## Write keys

* One by one ? Too heavy !
* Use streaming :

```javascript
// Write
import WriteStream from 'level-ws';
const ws = WriteStream(db);

ws.on('error', function (err) {
  console.log('Oh my!', err)
});
ws.on('close', function () {
  console.log('Stream closed')
});
ws.write({ key: 'occupation', value: 'Clown' });
ws.end();
```

## Read keys

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
  });
```

## Units Tests

* Test your code
* Many tools : mocha, jest, ...
* Supertest to simulate api call : https://www.npmjs.com/package/supertest
* TDD : https://openclassrooms.com/fr/courses/3504461-testez-linterface-de-votre-site/4270571-apprenez-le-test-driven-development-tdd
