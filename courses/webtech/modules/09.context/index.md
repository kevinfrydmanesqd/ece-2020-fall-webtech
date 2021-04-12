---
date: 2020-11-23
duration: 1.5 hours
---

# React Context

When react applications grow and gain more additionnal complexity, sharing data between the components and updating the comportant in sync with new values become cumbersome. Traditionnally, there were solutions to circumvent such as Redux and Mobx. The recent addition of the Context API in React simplify state management.

## Why

* Share data at all level of the application
* Solve the problem of prop drilling
* Leverage existing hooks such as useState
* Centralize state management

## Prop drilling

* Passing properties through the component hierarchy
* From the top to all level of the tree to the component needing it
* Not all components need those properties
* Pass access to modify the value of those properties

## Before

```
<RootComponent>                  (context key=value)
  <IntermediateComponent>        (context key=value)
    <OtherIntermediateComponent> (context key=value)
      <ChildComponent>           (context key=value)
```

## After

```
<RootComponent>                  (context key=value)
  <IntermediateComponent>                 |
    <OtherIntermediateComponent>          |
      <ChildComponent>           (context key=value)
```

## API

* Instantiation with new Context
* One Context.Privider
* Multiple Context.Consumer
* Consumers may use the `useContext(context)` hook

## Example - Context initialization

```jsx
import React, {useState} from 'react';

export const Context = React.createContext();

export const Provider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{
      user: user,
      setUser: (user) => {
          if(user && !user.email) {
            throw Error("Invalid user")
          }
          setUser(user);
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}
```

## Example - Provider registration

```jsx
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Example - Consumer hook

```js
import {useContext} from 'react';

const LoggedOut = () => {
  const {setUser} = useContext(Context);

  return (
    <button onclick={()=>{setUser('guest')}}>Login</button>
  )
};

const LoggedIn = () => {
  const {user, setUser} = useContext(Context);
  return (
    <div>
      Welcome {user}
      <button onclick={()=>{setUser(null)}}>Logout</button>
    </div>
  )
};

export default () => {
  const {user} = useContext(Context);

  return user ? <LoggedIn /> : <LoggedOut />;
};
```
