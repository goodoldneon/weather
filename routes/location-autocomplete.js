const axios = require('axios')

const config = require('../config')

const getLocations = async text => {
  /*
	Returns an array of locations using Google's Geocode API.
*/

  const key = config.googlePlaceApiKey
  const input = encodeURIComponent(text)
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${input}`
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

  return res.data.predictions.map(result => {
    return {
      name: result.description,
      placeId: result.place_id,
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
