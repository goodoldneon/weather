import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { format } from 'date-fns'

const getIconName = (icon) => {
    const iconTranslate = {
        'clear-day': 'day-sunny',
        'clear-night': 'night-clear',
        'rain': 'raindrop',
        'snow': 'snow',
        'sleet': 'sleet',
        'wind': 'windy',
        'fog': 'fog',
        'cloudy': 'cloudy',
        'partly-cloudy-day': 'day-cloudy',
        'partly-cloudy-night': 'night-alt-cloudy',
        'hail': 'hail',
        'thunderstorm': 'thunderstorm',
        'tornado': 'tornado'
    }

    return `wi-${(iconTranslate[icon] || 'na')}`
}

class ForecastDay extends Component {
	render() {
        const day = this.props.data
        
		return (
            <div style={{padding: '5px'}}>
                <div style={{marginBottom: '10px'}}>
                    {format(day.time, 'ddd D')}
                </div>

                <div>
                    <div style={{fontSize: '1.8em', display: 'inline-block'}}>
                        <i className={`wi ${getIconName(day.icon)}`}></i>
                    </div>

                    <div style={{fontSize: '1.2em', float: 'right', display: 'inline-block'}}>
                        <i className={`wi ${getIconName(day.precip.type)}`}></i>
                        {Math.round(day.precip.probability * 100)}%
                    </div>
                </div>
            </div>
        )
  	}
}

class ForecastDays extends Component {
	render() {
		return (
            <Row>
                <Col span={6} style={{border: '1px solid white'}}>
                    <ForecastDay data={this.props.data[0]} />
                </Col>

                <Col span={6} style={{border: '1px solid white', borderLeft: 0}}>
                    <ForecastDay data={this.props.data[1]} />
                </Col>

                <Col span={6} style={{border: '1px solid white', borderLeft: 0}}>
                    <ForecastDay data={this.props.data[2]} />
                </Col>

                <Col span={6} style={{border: '1px solid white', borderLeft: 0}}>
                    <ForecastDay data={this.props.data[3]} />
                </Col>
            </Row>
        )
  	}
}

export {
    ForecastDays
}
