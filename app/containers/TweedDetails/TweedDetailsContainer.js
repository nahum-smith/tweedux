import React from 'react'
import PropTypes from 'prop-types'
import { TweedDetails } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as tweedActionCreators from 'redux/modules/tweeds'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class TweedDetailsContainer extends React.Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    tweedId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    tweedAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleTweed: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired,
  }
  componentDidMount () {
    this.props.initLikeFetch(this.props.tweedId)
    if (this.props.tweedAlreadyFetched === false) {
      this.props.fetchAndHandleTweed(this.props.tweedId)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    const { authedUser, tweedId, isFetching, error, addAndHandleReply } = this.props
    return (
      <div>
        <TweedDetails
          addAndHandleReply={ addAndHandleReply }
          tweedId={ tweedId }
          authedUser={ authedUser }
          error={ error }
          isFetching={ isFetching }/>
      </div>
    )
  }
}
function mapStateToProps ({ tweeds, likeCount, users }, props) {
  const tweedId = props.match.params.tweedId
  return {
    isFetching: tweeds.isFetching || likeCount.isFetching,
    error: tweeds.error,
    authedUser: users[users.authedId].info,
    tweedId: tweedId,
    tweedAlreadyFetched: !!tweeds[tweedId],
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators({...tweedActionCreators, ...likeCountActionCreators, ...repliesActionCreators}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TweedDetailsContainer))
