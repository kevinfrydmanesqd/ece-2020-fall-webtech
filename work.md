# 01 First Node & Git project

Create a basic app with three routes:

- `/` explains how `/hello` works
- `/hello` takes a `name` query parameter and
  - random names replies `hello [name]`
  - your own name replies with a short intro of yourself
  - any other replies a 404 code with a not found message

You should have an `index.js` file with the server creation and `handles.js` defining the server's callback

Add a `readme.md` file with title, introduction, run instructions and your name

Push it all to a GitLab / GitHub repository

# 02 Dependency management & Express

Using the code and repo from last module, convert everything to use `express` 
instead of doing routing and server setup manually.

# 03 Transpilation

Using the code and repo from last weeks TP and enhanced in class, 
add to `src/server.ts` the code to expose the front that we had previously
in the `index.js`.

# 04 Storage

Using the code and repo from last weeks TP and enhanced in class, add a `delete`
function to your `metrics` module and a route to delete a batch of metrics based 
on its key. You should already have the `get` function & route from class work.

# 05 Unit testing

Using the code and repo from last weeks TP and enhanced in class

* Finish the Metrics unit tests

# 06 Middlewares

Using the code and repo from last weeks TP and enhanced in class

* Fully implement User module: auth, CRUD & unit tests
* Using the `metrics` module implemented on past work:
  * Link metrics to users 
  * Implement the mechanisms for a user to add metrics and retrieve them (only its own !)
* On the front-end:
  * Display data accordingly to the connected user
  * Allow a user to display each of his metrics group
* Write unit tests for all the functionality
  
