
# Lab

We will learn how to use unit test, REST API and a storage layer. To get started, we provided some exemple on how to create CRUD operation on a channel entity. Use this as an example to create the same for users and messages.

The storage is currently using an in-memory `store` object located inside the `lib/db` module. It is not persistent. A new process will create a new database.

We will use LevelDB as our storage engine. It is a sorted key/value store. Keys and values are string or Buffers. For exemple, the property `channels['1']` property in our of `store` could be stored with the key `channels:1` inside LevelDB. The value remains the same, it must just be serialized. While not being the most officient format, JSON is suitable format. It is easy to use in JavaScript, readable by humans and not so big compared to YAML or XML. In production, a binary format such as Protocol Buffer and Avro are better.

We must now re-implement all our tests to reflect our LevelDB implementation. The code of the tests shall remains the same but only migrate from a synchronous API to an asynchronuous API.
