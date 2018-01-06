const axios = require('axios')

const getPointFromZip = async (zip) => {
    const key = process.env.GOOGLE_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${zip}`
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
		return {
			error: {
				msg: `Zip "${zip}" not found`
			}
		}
    } else if (res.data.error_message) {
		return {
			error: {
				msg: res.data.error_message
			}
		}
    }

    const data = res.data.results[0]

    return {
		name: data.formatted_address,
		lat: data.geometry.location.lat,
		lng: data.geometry.location.lng,
    }
}

module.exports = {
    getPointFromZip
}
