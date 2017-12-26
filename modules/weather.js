require('dotenv').config()

const axios = require('axios')

const getForecast = async (lat, lng) => {
    const key = process.env.DARKSKY_API_KEY
    const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?exclude=[minutely,hourly,daily]`

    const res = await axios.get(
      url,
      {
        crossdomain: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
      },
    )
  
    if (res.status !== 200) {
      console.log(`Weather not found for zip "${zip}"`)
  
      return {}
    }
  
    // const obj = res.data.results[0]
  
    return res.data
}

module.exports = {
    getForecast
}