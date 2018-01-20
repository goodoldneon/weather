require('dotenv').config()

const axios = require('axios')

const parseHour = (raw) => {
	return {
		time: new Date(0).setUTCSeconds(raw.time),
		icon: raw.icon,
		temperature: {
			actual: raw.temperature,
			apparent: raw.apparentTemperature,
		},
		precip: {
			type: raw.precipType,
			probability: raw.precipProbability,
		},
		wind: {
			speed: raw.windSpeed,
		},
	}
}

const parseDay = (raw) => {
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

const getData = async (lat, lng) => {
	const key = process.env.DARKSKY_API_KEY
	const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?exclude=[minutely]&units=us`
	const res = await axios.get(url)

	if (res.status !== 200) {
		console.log(`Weather not found for zip "${zip}"`)

		return {}
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

module.exports = {
	getData,
}
