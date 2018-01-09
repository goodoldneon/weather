import React, { Component } from 'react'
import axios from 'axios'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.min.css'

import LocationSearch from './LocationSearch'
import WeatherCurrent from './WeatherCurrent'
import { ForecastDays } from './ForecastDays'
import WeatherActive from './WeatherActive'
// import HourlyChart from './HourlyChart'

class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
			location: null,
			current: null,
			days: [],
            hours: [],
            activeDayIndex: 0,
		}
	}

	componentWillMount() {
		// Location on initial page load.
		const locationDefault = {
			name: 'Ann Arbor, MI 48105, USA',
			lat: 42.3295957,
			lng: -83.7092861,
		}

		this.getWeather(locationDefault)
	}

	getWeather = async (location) => {
		const url = `http://localhost:60001/api/weather`
		const res = await axios.post(url, location)

		if (res.error) {
			console.log(res.error.msg)
			return
		}

		this.setState({
			location: res.data.location,
			current: res.data.current,
			days: res.data.days,
			hours: res.data.hours,
		})
	}

	render() {
		// const hourlyChartData = this.state.hours.map(a => {
		// 	return {
		// 		x: a.time,
		// 		y: a.temperature.actual,
		// 	}
        // })
		
		const location = (this.state.location ? this.state.location.name : null)
        const current = this.state.current
        const days = this.state.days
        const activeDayIndex = this.state.activeDayIndex

        // Make sure index doesn't go past array length.
        let activeDay = (activeDayIndex <= (days.length + 1)) ? days[activeDayIndex] : null

		return (
			<div style={{width: '600px', margin: 'auto'}}>
				<LocationSearch
					onSelectSearch={location => this.getWeather(location)}
				/>

                <WeatherCurrent
					data={current}
					location={location}
				/>

                {days.length >= 4 &&
                    <ForecastDays
                        days={days.slice(0, 4)}
                        activeDayIndex={activeDayIndex}
                        onChangeActiveDayIndex={val => this.setState({activeDayIndex: val})}
                    />
                }

                <WeatherActive data={activeDay} />
			</div>
		)
  	}
}

export default MainContainer
