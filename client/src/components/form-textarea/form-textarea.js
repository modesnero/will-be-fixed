import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormTextarea (props) {
  const { onFieldChange, field, title, value, placeholder, rows } = props

  return (
    <Form.Group controlId='exampleForm.ControlTextarea1'>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as='textarea'
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={event => onFieldChange(event, field)}
      />
    </Form.Group>
  )
}
