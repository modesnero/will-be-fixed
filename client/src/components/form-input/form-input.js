import React from 'react'
import { Form } from 'react-bootstrap'

export default function FormInput (props) {
  const {
    onFieldChange,
    type,
    field,
    title,
    value,
    placeholder,
    mutedText
  } = props

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={event => onFieldChange(event, field)}
      />

      {mutedText ? (
        <Form.Text className='text-muted'>{mutedText}</Form.Text>
      ) : null}
    </Form.Group>
  )
}
