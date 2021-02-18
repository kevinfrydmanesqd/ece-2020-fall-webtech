
# Lab

We will learn how to use unit test, REST API and a storage layer.

## Model

The model is made of 3 entities:
- users :
    - id,
    - name,
    - email,
    - password
- channels :
    - id,
    - name,
- messages :
    - id,
    - content,
    - created_at,

The relationships are as follow:
- channels have messages
- messages have an owner
- no need for a user to list the messages he sent

## Part 1: persistent storage and routes

We will use LevelDB as our storage engine. It is a sorted key/value store. Keys and values are string or Buffers. For exemple, the `channels['1']` property in our of `store` could be stored with the key `channels:1` inside LevelDB. The value remains the same, but since if is an object literal, it must be serialized. While not being the most efficient format, JSON is a suitable format. It is easy to use in JavaScript, readable by humans and smaller compared to YAML or XML. In production, binary formats such as Protocol Buffer and Avro are better.

We must now re-implement all our tests to reflect our LevelDB implementation. You will notice by going to the [LevelDB documentation](https://www.npmjs.com/package/level) that the api to manipulates keys is pretty simple. We can put, get, delete and scan keys. The code the `./lib/db.js` module and of the tests remains unchanged.

We have provided commented code to show you how. To get started, do the following operations:

- npm install
- npm start

You will write all the following routes and all associated specifications:
- update a channel
- delete a channel

- list all users
- create a new user
- show a user by id
- update a user
- delete a user

- list all messages in the channel
- create a new message in a channel
- update a message
- delete a message

## Part 2: test coverage for every entities

The storage is currently using an in-memory `store` object located inside the `lib/db` module. It is not persistent. A new process will create a new database.

To get started, we provided some examples on how to create CRUD operation on the channel entity.

Only the tests for the `channel` entity are implemented and we only tests channels creation and listing.

You must implement the last channels, users and messages tests. Since the users tests are very similar to channels, start with them. Once they run, work on the messages tests.

This exercise involve an understanding of Mocha and its `describe` and `it` functions. Remember, `it` takes a function which is the test you are writing and `describe` groups your tests.

Have fun !
