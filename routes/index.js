const routes = require('express').Router()

const location = require('./location')
const weather = require('./weather')

routes.get('/api/location', location)
routes.post('/api/weather', weather)

module.exports = routes
