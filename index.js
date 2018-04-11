if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load()
}

if (!process.env.DARKSKY_API_KEY) {
	console.error('No environment variable DARKSKY_API_KEY. Darksky API key is required.')
	process.exit()
}

if (!process.env.GOOGLE_API_KEY) {
	console.error('No environment variable GOOGLE_API_KEY. Google Geocoding API key is required.')
	process.exit()
}

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

const geocode = require('./modules/geocode')
const weather = require('./modules/weather')

app.set('port', process.env.PORT || 60001)

// Allow CORS (cross-origin resource sharing).
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

// parse application/json
app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/client/build'))

app.get('/api/location', async (req, res) => {
	const text = req.query.text
	const locations = await geocode.getLocations(text)

	if (locations.error) {
		console.log(locations.error.msg)
		return res.status(500).send({
			error: locations.error,
		})
	}

	res.status(200).send(locations)
})

app.post('/api/weather', async (req, res) => {
	const location = req.body
	let weatherData = {}

	if (process.env.USE_STATIC_WEATHER) {
		weatherData = JSON.parse(fs.readFileSync(__dirname + '/test/weather.json'))
	} else {
		weatherData = await weather.getData(location.lat, location.lng)
	}

	res.status(200).send({
		current: weatherData.current,
		days: weatherData.days,
		hours: weatherData.hours,
	})
})

app.listen(app.get('port'), () => {
	console.log(`Weather API is listening on port ${app.get('port')}`)
})
