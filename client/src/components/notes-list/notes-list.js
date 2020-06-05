import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import NoteCard from '../note-card'

export default function NotesList (props) {
  const { notes, deleteNote, editNote, setPage } = props
  let { searchValue } = props

  const filter = (title, text) => {
    searchValue = searchValue.toLowerCase()
    return (
      searchValue === '' ||
      title.toLowerCase().includes(searchValue) ||
      text.toLowerCase().includes(searchValue)
    )
  }

  const items = notes.map(note => {
    const {
      _id: id,
      note: { title, text, date }
    } = note

    const itemView = (
      <NoteCard
        deleteNote={deleteNote}
        editNote={editNote}
        title={title}
        date={date}
        text={text}
        key={id}
        id={id}
      />
    )

    return filter(title, text) ? itemView : null
  })

  const emptyListView = (
    <>
      <h3 className='mb-3'>Каталог заметок пуст</h3>
      <Button onClick={() => setPage('add')}>Добавить заметку</Button>
    </>
  )

  return (
    <>
      <Row>
        <Col>{items.length ? items : emptyListView}</Col>
      </Row>
    </>
  )
}
