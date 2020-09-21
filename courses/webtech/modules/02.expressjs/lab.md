
# Lab

We are going to create our first Node.js project with Express.js.

We want to ensure our project adheres to community good practices. This include:
- using a Version Control System (VCS) such as Git
- writing a README to communicate on our project goal, API, usage and status
- generating and maintaining a complete package.json description file
- communicating comprehensive and usefull commits in Git
- maintaining a changelog file
- writing tests to backup our development process
- directory layout (eg: `bin`, `lib`, `test`)
- ...

Once we get all this setup, our new web application will start an HTTP web server with Express.js. It exposes some static routes such as the homepage as well as dynamic routes to print information relative to a given channel, or an error message if the channel does not exist. The route shall match a pattern like `/channel/{channel_id}`.
