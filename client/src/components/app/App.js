import React, { Component } from 'react'

import AuthPage from '../auth-page'
import NotesPage from '../notes-page'

export default class App extends Component {
  state = {
    token: localStorage.token ? localStorage.token : ''
  }

  setToken = token => {
    this.setState({ token })
    localStorage.token = token
  }

  render () {
    const { token } = this.state

    return (
      <>
        {token ? (
          <NotesPage setToken={this.setToken} token={token} />
        ) : (
          <AuthPage setToken={this.setToken} />
        )}
      </>
    )
  }
}
