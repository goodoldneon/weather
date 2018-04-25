if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const geocode = require('./modules/geocode')
const weather = require('./modules/weather')

if (!process.env.DARKSKY_API_KEY) {
  console.error('No environment variable DARKSKY_API_KEY. Darksky API key is required.')
  process.exit()
}

if (!process.env.GOOGLE_API_KEY) {
  console.error('No environment variable GOOGLE_API_KEY. Google Geocoding API key is required.')
  process.exit()
}

app.set('port', process.env.PORT || 60001)

app.use(cors())
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('/api/location', async (req, res) => {
  const text = req.query.text
  const data = await geocode.getLocations(text)

  if (data.error) {
    return res.status(500).send({
      error: data.error,
    })
  }

  res.json(data)
})

app.post('/api/weather', async (req, res) => {
  const location = req.body
  let data = null

  if (process.env.USE_STATIC_WEATHER) {
    data = await weather.getDataStatic()
  } else {
    data = await weather.getData(location.lat, location.lng)
  }

  if (data.error) {
    return res.status(500).send({
      error: data.error,
    })
  }

  res.json({
    current: data.current,
    days: data.days,
    hours: data.hours,
  })
})

app.listen(app.get('port'), () => {
  console.log(`Weather API is listening on port ${app.get('port')}`)
})
