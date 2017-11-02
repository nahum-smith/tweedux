import React from 'react'
import { Feed } from 'components'
import { container } from './styles.css'

class FeedContainer extends React.Component {
  render () {
    return (
      <div className={ container }>
        <Feed />
      </div>
    )
  }
}

export default FeedContainer
