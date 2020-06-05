import React, { Component } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import FormInput from '../form-input'
import FormTextarea from '../form-textarea'

export default class AddPage extends Component {
  state = {
    title: '',
    text: ''
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

    const { loadNotes, setPage, token, setAlert } = this.props
    const { title, text } = this.state
    const note = { title, text, date: new Date() }

    try {
      setPage('home')
      await loadNotes(this.apiService.postNote, token, note)
      setAlert(true, 'Запись успешно добавлена', 'success')
    } catch (err) {
      console.error(err)
    }
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
                title='Текст заметки'
                placeholder='Введите текст записи'
                value={text}
                onFieldChange={this.onFieldChange}
              />

              <Button type='submit' variant='primary' block>
                Добавить записб
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}
