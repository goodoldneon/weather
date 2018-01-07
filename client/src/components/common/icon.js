const getIconName = (icon) => {
	const iconTranslate = {
		'clear-day': 'day-sunny',
		'clear-night': 'night-clear',
		rain: 'raindrop',
		snow: 'snow',
		sleet: 'sleet',
		wind: 'windy',
		fog: 'fog',
		cloudy: 'cloudy',
		'partly-cloudy-day': 'day-cloudy',
		'partly-cloudy-night': 'night-alt-cloudy',
		hail: 'hail',
		thunderstorm: 'thunderstorm',
		tornado: 'tornado',
	}

	return `wi-${(iconTranslate[icon] || 'na')}`
}

export {
	getIconName as default,
	getIconName,
}
