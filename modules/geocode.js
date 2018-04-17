const axios = require('axios')

const getLocations = async text => {
  /*
	Returns an array of locations using Google's Geocode API.
*/

  const key = process.env.GOOGLE_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${text}`

  const res = await axios.get(url, {
    crossdomain: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })

  if (res.status !== 200) {
    return {
      error: {
        msg: `Google API error`,
      },
    }
  } else if (res.data.error_message) {
    return {
      error: {
        msg: res.data.error_message,
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
