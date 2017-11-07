import React from 'react'
import PropTypes from 'prop-types'
import { newTweedContainer, header } from './styles.css'
import { TweedContainer } from 'containers'
import { errorMsg } from 'sharedStyles/styles.css'

NewTweedsAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

function NewTweedsAvailable ({handleClick}) {
  return (
    <div className={ newTweedContainer } onClick={ handleClick }>
      {'New Tweeds Available'}
    </div>
  )
}

const Feed = (props) => (
  props.isFetching === true
    ? <h1 className={ header }>{'Fetching'}</h1>
    : <div>
      {props.newTweedsAvailable ? <NewTweedsAvailable handleClick={ props.resetNewTweedsAvailable } /> : null}
      {props.tweedIds.length === 0
        ? <p className={ header }>{'This is unfortunate.'} <br /> {'It appears there are no Tweeds yet 😞'}</p>
        : null}
      {props.tweedIds.map((id) => (
        <TweedContainer
          tweedId={ id }
          key={ id } />
      ))}
      {props.error ? <p className={ errorMsg }>{props.error}</p> : null}
    </div>
)

Feed.propTypes = {
  tweedIds: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newTweedsAvailable: PropTypes.bool.isRequired,
  resetNewTweedsAvailable: PropTypes.func.isRequired,
}

export default Feed
