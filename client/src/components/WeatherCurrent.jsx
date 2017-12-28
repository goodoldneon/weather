import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { format, parse } from 'date-fns'

const conditionToIconName = (condition) => {
	switch (condition.toLowerCase()) {
		case 'clear':
			return 'wi-night-clear'
		default:
			return 'wi-na'	
	}
}

class WeatherCurrent extends Component {
	render() {
		console.log(this.props.current)
		console.log(this.props.day)

		const current = this.props.current
		const day = this.props.day

		if (current.temperature !== undefined) {
			return (
				<div style={{textAlign: 'center'}}>
					<Row gutter={0} type='flex' justify='space-around' align='middle'>
						<Col span={8} style={{fontSize: '5em', textAlign: 'left'}}>
							{Math.round(current.temperature.actual)}&deg;F
						</Col>

						<Col span={8} style={{fontSize: '1.1em', textAlign: 'left'}}>
							<div>Feels like {Math.round(current.temperature.apparent)}&deg;F</div>
							<div>{current.summary}</div>
							<div>Wind {Math.round(current.wind.speed)} mph</div>
							<div>Humidity {Math.round(100 * current.humidity)}%</div>
						</Col>

						<Col span={8} style={{fontSize: '8em'}}>
							<i className={`wi ${conditionToIconName(current.summary)}`}></i>
						</Col>
					</Row>
				</div>
			)
		} else {
			return null
		}
  	}
}

WeatherCurrent.defaultProps = {
	data: {
		temperature: {
			actual: null,
		},
	},
}

export default WeatherCurrent
