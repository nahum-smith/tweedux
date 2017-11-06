import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newTweedTop, pointer, newTweedInputContainer, newTweedInput, submitTweedBtn, darkBtn,
} from './styles.css'
import * as modalActionCreators from 'redux/modules/modal'
import * as tweedActionCreators from 'redux/modules/tweeds'
import { bindActionCreators } from 'redux'
import { formatTweed } from 'helpers/utils'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

class Modal extends React.Component {
  static propTypes = {
    tweedText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateTweedText: PropTypes.func.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
    tweedFanout: PropTypes.func.isRequired,
  }
  submitTweed = () => {
    this.props.tweedFanout(formatTweed(this.props.tweedText, this.props.user))
  }
  render () {
    const { openModal, isOpen, closeModal, updateTweedText, tweedText, isSubmitDisabled } = this.props
    return (
      <div>
        <span className={ darkBtn } onClick={ openModal }>{'Tweed'}</span>
        <ReactModal
          style={ modalStyles }
          isOpen={ isOpen }
          onRequestClose={ closeModal } >
          <div className={ newTweedTop }>
            <span>{'Compose New Tweed'}</span>
            <span onClick={ closeModal } className={ pointer }>{'X'}</span>
          </div>
          <div className={ newTweedInputContainer }>
            <textarea
              onChange={ (e) => updateTweedText(e.target.value) }
              value={ tweedText }
              maxLength={ 140 }
              type='text'
              className={ newTweedInput }
              placeholder="What's on your mind?" />
          </div>
          <button
            className={ submitTweedBtn }
            disabled={ isSubmitDisabled }
            onClick={ this.submitTweed }>
            {'Tweed'}
          </button>
        </ReactModal>
      </div>
    )
  }
}

function mapStateToProps ({modal, users}, props) {
  const tweedTextLength = modal.tweedText === '' ? 0 : modal.tweedText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    tweedText: modal.tweedText,
    isOpen: modal.isOpen,
    isSubmitDisabled: tweedTextLength <= 0 || tweedTextLength > 140,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...modalActionCreators, ...tweedActionCreators}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal)
