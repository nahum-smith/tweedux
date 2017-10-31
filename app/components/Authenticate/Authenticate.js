import React from 'react'
import PropTypes from 'prop-types'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'
import { FacebookAuthButton } from 'components'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

function Authenticate ({ error, isFetching, onAuth }) {
  return (
    <div className={ centeredContainer }>
      <h1 className={ largeHeader }>{'Authenticate'}</h1>
      <FacebookAuthButton
        isFetching={ false }
        onAuth={ onAuth }/>
      {error ? <p className={ errorMsg }>{error}</p> : null}
    </div>
  )
}

export default Authenticate
