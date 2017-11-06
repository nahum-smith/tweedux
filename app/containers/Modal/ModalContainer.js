// import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'

function mapStateToProps ({modal, users}, props) {
  const tweedTextLength = modal.tweedText === '' ? 0 : modal.tweedText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    tweedText: modal.tweedText,
    isOpen: modal.isOpen,
    isSubmitDisabled: tweedTextLength <= 0 || tweedTextLength > 140,
  }
}
function mapDispatchToProps (dispatch, props) {
  return bindActionCreators(modalActionCreators, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal))
