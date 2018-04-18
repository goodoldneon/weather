const axios = require('axios')

const getLocations = async text => {
  /*
	Returns an array of locations using Google's Geocode API.
*/

  const key = process.env.GOOGLE_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${text}`
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

module.exports = {
  getLocations,
}
