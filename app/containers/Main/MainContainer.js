import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from '../../containers'
import { Navigation, AuthorizedRoute } from 'components'
import { container } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends React.Component {
  static propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  }
  componentWillMount () {
    console.info('about to mount')
  }
  componentWillUnmount() {
    console.info('will unmount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props')
  }
  componentDidMount () {
    const { authUser, fetchingUserSuccess, removeFetchingUser, history, location } = this.props
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        authUser(user.uid)
        fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (location.pathname === '/') {
          history.push('/feed')
        }
      } else {
         removeFetchingUser()
      }
    })
  }
  render () {
    console.info('rendering container')
    return this.props.isFetching === true
      ? null
      : (
        <div className={ container }>
          <Navigation isAuthed={ this.props.isAuthed } />
          <Switch>
            <Route path='/' exact={ true } component={ HomeContainer } />
            <Route path='/auth' exact={true} component={ AuthenticateContainer } />
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
  return bindActionCreators(userActionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer))
