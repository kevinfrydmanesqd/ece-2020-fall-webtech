---
date: 2020-11-30
duration: 1.5 hours
---

# React Router

SPA stands for SinglePageApplication. It literally means an application that consists of one HTML page. To the end user, the application feels like it is made of multiple pages. However, looking at the navigation bar, the address remains the same... unless the browser history is modified.

## Intro

* Show different screens to different addresses
* Honors the browser history
* Not build-in in React
* Librairies includes React Router, Reach Router, Next.js
* React Router 5 is the fusion of React Router and Reach Router

## Features

* URL parameters
* Route nesting
* Code splitting
* Redirect
* Preventing Transitions
* No match (404)
* Recursive Paths
* Animated Transitions

## Example - URL parameters

* placeholders in the URL that begin with a colon
  ```jsx
  export default () => (
    <Router>
      <Switch>
        <Route path="/:id">
          <Child />
        </Route>
        <Route path="/">
          <home />
        </Route>
      </Switch>
    </Router>
  )
  ```

## Resources

* [React Router homepage](https://reactrouter.com/)
* [The Future of React Router and @reach/router](https://reacttraining.com/blog/reach-react-router-future/)
