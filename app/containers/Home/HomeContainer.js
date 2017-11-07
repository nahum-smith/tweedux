import React from 'react'
import { Home } from 'components'
import { container, background } from './styles.css'

class HomeContainer extends React.Component {
  render () {
    return (
      <div className={ background } >
        <div className={ container }>
          <Home />
        </div>
      </div>
    )
  }
}

export default HomeContainer
