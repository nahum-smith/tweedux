import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { MainContainer } from './containers'
import { createStore } from 'redux'
import userReducer from './redux/modules/users'
import { Provider } from 'react-redux'

const store = createStore(userReducer)
console.info(store.getState())

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Route path='*' component={ MainContainer } />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
