import React from 'react'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'

import moment from 'moment'
import 'moment/locale/ru'

export default function NoteCard (props) {
  const {
    id,
    title,
    text,
    deleteNote,
    editNote,
    date,
    name,
    surname,
    userName,
    userSurname,
    addVote
  } = props
  const dateStr = moment(date)
    .locale('ru')
    .format('LLLL')

  const isUserNote = name === userName && surname === userSurname

  return (
    <>
      <Card className='mb-4' bg='secondary'>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {name} {surname}
          </Card.Subtitle>
        </Card.Header>

        <Card.Body>
          <Card.Text>{text}</Card.Text>
        </Card.Body>

        <Card.Footer className='pt-3 pb-3'>
          <Container>
            <Row>
              {isUserNote ? (
                <Col className='ml-0 pl-0'>
                  <Button
                    variant='light'
                    size='sm'
                    className='mr-3'
                    onClick={() => editNote(id)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant='light'
                    size='sm'
                    onClick={() => deleteNote(id)}
                  >
                    Удалить
                  </Button>
                </Col>
              ) : (
                <Col className='ml-0 pl-0'>
                  <Button
                    variant='light'
                    size='sm'
                    className='mr-3'
                    onClick={() => addVote(name, surname)}
                  >
                    Отдать голос
                  </Button>
                </Col>
              )}
              <Col>
                <p className='text-right mb-0'>{dateStr}</p>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </>
  )
}
