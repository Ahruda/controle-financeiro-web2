const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// Static
app.use(express.static('src/public'))
app.use(express.static('src/images'))

app.set('views', 'src/views')

app.engine('handlebars', expressHandlebars.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/sobre', (req, res) => {
  res.render('sobre')
})

app.get('/contato', (req, res) => {
  res.render('contato')
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login', layout: 'login' });
})

app.get('/cadastro', (req, res) => {
  res.render('cadastro', { title: 'Cadastro', layout: 'login' });
})

const port = 3001
app.listen(port, () => {
  console.log('O servidor está atuando na porta ' + port)
})
