const axios = require('axios')

const getPointFromZip = async (zip) => {
    const url = `http://maps.googleapis.com/maps/api/geocode/json?address=${zip}`
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
      console.log(`Zip "${zip}" not found`)
  
      return {}
    }
  
    const obj = res.data.results[0]
  
    return {
      name: obj.formatted_address,
      lat: obj.geometry.location.lat,
      lng: obj.geometry.location.lng,
    }
}

module.exports = {
    getPointFromZip
}
