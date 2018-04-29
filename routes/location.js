const axios = require('axios')

const config = require('../config')

const getLocations = async text => {
  /*
	Returns an array of locations using Google's Geocode API.
*/

  const key = config.googleGeocodeApiKey
  const address = encodeURIComponent(text)
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${address}`
  let res = null

  try {
    res = await axios.get(url)
  } catch (error) {
    return {
      error: {
        message: `Google Geocode API error: ${error.message}`,
      },
    }
  }

  if (res.data.status !== 'OK') {
    return {
      error: {
        message: `Google Geocode API error: ${res.data.error_message}`,
      },
    }
  }

  return res.data.results.map(result => {
    return {
      name: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    }
  })
}

module.exports = async (req, res) => {
  const text = req.query.text
  const data = await getLocations(text)

  if (data.error) {
    return res.status(500).send({
      error: data.error,
    })
  }

  res.json(data)
}
