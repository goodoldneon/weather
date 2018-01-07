import React, { Component } from 'react'
import axios from 'axios'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.min.css'

import { ForecastDays } from './ForecastDays'
// import WeatherCurrent from './WeatherCurrent'
import WeatherActive from './WeatherActive'
import HourlyChart from './HourlyChart'

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

		console.log(res.data.days[0])
	}

	render() {
		const hourlyChartData = this.state.hours.map(a => {
			return {
				x: a.time,
				y: a.temperature.actual,
			}
        })
        
        const days = this.state.days
        const activeDayIndex = this.state.activeDayIndex
        let activeDay = null
        
        if (activeDayIndex <= (days.length + 1)) {
            if (activeDayIndex === 0) {
                activeDay = this.state.current
            } else {
                activeDay = days[activeDayIndex]
            }
        }

		return (
			<div style={{width: '600px', margin: 'auto', border: '1px solid rgba(255, 255, 255, 0.6)', borderTop: null}}>
                {days.length >= 4 &&
                    <ForecastDays
                        days={days.slice(0, 4)}
                        activeDayIndex={activeDayIndex}
                        onChangeActiveDayIndex={val => this.setState({activeDayIndex: val})}
                    />
                }

                <WeatherActive data={activeDay} />

				{/* <div>
					{this.state.current !== undefined && this.state.days !== undefined &&
						<WeatherCurrent
							current={this.state.current}
							day={this.state.days[0]}
						/>
					}
				</div> */}

				{/* <HourlyChart data={hourlyChartData} /> */}
			</div>
		)
  	}
}

export default MainContainer
