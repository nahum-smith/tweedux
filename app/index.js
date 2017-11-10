import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainContainer } from 'containers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import logger from 'redux-logger'
import { loadState, saveState } from './localStorage/localStorage'
import throttle from 'lodash/throttle'
import { authUser } from 'redux/modules/users'

const persistedState = loadState()
console.info('persisted State', persistedState)

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

store.subscribe(throttle(() => {
  saveState({
    users: {
      isAuthed: store.getState().users.isAuthed,
      authedId: store.getState().users.authedId,
    },
  })
}, 1000))

persistedState.users.isAuthed === true && store.dispatch(authUser(persistedState.users.authedId))

console.info(store.getState())
ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
