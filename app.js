const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/notes', require('./routes/notes.routes'))

// Send static files on Prod
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

async function start () {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`))
  } catch (err) {
    console.error('Server Error', err.message)
    process.exit(1)
  }
}

start()
