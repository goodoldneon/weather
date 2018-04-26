if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const port = process.env.PORT || 60001

const darkskyApiKey = (() => {
  const key = process.env.DARKSKY_API_KEY

  if (!key) {
    console.error('No environment variable DARKSKY_API_KEY. Darksky API key is required.')
    process.exit()
  }

  return key
})()

const googleGeocodeApiKey = (() => {
  const key = process.env.GOOGLE_GEOCODE_API_KEY

  if (!key) {
    console.error(
      'No environment variable GOOGLE_GEOCODE_API_KEY. Google Geocoding API key is required.'
    )

    process.exit()
  }

  return key
})()

const useStaticWeather = (() => {
  const val = process.env.USE_STATIC_WEATHER

  if (typeof val === 'boolean') {
    return val
  } else if (val === undefined) {
    return false
  }

  console.error('Environment variable USE_STATIC_WEATHER must be a boolean value.')

  process.exit()
})()

module.exports = {
  port,
  darkskyApiKey,
  googleGeocodeApiKey,
  useStaticWeather,
}
