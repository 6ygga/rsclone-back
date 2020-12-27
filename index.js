const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)
app.use(userRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://rscloneback:rscloneback1@cluster0.4up0b.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
