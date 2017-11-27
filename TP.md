
# Node HTTP lab 

## About this work 

This work is one of the two hand-ins of this class, however it is not related to 
the final project that you will have to work on. 

It will count as 50% of the final technical notation (which is 70% of the 
course's grade, remaining 30% being a test).

Work has to be done in teams of two.

## TODO 

You shall develop a static website using NodeJS on whatever subject you want 
(fishing, coding, yourselves, ...).

This website shall have at least two distinct pages with one referencing the other(s).

Your project shall:

* Be a correct NodeJS project (package.json) (4 pts)
* Apply best practices as seen in class (readme.md, scripts, ...) (2 pts)
* Set-up a NodeJS HTTP server (2 pts)
* Handle routing to be able to serve multiple static files on different paths (2 pts)
* Handle expected errors (file not found, ...) (2 pts)
* Use transpilers to render files (coffeescript / pug / stylus) (4 pts)
* Split it's logic in multiple files (2 pts)
* Have some basic unit tests to validate your routing (for example: expect 200 HTTP code if file exists, 404 if not, ...) (1 pt)
* Use travis-ci to run unit tests (1 pt)

The workload should cover a full class lab time with a bit of homework for two developpers working in parallel
about 3 hours for two developers working in parallel, so about 6 hours total (a bit less if you count setup, ...)

Note: website's content will not be graded

## Grading process 

To grade your work I will: 

* Look at the repository you will have handled 
* Clone the repository and checkout the v1.0 / handling tag
* `cd <your_repository> && npm install && npm start`
* Navigate to `localhost:<port>` and explore the website 
* Look at the code and check for the points exposed in the TODO section 

## Handling 

You shall create a github repository named "ast_lab_work" on which you will work
in teams of two. 

Once you are done you shall tag your final commit as version 1.0 with the comment 
"handling". Use the following command :

* to tag: `git tag -a v1.0 -m "handling"`
* to push tags: `git push --tags`

You shall push on http://campus.ece.fr a text file named `ast_lab_name1_name2.txt` 
containing **only** the url to your git repository with the lab work.

This lab work ends on sunday 5/11 at 11:55PM.
