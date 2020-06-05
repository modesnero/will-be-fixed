import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default function SearchView ({ searchValue, setSearchValue }) {
  return (
    <>
      <Row className='mb-4'>
        <Col>
          <h3>Результаты поиска: "{searchValue}"</h3>
        </Col>
        <Col md='auto'>
          <Button variant='primary' onClick={() => setSearchValue('')}>
            Отменить поиск
          </Button>
        </Col>
      </Row>
    </>
  )
}
