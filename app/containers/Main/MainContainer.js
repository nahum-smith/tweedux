import React from 'react'
import { Route } from 'react-router-dom'
import { HomeContainer} from '../../containers'
import { Navigation } from '../../components'
import { container } from './styles.css'

const MainContainer = () => {
  return (
    <div className={ container }>
      <Navigation isAuthed={ false } />
      <Route path='/' exact={ true } component={ HomeContainer } />
    </div>
  )
}

export default MainContainer
