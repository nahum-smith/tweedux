import React from 'react'
import PropTypes from 'prop-types'
import { formatTimeStamp } from 'helpers/utils'
import {
  tweedContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'
import Reply from 'react-icons/lib/md/reply'
import Star from 'react-icons/lib/fa/star'

export default function Tweed (props) {
  const starIcon = props.isLiked === true ? likedIcon : icon
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike

  return (
    <div
      className={ tweedContainer }
      style={ {cursor: props.hideReplyBtn === true ? 'default' : 'pointer'} }
      onClick={ props.onClick }>
      <img src={ props.tweed.avatar } className={ avatar } />
      <div className={ contentContainer }>
        <div className={ header }>
          <div onClick={ props.goToProfile } className={ author }>{ props.tweed.name }</div>
          <div>{ formatTimeStamp(props.tweed.timestamp) }</div>
        </div>
        <div className={ text }>{ props.tweed.text }</div>
        <div className={ likeReplyContainer }>
          { props.hideReplyBtn === true
            ? null
            : <Reply className={ icon } />}
          <div className={ actionContainer }>
            <Star className={ starIcon } onClick={ (e) => starFn(props.tweed.tweedId, e) }/>
            { props.hideLikeCount === true ? null : <div>{ props.numberOfLikes}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

Tweed.propTypes = {
  tweed: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    tweedId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired,
}
