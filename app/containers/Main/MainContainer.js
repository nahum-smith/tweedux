import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer } from '../../containers'
import { Navigation } from '../../components'
import { container } from './styles.css'

class MainContainer extends React.Component {
  render () {
    return (
      <div className={ container }>
        <Navigation isAuthed={ true } />
        <Route path='/auth' component={ AuthenticateContainer } />
        <Route path='/' exact={ true } component={ HomeContainer } />
      </div>
    )
  }
}
const mapStateToProps = ({ isAuthed }) => ({
  isAuthed,
})
export default connect(mapStateToProps)(MainContainer)
