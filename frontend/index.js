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

const port = 3000
app.listen(3000, () => {
  console.log('O servidor está atuando na porta ' + port)
})
