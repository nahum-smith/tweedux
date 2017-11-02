import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'redux/modules/users'
import { Logout } from 'components'

class LogoutContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
  componentDidMount = () => {
    this.props.dispatch(logoutAndUnauth())
  }
  render () {
    return <Logout />
  }
}

export default connect()(LogoutContainer)
