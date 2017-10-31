import React from 'react'
import { Home } from 'components'
import { container } from './styles.css'

class HomeContainer extends React.Component {
  render () {
    return (
      <div className={ container }>
        <Home />
      </div>
    )
  }
}

export default HomeContainer
