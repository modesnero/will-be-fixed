import React, { Component } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'

export default class HeaderSearchForm extends Component {
  state = { searchValue: '' }

  searchFieldChange = event => {
    this.setState({ searchValue: event.target.value })
  }

  submit = event => {
    event.preventDefault()
    const { setSearchValue, navClose } = this.props

    setSearchValue(this.state.searchValue)
    this.setState({ searchValue: '' })
    navClose()
  }

  render () {
    const { searchValue } = this.state
    return (
      <Form inline onSubmit={this.submit}>
        <FormControl
          type='text'
          placeholder='Поиск по записям'
          className='mt-2 mb-2 mr-2'
          value={searchValue}
          onChange={this.searchFieldChange}
        />

        <Button variant='secondary' className='mt-2 mb-2' type='submit'>
          Поиск
        </Button>
      </Form>
    )
  }
}
