import React from 'react'
import { PropTypes } from 'prop-types'
import { User } from 'components'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersTweedsActionsCreators from 'redux/modules/usersTweeds'
import { bindActionCreators } from 'redux'
import { staleUser, staleTweeds } from 'helpers/utils'

class UserContainer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    tweedIds: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    noUser: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleUsersTweeds: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired,
    lastUpdatedUser: PropTypes.string.isRequired,
    lastUpdatedUserTweeds: PropTypes.string.isRequired,
  }
  componentDidMount () {
    const uid = this.props.match.params.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }
    if (this.props.noUser === true || staleTweeds(this.props.lastUpdatedUserTweeds)) {
      this.props.fetchAndHandleUsersTweeds(uid)
    }
  }
  render () {
    console.info('rendering User container')
    return (
      <div>
        <User
          noUser={ this.props.noUser }
          isFetching={ this.props.isFetching }
          name={ this.props.name }
          error={ this.props.error }
          tweedIds={ this.props.tweedIds }/>
      </div>
    )
  }
}

function mapStateToProps ({users, usersTweeds}, props) {
  console.info('mapping state to UserContainer')
  console.info(users)
  const userTweeds = usersTweeds[props.match.params.uid]
  const user = users[props.match.params.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    error: users.error || usersTweeds.error,
    isFetching: users.isFetching || usersTweeds.isFetching,
    tweedIds: userTweeds ? userTweeds.tweedIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedTweeds: userTweeds ? userTweeds.lastUpdated : 0,
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...usersActionCreators, ...usersTweedsActionsCreators}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserContainer))
