import React, { Component } from 'react'
import axios from 'axios'
import '../css/weather-icons.min.css'

import WeatherCurrent from './WeatherCurrent'

class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
			location: {},
			current: {},
			forecast: [],
		}
	}

	componentWillMount() {
		this.getWeather(48105)
	}

	getWeather = async (zip) => {
		const url = `http://localhost:60001/api?zip=${zip}`

		const res = await axios.get(url)

		this.setState({
			location: res.data.location,
			current: res.data.current,
			forecast: res.data.forecast,
		})
		// console.log(res.data)
	  
		// if (res.status !== 200) {
		//   console.log(`Weather not found for zip "${zip}"`)
	  
		//   return {}
		// }
	  
		// const obj = res.data.results[0]
	  
		// return res
	}

	render() {
		return (
			<div style={{width: '600px', margin: 'auto'}}>
				<WeatherCurrent
					current={this.state.current}
					day={this.state.forecast[0]}
				/>
			</div>
		)
  	}
}

export default MainContainer
