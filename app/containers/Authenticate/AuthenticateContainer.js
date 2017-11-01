import React from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
  }
  handleAuth = () => {
    const { fetchingUser, authUser, fetchingUserFailure, fetchingUserSuccess } = this.props
    fetchingUser()
    auth()
      .then((user) => {
        fetchingUserSuccess(user.uid, user, Date.now())
        authUser(user.uid)
      })
      .catch((error) => fetchingUserFailure(error))
  }
  render () {
    const { error, isFetching } = this.props
    return (
      <div>
        <Authenticate
          isFetching={ isFetching }
          error={ error }
          onAuth={ this.handleAuth }/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.info('state', state)
  return {
    error: state.error,
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateContainer)
