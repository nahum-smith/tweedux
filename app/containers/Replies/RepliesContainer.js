import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Replies } from 'components'
import { staleReplies } from 'helpers/utils'
import { connect } from 'react-redux'
import * as repliesActionCreators from 'redux/modules/replies'

class RepliesContainer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    tweedId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired,
  }
  static defaultProps = {
    lastUpdated: 0,
    replies: {},
  }
  componentDidMount () {
    if (staleReplies(this.props.lastUpdated) || (!this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.tweedId)
    }
  }
  render () {
    console.info('props', this.props)
    return (
      <Replies
        isFetching={ this.props.isFetching }
        error={ this.props.error }
        lastUpdated={ this.props.lastUpdated }
        replies={ this.props.replies } />
    )
  }
}

function mapStateToProps (state, props) {
  const tweedRepliesInfo = state.replies[props.tweedId] || {}
  const { lastUpdated, replies } = tweedRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer)
