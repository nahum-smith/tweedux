import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AuthorizedRoute extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
  }
  render () {
    const { component: Component, isAuthed, ...rest } = this.props
    return (
      <Route { ...rest } render = { props => {
        return isAuthed
          ? <Component { ...this.props } />
          : <Redirect to='/auth' />
      } } />
    )
  }
}

const mapStateToProps = ({ isAuthed }) => ({
  isAuthed,
})

export default connect(mapStateToProps)(AuthorizedRoute)
