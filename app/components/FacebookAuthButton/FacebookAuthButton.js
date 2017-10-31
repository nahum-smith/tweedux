import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

function FacebookAuthButton ({onAuth, isFetching}) {
  return (
    <button onClick={ onAuth } className={ button }>
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </button>
  )
}

export default FacebookAuthButton
