const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })

  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', text => text.toUpperCase())

app.get('/', (req, res) => {
  // res.send('Hello Express!') // Content-Type: text/html; charset=utf-8
  // res.send('<h1>Hello Express!</h1>') // Content-Type: text/html; charset=utf-8
  // res.send({ a: 1, b: 2}) // Content-Type: application/json; charset=utf-8
  // res.json({ a: 1, b: 2 }) // Content-Type: application/json; charset=utf-8

  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my page'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({ errorMessage: 'Unable to handle request' })
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})
