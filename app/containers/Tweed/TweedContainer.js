import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tweed } from 'components'
import { bindActionCreators } from 'redux'
import * as usersLikesAction from 'redux/modules/usersLikes'

class TweedContainer extends React.Component {
  static propTypes = {
    tweed: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    isLiked: PropTypes.bool.isRequired,
    numberOfLikes: PropTypes.number,
    addAndHandleLike: PropTypes.func.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }
  goToProfile = (e) => {
    e.stopPropagation()
    this.props.history.push('/' + this.props.tweed.uid)
  }
  handleClick = (e) => {
    e.preventDefault()
    this.props.history.push('/tweedDetail/' + this.props.tweed.tweedId)
  }
  render () {
    console.info('tweed cont', this.props)
    return (
      <Tweed
        goToProfile={ this.goToProfile }
        onClick={ this.props.hideReplyBtn === true ? null : this.handleClick }
        { ...this.props } />
    )
  }
}

function mapStateToProps ({tweeds, likeCount, usersLikes}, props) {
  return {
    tweed: tweeds[props.tweedId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.tweedId] === true,
    numberOfLikes: likeCount[props.tweedId],
  }
}

export default withRouter(connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(usersLikesAction, dispatch)
)(TweedContainer))
