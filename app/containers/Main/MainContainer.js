import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from '../../containers'
import { Navigation, AuthorizedRoute } from 'components'
import { container } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends React.Component {
  static propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  }
  render () {
    return (
      <div className={ container }>
        <Navigation isAuthed={ this.props.isAuthed } />
        <Switch>
          <Route path='/' exact={ true } component={ HomeContainer } />
          <Route path='/auth' component={ AuthenticateContainer } />
          <AuthorizedRoute path='/feed' component={ FeedContainer } />
          <Route path='/logout' component={ LogoutContainer } />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = ({ isAuthed, isFetching }) => ({
  isAuthed,
  isFetching,
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
