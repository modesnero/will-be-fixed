import React from 'react'
import { Card, Button } from 'react-bootstrap'

import moment from 'moment'
import 'moment/locale/ru'

export default function NoteCard (props) {
  const { id, title, text, deleteNote, editNote, date } = props

  const dateStr = moment(date)
    .locale('ru')
    .format('LLLL')

  return (
    <>
      <Card className='mb-4' bg='secondary'>
        <Card.Header>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{dateStr}</Card.Subtitle>
        </Card.Header>

        <Card.Body>
          <Card.Text>{text}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <Button
            variant='light'
            size='sm'
            className='mr-3'
            onClick={() => editNote(id)}
          >
            Редактировать
          </Button>
          <Button variant='light' size='sm' onClick={() => deleteNote(id)}>
            Удалить
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}
