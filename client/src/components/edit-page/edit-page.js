import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import FormInput from '../form-input'
import FormTextarea from '../form-textarea'

export default class EditPage extends Component {
  constructor ({ editNote, name, surname }) {
    super()
    const { title, text, date } = editNote.note
    this.state = { title, text, date, name, surname }
  }

  apiService = new ApiService()

  onFieldChange = (event, fieldName) => {
    if (fieldName === 'title') {
      this.setState({ title: event.target.value })
    } else if (fieldName === 'text') {
      this.setState({ text: event.target.value })
    }
  }

  submit = async event => {
    event.preventDefault()

    const { editNote, token, loadNotes, setPage, setAlert } = this.props
    const { _id, email } = editNote
    const updatedNote = { _id, email, note: this.state }

    setPage('home')
    await loadNotes(this.apiService.updateNote, token, _id, updatedNote)
    setAlert(true, 'Запись была отредактирована', 'info')
  }

  render () {
    const { title, text } = this.state
    return (
      <>
        <Row>
          <Col>
            <Form onSubmit={this.submit}>
              <FormInput
                type='text'
                field='title'
                title='Название'
                placeholder='Введите название'
                value={title}
                onFieldChange={this.onFieldChange}
              />
              <FormTextarea
                field='text'
                rows='5'
                title='Текст записи'
                placeholder='Введите текст записи'
                value={text}
                onFieldChange={this.onFieldChange}
              />

              <Button type='submit' variant='primary' block>
                Сохранить
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
