import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { MainContainer } from './containers'
import { createStore, applyMiddleware } from 'redux'
import userReducer from './redux/modules/users'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(userReducer, applyMiddleware(thunk))



function checkAuth (nextState, replace) {
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Route path='*' component={ MainContainer } />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
