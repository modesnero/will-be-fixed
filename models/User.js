const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  vote: { type: Number, required: true },
  myVoteEmail: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true }
})

module.exports = model('User', userSchema)
