
# ExpressJS, front-end & storage

## About this work

This work is part of the continuous assessment of this class and will be the basis for your final 
project. Your final grade will be calculated based on the final project’s result and your Git’s history.

The project in itself is a simple web dashboard that should allow you to :

* Login with a user
* Insert metrics once logged in
* Retrieve the user’s metrics and display it in a graph!
* Only access the user’s metrics, not the rest of it

In class, we saw how to : 

* Use Nodemon to launch our application, so we don’t have to relaunch the server every time
* Create an ExpressJS app to facilitate Routing, use of HTTP verbs and exposing a front-end
* Create a simple front-end in Jade with some AJAX call to add data dynamically to our webage
* Use a LevelDB database to store our metrics
* Create a coffee script to populate our database with dummy data so we don’t have to do it manually

The project shall be written in coffee-script, jade and stylus and nothing else. You are encouraged 
to use the tools presented in class.

## TODO

Using the code from your previous work and from class : 

1. On the front-end
  1. Work with Stylus and Bootstrap to make it look nice
  2. Display the metrics in a graph using d3.js
2. On the back-end
  1. Add `get` and `remove` functions to the metrics module to retrieve and remove data from the database
  2. Use postman to test your API functions
3. Enhance the populatedb script that we saw in class to add multiple metric batches with different IDs

The code we worked on in class is available here : https://github.com/cesarBere/ast-express

It is not the complete code since the beginning, only today. I’ll remove it next monday. 
You could of course if you want take the code and go from here adding what we did previously 
however that’s your loss because you won’t learn as much as doing it by yourself and it can be 
noticed.

Also, you don’t have to but you could develop your `get` and `remove` functions using unit testing, it is 
going to be much easier to test than with another process. I added a unit test skeleton on the get 
function in the test directory as example.

## Some useful links

* Stylus documentation: https://learnboost.github.io/stylus/
* Jade documentation: http://jade-lang.com/
* Coffee-script documentation: http://coffeescript.org/
* D3.JS documentation: http://d3js.org/
* JQuery documentation: https://code.jquery.com/
* Bootstrap documentation: http://getbootstrap.com/
* Level-up documentation: https://github.com/Level/levelup
