const fs = require('fs')
const path = require('path')
const axios = require('axios')

const config = require('../config')

const parseHour = raw => {
  return {
    time: new Date(0).setUTCSeconds(raw.time),
    summary: raw.summary,
    icon: raw.icon,
    temperature: raw.temperature,
    precip: raw.precipProbability,
    wind: raw.windSpeed,
  }
}

const parseDay = raw => {
  return {
    time: new Date(0).setUTCSeconds(raw.time),
    summary: raw.summary,
    icon: raw.icon,
    sunrise: new Date(0).setUTCSeconds(raw.sunriseTime),
    sunset: new Date(0).setUTCSeconds(raw.sunsetTime),
    moonPhase: raw.moonPhase,
    temperature: {
      actual: {
        low: raw.temperatureLow,
        high: raw.temperatureHigh,
      },
      apparent: {
        low: raw.apparentTemperatureLow,
        high: raw.apparentTemperatureHigh,
      },
    },
    precip: {
      type: raw.precipType,
      probability: raw.precipProbability,
      accumulation: raw.precipAccumulation,
    },
    humidity: raw.humidity,
    cloudCover: raw.cloudCover,
    wind: {
      speed: raw.windSpeed,
      gust: raw.windGust,
      bearing: raw.windBearing,
    },
  }
}

const getLocation = async placeId => {
  placeId = encodeURIComponent(placeId)

  const key = config.googlePlaceApiKey
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&placeid=${placeId}`
  let res = null

  try {
    res = await axios.get(url)
  } catch (error) {
    return {
      error: {
        message: `Google Place API error: ${error.message}`,
      },
    }
  }

  return res.data.result.geometry.location
}

const getData = async (lat, lng) => {
  const key = config.darkskyApiKey
  const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?exclude=[minutely]&units=us`
  let res = null

  try {
    res = await axios.get(url)
  } catch (error) {
    return {
      error: {
        message: `Dark Sky API error: ${error.message}`,
      },
    }
  }

  const current = res.data.currently
  const days = []
  const hours = []

  for (const day of res.data.daily.data) {
    days.push(parseDay(day))
  }

  for (const hour of res.data.hourly.data) {
    hours.push(parseHour(hour))
  }

  return {
    current: {
      summary: current.summary,
      icon: current.icon,
      temperature: {
        actual: current.temperature,
        apparent: current.apparentTemperature,
      },
      humidity: current.humidity,
      cloudCover: current.cloudCover,
      wind: {
        speed: current.windSpeed,
        gust: current.windGust,
        bearing: current.windBearing,
      },
    },
    days: days,
    hours: hours,
  }
}

const getDataStatic = async () => {
  const staticDataPath = path.join(__dirname, '..', 'test', 'weather.json')

  return JSON.parse(fs.readFileSync(staticDataPath))
}

module.exports = async (req, res) => {
  const placeId = req.body.placeId
  let data = null

  if (config.useStaticWeather) {
    data = await getDataStatic()
  } else {
    location = await getLocation(placeId)
    data = await getData(location.lat, location.lng)
  }

  if (data.error) {
    return res.status(500).send({
      error: data.error,
    })
  }

  res.json({
    location,
    current: data.current,
    days: data.days,
    hours: data.hours,
  })
}
