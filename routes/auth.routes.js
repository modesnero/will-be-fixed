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

router.get('/vote/:email', async (req, res) => {
  try {
    // Parse request
    const { auth: token } = req.headers
    const { email } = req.params

    // Check auth
    if (!token) return res.status(401).json({ message: 'Ошибка авторизации' })

    const { vote } = await User.findOne({ email })
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

    const userVoting = await User.findOne({ email })
    const userTarget = await User.findOne({ name, surname })

    // delete previos vote
    const userPreviosVote = await User.findOne({
      email: userVoting.myVoteEmail
    })
    await User.updateOne(
      { email: userVoting.myVoteEmail },
      { vote: userPreviosVote.vote - 1 }
    )

    // add new vote
    await User.updateOne(
      { email: userTarget.email },
      { vote: userTarget.vote + 1 }
    )
    await User.updateOne({ email }, { myVoteEmail: userTarget.email })
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
