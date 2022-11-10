const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const User = require('./userSchema')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

app.post('/api/v1', async (req, res) => {
  const { email, name } = req.body
  try {
    const user = await User.create({ name, email })
    res.status(201).json({ msg: 'Data saved' })
  } catch (error) {
    res.status(501).json({ msg: 'Something went wrong' })
  }
})

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log('connected to DB')
    })
    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`)
    )
  } catch (error) {}
}

start()
