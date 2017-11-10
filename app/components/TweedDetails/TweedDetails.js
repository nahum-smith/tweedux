import React from 'react'
import PropTypes from 'prop-types'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'
import { TweedContainer, RepliesContainer } from 'containers'
import { formatReply } from 'helpers/utils'
import { addAndHandleReply } from 'redux/modules/replies'

function Reply ({ submit }) {
  function handleSubmit (e) {
    if (Reply.ref.value.length === 0) {
      return
    }
    submit(Reply.ref.value, e)
    Reply.ref.value = ''
  }

  return (
    <div className={ replyTextAreaContainer }>
      <textarea
        ref={ (ref) => (Reply.ref = ref) }
        className={ replyTextArea }
        maxLength={ 140 }
        type='text'
        placeholder='Your response'/>
      <button onClick={ handleSubmit } className={ darkBtn }>{'submit reply'}</button>
    </div>
  )
}

Reply.propTypes = {
  submit: PropTypes.func.isRequired,
}

const TweedDetails = ({ isFetching, tweedId, authedUser, error, addAndHandleReply }) => {
  return (
    <div className={ mainContainer }>
      { isFetching === true
        ? <p className={ subHeader }>{'fetching'}</p>
        : <div className={ container }>
          <div className={ content }>
            <TweedContainer tweedId={ tweedId } hideLikeCount={ false } hideReplyBtn={ true }/>
            <Reply submit={ (replyText) => addAndHandleReply(tweedId, formatReply(authedUser, replyText)) }/>
          </div>
          <div className={ repliesContainer }>
            <RepliesContainer tweedId={ tweedId }/>
          </div>
        </div>}
      {error ? <p className={ errorMsg }>{ error }</p> : null}
    </div>
  )
}
TweedDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  tweedId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default TweedDetails
