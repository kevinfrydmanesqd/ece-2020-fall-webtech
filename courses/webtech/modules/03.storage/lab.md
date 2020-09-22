
# Lab

We will learn how to use unit test, REST API and a storage layer.

## Model

The model is made of 3 entities:
- users
- channels
- messages

The relationships are as follow:
- channels have messages
- messages have an owner
- no need for a user to list the messages he sent

## Part 1: test coverage for every entities

To get started, we provided some exemple on how to create CRUD operation on a channel entity. Use this as an example to create the same for users and messages.

The storage is currently using an in-memory `store` object located inside the `lib/db` module. It is not persistent. A new process will create a new database.

Only the channels tests are implemented, you must implement the messages and users tests. Start by removing all the occurences of `.skip` inside the test folder and make sure the tests are passing by enriching the `./lib/db.js` and `./lib/app.js` modules. 

## Part 2: persistent storage

We will use LevelDB as our storage engine. It is a sorted key/value store. Keys and values are string or Buffers. For exemple, the `channels['1']` property in our of `store` could be stored with the key `channels:1` inside LevelDB. The value remains the same, it must just be serialized. While not being the most efficient format, JSON is a suitable format. It is easy to use in JavaScript, readable by humans and not so big compared to YAML or XML. In production, binary formats such as Protocol Buffer and Avro are better.

We must now re-implement all our tests to reflect our LevelDB implementation. The code of the tests shall remains the same but only migrate from a synchronous API to an asynchronuous API.

We have provided commented code to show you how. To get started, do the following operations:
- in `./lib/db.js`, comment lines 5-8, uncomment lines 9-10
- in `./lib/db.js`, comment line 17, uncomment line 18
- in `./lib/db.js`, comment lines 22-26, uncomment lines 27-41
- in `./lib/db.js`, comment line 56, uncomment line 57

It will make channels persistent and all tests will pass.
