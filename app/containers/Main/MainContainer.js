import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'
import { Navigation, AuthorizedRoute } from 'components'
import { container } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    setUsersLikes: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { authUser, fetchingUserSuccess, removeFetchingUser, setUsersLikes, history, location } = this.props
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        authUser(user.uid)
        fetchingUserSuccess(user.uid, userInfo, Date.now())
        setUsersLikes()
        if (location.pathname === '/') {
          history.push('/feed')
        }
      } else {
        removeFetchingUser()
      }
    })
  }
  render () {
    return this.props.isFetching === true
      ? null
      : (
        <div className={ container }>
          <Navigation isAuthed={ this.props.isAuthed } />
          <Switch>
            <Route path='/' exact={ true } component={ HomeContainer } />
            <Route path='/auth' exact={ true } component={ AuthenticateContainer } />
            <AuthorizedRoute path='/feed' component={ FeedContainer } />
            <Route path='/logout' component={ LogoutContainer } />
          </Switch>
        </div>
      )
  }
}
const mapStateToProps = ({ users, modal }) => {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...userActionCreators, ...usersLikesActionCreators}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
