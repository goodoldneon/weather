const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const config = require('./config')
const routes = require('./routes')

app.set('port', config.port)

app.use(cors())
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.use('/', routes)

app.listen(app.get('port'), () => {
  console.log(`Weather API is listening on port ${app.get('port')}`)
})
