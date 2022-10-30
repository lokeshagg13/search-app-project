/* eslint-disable no-console */
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app')

// DB Connection
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database Connected'))

// Setting up port
const port = process.env.PORT // Assign Port
app.listen(port, () => {
  console.log(`App Running On Port: ${port} ...`)
})
