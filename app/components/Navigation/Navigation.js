import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { container, navContainer, link } from './styles.css'
import { Modal } from 'components'

export default function Navigation ({ isAuthed }) {
  return (
    <div className={ container }>
      <nav className={ navContainer }>
        <NavLinks isAuthed={ isAuthed } />
        <ActionLinks isAuthed={ isAuthed } />
      </nav>
    </div>
  )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
      <li><Link to='/' className={ link }>{'Tweedux'}</Link></li>
      <li><Link to='/feed' className={ link }>{'Dashboard'}</Link></li>
    </ul>
    : <noscript />
}

function ActionLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
      <li><Modal /></li>
      <li><Link to='/logout' className={ link }>{'Logout'}</Link></li>
    </ul>
    : <ul>
      <li><Link to='/' className={ link }>{'Home'}</Link></li>
      <li><Link to='/auth' className={ link }>{'Authenticate'}</Link></li>
    </ul>
}
