import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { MainContainer } from './containers'

ReactDOM.render(
  <BrowserRouter>
    <Route path='*' component={ MainContainer } />
  </BrowserRouter>,
  document.getElementById('app')
)
