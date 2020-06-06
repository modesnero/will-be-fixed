import React, { Component } from 'react'
import { Container, Col, Row, Button, Image } from 'react-bootstrap'

export default class CabinetPage extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col className="col-0">
            <h3>
              Фамилия: <b>Наговицын</b>
            </h3>
            <h3>
              Имя: <b>Владислав</b>
            </h3>
            <br />
            <h3>
              Колчество ваших голосов: <b>0</b>
            </h3>
            <h3>
              Вы отдали свой голос - <b>Адель Ярова</b>
            </h3>
            <br />
            <Button className='mr-3 bg'>Сменить почту</Button>
            <Button>Сменить пароль</Button>
          </Col>
          <Col className="p-3">
            <Image src="avatar.jpg" rounded />
          </Col>
        </Row>
      </Container>
    )
  }
}
