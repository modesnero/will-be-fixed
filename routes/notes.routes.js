const { Router } = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const Note = require('../models/Note')

const router = Router()

router.post('/', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const { note } = req.body

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    // Create note object
    const newNote = new Note({ email, note })

    // Save note in DB
    await newNote.save()
    res.status(201).json({ message: 'Заметка была успешно создана' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.get('/', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })

    // Find & send notes
    const result = await Note.find()
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const { id } = req.params

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    // Find & send note
    const result = await Note.findOne({ email, _id: id })
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const { id } = req.params

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    // Delete note
    await Note.findOneAndDelete({ email, _id: id })
    res.json({ message: 'Заметка была успешно удалена' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const {
      note: { note }
    } = req.body
    const { id } = req.params

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    // Update note
    await Note.updateOne({ email, _id: id }, { note })
    res.json({ message: 'Заметка была успешно обновлена' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router
