const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  email: { type: String, required: true },
  note: {
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
  }
})

module.exports = model('Note', noteSchema)
