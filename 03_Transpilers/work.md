# Transpilers

Take the project up until now and convert it 

* Install coffeescript: `npm i --save coffee-script`
* Convert your `.js` files to `.coffee`
* Update your start/test scripts 
  * For test, add `--compilers coffee:coffee-script/register` to the command
* Add a build command : `coffee --compile --output lib/ src/`
            
Some useful links : 

* Jade documentation : http://jade-lang.com/
* Stylus documentation : https://learnboost.github.io/stylus/
* CoffeeScript documentation : http://coffeescript.org/

Notes : 

This  work  is  part  of  the  continuous  assessment  of  this  class  and  will  be  the  basis  for  your  final 
project. Your final grade will be calculated based on the final project’s result and your Git’s history.
