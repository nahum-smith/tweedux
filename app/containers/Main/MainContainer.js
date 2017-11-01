import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer } from '../../containers'
import { Navigation, AuthorizedRoute } from 'components'
import { container } from './styles.css'

class MainContainer extends React.Component {

  render () {
    console.log('Props', this.props)
    return (
      <div className={ container }>
        <Navigation isAuthed={ this.props.isAuthed } />
        <Switch>
          <Route path='/' exact={ true } component={ HomeContainer } />
          <Route path='/auth' component={ AuthenticateContainer } />
          <AuthorizedRoute path='/feed' component={ FeedContainer } />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = ({ isAuthed }) => ({
  isAuthed,
})
export default connect(mapStateToProps)(MainContainer)
