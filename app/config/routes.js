import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MainContainer } from '../containers'

const routes = (
  <Router>
    <div className='container'>
      <Switch>
        <Route exact path='/' component={MainContainer} />
        <Route render={() => <p>Not Found</p>} />
      </Switch>
    </div>
  </Router>
)

export default routes
