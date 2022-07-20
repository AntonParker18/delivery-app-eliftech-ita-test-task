const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./router/routes')
const path = require('path')

const DB_URL =
  'mongodb+srv://antonparker:123qwe123@cluster0.xc3w1ba.mongodb.net/?retryWrites=true&w=majority'
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(cors('*'))

app.use(express.static(path.join(__dirname, '../client')))

app.use('/api', routes)

mongoose.connect(
  DB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) {
      throw new Error(err)
    }
    console.log('DB connected')
    app.listen(port, () => console.log(`Server started on port ${port}`))
  }
)
