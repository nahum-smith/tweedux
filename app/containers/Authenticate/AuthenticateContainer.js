import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchAndHandleAuthUser: PropTypes.func.isRequired,
    history: PropTypes.object,
  }
  handleAuth = () => {
    this.props.fetchAndHandleAuthUser()
      .then(() => {
        this.props.history.push('/feed')
      })
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

const mapStateToProps = ({ users }) => ({
  error: users.error,
  isFetching: users.isFetching,
})
const mapDispatchToProps = (dispatch) => bindActionCreators(userActionCreators, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticateContainer)
)
