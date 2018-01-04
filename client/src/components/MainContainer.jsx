import React, { Component } from 'react'
import axios from 'axios'
import '../css/weather-icons.min.css'

import WeatherCurrent from './WeatherCurrent'
import HourlyChart from './HourlyChart'

class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
			location: {},
			current: {},
			days: [],
			hours: [],
		}
	}

	componentWillMount() {
		this.getWeather(48105)
	}

	getWeather = async (zip) => {
		const url = `http://localhost:60001/api?zip=${zip}`

		const res = await axios.get(url)

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

		console.log(res.data)
	}

	render() {
		const hourlyChartData = this.state.hours.map(a => {
			return {
				x: a.time,
				y: a.temperature.actual,
			}
		})

		return (
			<div style={{width: '600px', margin: 'auto'}}>
				{this.state.current !== undefined && this.state.days !== undefined &&
					<WeatherCurrent
						current={this.state.current}
						day={this.state.days[0]}
					/>
				}

				<HourlyChart data={hourlyChartData} />
			</div>
		)
  	}
}

export default MainContainer
