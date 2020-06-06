import React, { Component } from 'react'

import AuthPage from '../auth-page'
import NotesPage from '../notes-page'

export default class App extends Component {
  state = {
    token: localStorage.WBFtoken ? localStorage.WBFtoken : '',
    name: localStorage.WBFname ? localStorage.WBFname : '',
    surname: localStorage.WBFsurname ? localStorage.WBFsurname : ''
  }

  setToken = token => {
    this.setState({ token })
    localStorage.WBFtoken = token
  }

  setName = (name, surname) => {
    this.setState({ name, surname })
    localStorage.WBFname = name
    localStorage.WBFsurname = surname
  }

  render () {
    const { token, name, surname } = this.state

    return (
      <>
        {token ? (
          <NotesPage
            name={name}
            surname={surname}
            setToken={this.setToken}
            token={token}
          />
        ) : (
          <AuthPage setToken={this.setToken} setName={this.setName} />
        )}
      </>
    )
  }
}
