---
date: 2020-11-07
duration: 1.5 hours
---

# React

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

## What is React

* React is a JavaScript library that focuses on declarative syntax and virtualization of the DOM
* It allows developers to write highly efficient JavaScript for the purpose of rendering a UI in a web browser
* Whereas traditional JavaScript will re-render the entire DOM during a state change, React will only render the parts of the DOM that have changed 

## History

* Created by Jordan Walke at Facebook
* First deployed on Facebook’s newsfeed in 2011, Instagram in 2012
* Released under the MIT License as an open source project in May of 2013
* Additional projects such as React Native for mobile and React Fiber would follow in 2015 and 2017 respectively 

## How is it different

* Declarative and virtualized, two keywords that sets React apart from traditional JavaScript UI development
* React doesn’t iteratively draw UI components on the screen
* The developer defines what the final UI should look like, and React ensures that the DOM is rendered accordingly
* This is a very significant difference from typical HTML rendering in JavaScript, which typically centers around injecting HTML using the innerHTML directive Declarative and Virtualized
* React also virtualizes the entire DOM and uses JavaScript to render actual HTML in the form of React Components

## Subtle but powerful

* This is a much different paradigm, but with JavaScript free to own the entire DOM, we can do interesting things
* Since React just declares the UI composition and updates itself accordingly, you don’t have to worry about redrawing parts or all of the UI when something changes
* You can trust React to, well, react to those changes and re- render itself only when necessary Subtle but powerful… 

## Creating elements - `React.createElement()`

* The React library contains a method for drawing HTML elements inside the DOM.
* But, you may never actually need to invoke it
* JSX gives you the ability to just write your elements in a pseudo-HTML syntax React.createElement() 

## Bootstraping the UI - `ReactDOM.render()`

* React will assemble these multiple React.createElement() calls into a tree of components
* Then, upon every state change, React performs a “tree reconciliation” where it examines the state of every component and sees if anything has changed
* If something has changed, react updates that part of the virtual DOM and re-renders the element ReactDOM.render() 
* The special function render() will expect to receive as input the design elements of your UI
* An anchor element in HTML where it should draw the object is its second parameter

```jsx
ReactDOM.render(
  <div>
    <button />
  </div>,
  document.getElementById('root')
);
```

## JSX is weird, isn't it

* Write in-line ersatz HTML (really, JSX) and pass it around as if it was native JavaScript
* It takes a little getting used to, but, it ends up being a lot cleaner than dozens of createElement() calls
* In fact, when React compiles, it uses a library called Babel to generate createElement() statements from the JSX
* So the JSX is really never rendered directly, it is interpreted by Babel and converted to createElement() calls at compile time 

## Components

* Components are atomic UI elements which will combine layout with a state and set of properties that React will maintain
* You will create these components as either JavaScript classes or functions, and React will use them to render UI elements
* These components are autonomous, and maintain their own private state and properties
* They can be arranged into parent/child hierarchies, and can flow data between them 

## Function components

* A function component starts with a function, obviously
* We’ve actually already seen one: 
  ```
  const Title() => {
    return (
      <div>
        <h1>WTF How Is This Possible?</h1>
      </div>
    );
  }
  ReactDOM.render(<Title />, document.getElementById(’root’));
  ```

## Class components

* For more complex components, you may want to take advantage of JavaScript classes
* Those who are more comfortable with OOP as opposed to Functional programming may prefer creating classes
* I do encourage you to get comfortable with Functional programming and React hooks
* No plans to deprecate class components any time soon, but...

## Properties

* Components will automatically contain a properties object that can be interacted with and changed
* These properties are passed in by default as function parameters in a function component
* Or, they will be their own object, referenced with ‘this.props’ inside of a class component
* Properties are immutable, but can be set with initial values when a component is rendered 

## Managing state

* State inside of a React component consists of two parts
* The first is the state, which is really just a primitive or set of primitives that can be manipulated
* The second is a setter function which allows you to update the state of a component
* Both of these entities are exposed by deconstructing a special hook called `useState()` which is provided by React 

## Components

* We just covered a lot of ground, but when we look at the code this is actually very straightforward
* Let’s create a function component, and give that component a set of properties and a state
* And let’s alter that state and watch the result in the browser Lets tie it all together 

## One-way data flow

* This is a large topic, but we’ll gently introduce it here
* Recall in the demo that we broke our UI into two components, a Display and a Button
* The Display object had to react to state changes caused by the Button’s onClick event handler
* We did this by passing properties into the Display function One-way Data Flow 

## One-way data flow example

```js
function Display(props) {
  return ( <div>{props.message}</div> );
}
<Display message={counter.counterValue} />
```

Here, The App parent (below) Flows property data to the Child Display component (above) 

## One-way data flow

* The parent App element has the Display element as its child, so it is able to flow data down to it
* While this isn’t the only technique for flowing data in React, this is a pattern you will see often
* You can even pass entire functions to child components, which the children can then execute to relay data back to the parent
* Don’t worry if this is a little confusing at this point, it is one of React’s more advanced concepts and just takes some practice One-Way Data Flow

## Create the environnement

* Like many things in life, there’s an easy way and a hard way to get going with React
* The easy way is great, but it obfuscates the setup and so you can’t really learn from it
* Let’s step through the hard way first (just listing the steps) and then I’ll introduce the easy way
* I recommend that everyone go through the hard way at least once so you can become familiar
* It’s a pain, but, it’s worth it to increase your knowledge of React Let’s start playing! 

## The hard way!

1) Install Node.js 2) Create root directory 3) npm init 4) Install express with npm 5) Install react and react- dom with npm Just to give you an idea… 6) Install webpack with npm 7) Install BabelJS with npm 8) Install nodemon 9) Install eslint 10)Create webpack app structure…. 

## The easy way

* Thankfully, a special Node.js module called “create-react- app” exists for you and is kept up to date
* This module is maintained by Facebook and is an officially supported way to create a React app
* Note that this is only suitable for single-page React apps, but, that covers most apps since your dynamic content will all be rendered in the DOM Huzzah! 
* Steps:
  1. `npx create-react-app my-cool-app`
  2. `cd my-cool-app`
  3. `npm start`
  4. `npm run eject` to go back the hard way
