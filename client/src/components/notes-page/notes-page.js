import React, { Component } from 'react'
import { Container, Spinner } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import Header from '../header'
import NotesList from '../notes-list'
import SearchView from '../search-view'
import AddPage from '../add-page'
import EditPage from '../edit-page'
import Alert from '../alert'

export default class NotesPage extends Component {
  state = {
    notes: [],
    page: localStorage.page ? localStorage.page : 'home',
    alert: { isShow: false, message: '', color: '' },
    alertInterval: null,
    editNote: {},
    searchValue: '',
    loading: false
  }

  apiService = new ApiService()

  componentDidMount = async () => this.loadNotes()

  setPage = page => this.setState({ page })

  setLoading = loading => this.setState({ loading })

  setSearchValue = searchValue => {
    if (this.state.notes.length) this.setState({ searchValue })
  }

  setAlert = (isShow, message, color) => {
    if (isShow) {
      clearTimeout(this.state.alertInterval)
      this.setState({
        alertInterval: setTimeout(() => this.setAlert(false, '', ''), 5000)
      })
    }
    this.setState({ alert: { isShow, message, color } })
  }

  loadNotes = async (action, ...args) => {
    try {
      this.setLoading(true)
      if (action) await action(...args)

      const { result: notes } = await this.apiService.getNote(this.props.token)
      this.setState({ notes })

      this.setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  clickEdit = editId => {
    const { notes } = this.state
    const editNote = notes.find(item => (item._id === editId ? true : false))
    this.setState({ editNote })
    this.setPage('edit')
  }

  deleteNote = async deleteId => {
    try {
      await this.loadNotes(
        this.apiService.deleteNote,
        this.props.token,
        deleteId
      )
      this.setAlert(true, 'Заметка была удалена', 'danger')
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { setToken, token, name, surname } = this.props
    const { notes, page, searchValue, alert, editNote, loading } = this.state

    const spinnerView = (
      <h3>
        <Spinner animation='border' className='mr-3' /> Загрузка...
      </h3>
    )

    return (
      <>
        <Header
          setToken={setToken}
          setSearchValue={this.setSearchValue}
          setPage={this.setPage}
        />

        <Container>
          {alert.isShow && page === 'home' ? (
            <Alert
              message={alert.message}
              variant={alert.color}
              setAlert={this.setAlert}
              setAlertInterval={this.setAlertInterval}
            />
          ) : null}

          {searchValue ? (
            <SearchView
              searchValue={searchValue}
              setSearchValue={this.setSearchValue}
            />
          ) : null}

          {page === 'home' && !loading ? (
            <NotesList
              notes={notes}
              userName={name}
              userSurname={surname}
              setPage={this.setPage}
              deleteNote={this.deleteNote}
              editNote={this.clickEdit}
              searchValue={searchValue}
            />
          ) : null}

          {page === 'home' && loading ? spinnerView : null}

          {page === 'add' ? (
            <AddPage
              token={token}
              setPage={this.setPage}
              loadNotes={this.loadNotes}
              setAlert={this.setAlert}
              name={name}
              surname={surname}
            />
          ) : null}

          {page === 'edit' ? (
            <EditPage
              token={token}
              setPage={this.setPage}
              loadNotes={this.loadNotes}
              setAlert={this.setAlert}
              editNote={editNote}
              name={name}
              surname={surname}
            />
          ) : null}
        </Container>
      </>
    )
  }
}
