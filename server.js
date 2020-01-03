const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const items = require('./routes/api/items')

const app = express()

// body parser (from express)
app.use(express.json())

// DB Config
const db = require('./config/keys').mongoURI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongo DB Connected'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/items', items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        'client',
        'build',
        'index.html'
      )
    )
  })
}

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server started on port ${port}`)
)
