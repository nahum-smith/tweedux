import React from 'react'
import PropTypes from 'prop-types'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'
import { TweedContainer } from 'containers'

const User = (props) => {
  console.info(props)
  return (
    props.noUser === true
      ? <p className= { header }>{'This user does not exist'}</p>
      : <div>
        {props.isFetching === true
          ? <p className={ header }>{'Loading'}</p>
          : <div>
            <div className={ userContainer }>
              <div>{ props.name }</div>
            </div>
            {props.tweedIds.map((id) => (
              <TweedContainer tweedId={ id } key={ id } />
            ))}
            { props.tweedIds.length === 0
              ? <p className={ header }>{`It looks like ${props.name.split(' ')[0]} has yet to make a tweed!`}</p>
              : null}
          </div>}
        { props.error ? <p className={ errorMsg }>{ props.error }</p> : null}
      </div>
  )
}

User.propTypes = {
  uid: PropTypes.string,
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  tweedIds: PropTypes.array.isRequired,
}

export default User
