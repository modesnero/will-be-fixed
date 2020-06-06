const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, surname } = req.body

    // Check on already exist account
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    // Hash password & chreate user
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
      name,
      surname,
      vote: 0,
      myVoteEmail: ''
    })

    // Save user in DB & response
    await user.save()
    res.status(201).json({ message: 'Пользователь успешно зарегестрирован' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.get('/vote', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    const { vote } = await User.find({ email })
    res.json(vote)
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.put('/vote', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const { name, surname } = req.body

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })
    const { email } = jwt.verify(token, config.get('jwtSecret'))

    const userVoting = User.findOne({ email })
    const userTarget = User.findOne({ name, surname })

    // delete previos vote
    const curVoteVoting = User.findOne({ email: userVoting.myVoteEmail }).vote
    User.updateOne(
      { email: userVoting.myVoteEmail },
      { vote: curVoteVoting - 1 }
    )

    // add new vote
    const curVoteTarget = User.findOne({ email: userTarget }).vote
    User.updateOne({ email: userTarget }, { vote: curVoteTarget + 1 })
    res.json({ message: 'Ваш голос был успешно изменён' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check user on DB
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const { name, surname } = user

    // Check user password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Некорректный пароль' })
    }

    // Create auth token
    const token = jwt.sign({ email }, config.get('jwtSecret'), {
      expiresIn: '1800 days'
    })
    res.json({ token, name, surname })
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
})

module.exports = router
