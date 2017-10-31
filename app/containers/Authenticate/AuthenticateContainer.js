import React from 'react'
import { Authenticate } from '../../components'
import auth from '../../helpers/auth'

class AuthenticateContainer extends React.Component {
  handleAuth = () => {
    auth().then((user) => {
      console.info(user)
    })
  }
  render () {
    return (
      <div>
        <Authenticate
          isFetching={ false }
          error={ '' }
          onAuth={ this.handleAuth }/>
      </div>
    )
  }
}

export default AuthenticateContainer
