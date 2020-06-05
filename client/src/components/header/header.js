import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

import HeaderSearchForm from '../header-search-form'
import HeaderNav from '../header-nav'

export default class Header extends Component {
  state = { expanded: false }

  expandedToggle = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }))
  }

  navClose = () => this.setState({ expanded: false })

  render () {
    const { setSearchValue, setPage, setToken } = this.props
    return (
      <>
        <Navbar
          expand='md'
          bg='primary'
          variant='dark'
          className='mb-5'
          collapseOnSelect={true}
          expanded={this.state.expanded}
        >
          <Navbar.Brand>WillBeFixed</Navbar.Brand>
          <Navbar.Toggle
            onClick={this.expandedToggle}
            aria-controls='responsive-navbar-nav'
          />

          <Navbar.Collapse id='responsive-navbar-nav'>
            <HeaderNav
              setToken={setToken}
              setPage={setPage}
              navClose={this.navClose}
              setSearchValue={setSearchValue}
            />

            <HeaderSearchForm
              navClose={this.navClose}
              setSearchValue={setSearchValue}
            />
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}
