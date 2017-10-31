import React from 'react'
import { Route } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer } from '../../containers'
import { Navigation } from '../../components'
import { container } from './styles.css'

const MainContainer = () => {
  return (
    <div className={ container }>
      <Navigation isAuthed={ true } />
      <Route path='/auth' component={ AuthenticateContainer } />
      <Route path='/' exact={ true } component={ HomeContainer } />
    </div>
  )
}

export default MainContainer
