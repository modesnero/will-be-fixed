import React, { Component } from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import ApiService from '../../services/api-service'
import FormInput from '../form-input'
import Alert from '../alert'

export default class AuthPage extends Component {
  state = {
    isLogin: true,
    formValue: { email: '', pass: '', confirm: '', name: '', surname: '' },
    btnTitle: { submitBtn: 'Авторизация', toggleBtn: 'Регистрация' },
    alert: { isShow: false, message: '', color: '' },
    alertInterval: null
  }

  apiService = new ApiService()

  setAlert = (isShow, message, color) => {
    const { alertInterval } = this.state
    if (isShow) {
      clearTimeout(alertInterval)
      this.setState({
        alertInterval: setTimeout(() => this.setAlert(false, '', ''), 5000)
      })
    }

    this.setState({ alert: { isShow, message, color } })
  }

  onFieldChange = (event, fieldName) => {
    const { email, pass, confirm, name, surname } = this.state.formValue

    let formValue
    const newValue = event.target.value
    switch (fieldName) {
      case 'email':
        formValue = { email: newValue, pass, confirm, name, surname }
        break
      case 'pass':
        formValue = { pass: newValue, email, confirm, name, surname }
        break
      case 'confirm':
        formValue = { confirm: newValue, email, pass, name, surname }
        break
      case 'name':
        formValue = { name: newValue, email, pass, confirm, surname }
        break
      case 'surname':
        formValue = { surname: newValue, email, pass, confirm, name }
        break
      default:
        console.error('Unexpected field name')
    }

    this.setState({ formValue })
  }

  toggleStatus = () => {
    this.setState(({ btnTitle, isLogin }) => {
      const { toggleBtn, submitBtn } = btnTitle
      return {
        btnTitle: { submitBtn: toggleBtn, toggleBtn: submitBtn },
        alert: { variant: '', message: '', isShow: false },
        isLogin: !isLogin
      }
    })
  }

  register = async (email, password, confirm, name, surname) => {
    if (password !== confirm) {
      this.setAlert(true, 'Пароли не совпадают, повторите попытку', 'danger')
      return
    }

    try {
      const {
        result: { message },
        status
      } = await this.apiService.auth('register', {
        email,
        password,
        name,
        surname
      })

      const color = status === 400 || status === 500 ? 'danger' : 'success'
      this.setAlert(true, message, color)
    } catch (err) {
      console.error(err)
    }
  }

  login = async (email, password) => {
    try {
      const {
        result: { token, message, name, surname },
        status
      } = await this.apiService.auth('login', { email, password })

      if (token) {
        const { setName, setToken } = this.props
        setToken(token)
        setName(name, surname)
      }

      if (message) {
        const color = status === 400 || status === 500 ? 'danger' : 'success'
        this.setAlert(true, message, color)
      }
    } catch (err) {
      console.error(err)
    }
  }

  onSubmit = async event => {
    event.preventDefault()
    const {
      isLogin,
      formValue: { email, pass, confirm, name, surname }
    } = this.state

    this.setState({
      formValue: { email: '', pass: '', confirm: '' },
      alert: { variant: '', message: '', isShow: false }
    })

    isLogin
      ? this.login(email, pass)
      : this.register(email, pass, confirm, name, surname)
  }

  render () {
    const { isLogin, btnTitle, formValue, alert } = this.state

    return (
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col lg='6'>
            <Form onSubmit={this.onSubmit}>
              <h1 className='text-center'>{btnTitle.submitBtn}</h1>

              <FormInput
                type='email'
                field='email'
                title='Email'
                placeholder='Введите email'
                value={formValue.email}
                onFieldChange={this.onFieldChange}
              />

              <FormInput
                type='password'
                field='pass'
                title='Пароль'
                placeholder='Введите пароль'
                value={formValue.pass}
                onFieldChange={this.onFieldChange}
              />

              {!isLogin ? (
                <>
                  <FormInput
                    type='password'
                    field='confirm'
                    title='Проверка пароля'
                    placeholder='Повторите пароль'
                    value={formValue.confirm}
                    onFieldChange={this.onFieldChange}
                  />
                  <FormInput
                    type='text'
                    field='name'
                    title='Имя'
                    placeholder='Введите ваше имя'
                    value={formValue.name}
                    onFieldChange={this.onFieldChange}
                  />
                  <FormInput
                    type='text'
                    field='surname'
                    title='Фамилия'
                    placeholder='Введите вашу фамилию'
                    value={formValue.surname}
                    onFieldChange={this.onFieldChange}
                  />{' '}
                </>
              ) : null}

              <Button type='submit' variant='primary' className='mb-3' block>
                {btnTitle.submitBtn}
              </Button>

              <Button variant='secondary' onClick={this.toggleStatus} block>
                {btnTitle.toggleBtn}
              </Button>
            </Form>

            {alert.isShow ? (
              <Alert variant={alert.color} message={alert.message} />
            ) : null}
          </Col>
        </Row>
      </Container>
    )
  }
}
