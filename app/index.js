import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { MainContainer } from 'containers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import logger from 'redux-logger'

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
/* eslint-enable */

// function checkAuth (nextState, replace) {
//   const isAuthed = checkIfAuthed(store)
//   const nextPathName = nextState.location.pathname
//   if (nextPathName === '/' || nextPathName === '/auth') {
//     if (isAuthed === true) {
//       replace('/feed')
//     }
//   } else {
//     if (isAuthed !== true) {
//       replace('/auth')
//     }
//   }
// }
console.info('State in root', store.getState())
ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
