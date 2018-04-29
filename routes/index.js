const routes = require('express').Router()

const locationAutocomplete = require('./location-autocomplete')
const weather = require('./weather')

routes.get('/api/location-autocomplete', locationAutocomplete)
routes.post('/api/weather', weather)

module.exports = routes
