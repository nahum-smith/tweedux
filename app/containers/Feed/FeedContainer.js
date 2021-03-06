import React from 'react'
import PropTypes from 'prop-types'
import { Feed } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { container } from './styles.css'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends React.Component {
  static propTypes = {
    newTweedsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewTweedsAvailable: PropTypes.func.isRequired,
    tweedIds: PropTypes.array.isRequired,
  }
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <div className={ container }>
        <Feed
          newTweedsAvailable={ this.props.newTweedsAvailable }
          error={ this.props.error }
          isFetching={ this.props.isFetching }
          resetNewTweedsAvailable={ this.props.resetNewTweedsAvailable }
          tweedIds={ this.props.tweedIds } />
      </div>
    )
  }
}

const mapStateToProps = ({ feed }) => {
  const { newTweedsAvailable, error, isFetching, tweedIds } = feed
  return {
    newTweedsAvailable,
    error,
    isFetching,
    tweedIds,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(feedActionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer)
