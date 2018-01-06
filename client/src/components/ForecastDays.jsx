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
            <div style={{padding: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{flexGrow: 1, fontSize: '1.2em'}}>
                        {format(day.time, 'ddd')}
                    </div>

                    <div style={{flexGrow: 1, fontSize: '1.2em', textAlign: 'right', color: 'rgba(255, 255, 255, 0.6)'}}>
                        {format(day.time, 'MMM D')}
                    </div>
                </div>

                <div style={{borderBottom: '1px solid rgba(255, 255, 255, 0.6)', margin: '10px'}} />

                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <div style={{flexGrow: 1, fontSize: '1.8em'}}>
                        <i className={`wi ${getIconName(day.icon)}`}></i>
                    </div>

                    <div style={{flexGrow: 1, fontSize: '1.2em', textAlign: 'right'}}>
                        <i className={`wi wi-raindrop`} style={{paddingRight: '5px'}}></i>
                        {Math.round(day.precip.probability * 100)}%
                    </div>
                </div>

                <div style={{display: 'flex', alignItems: 'center', fontSize: '1.6em'}}>
                    <div style={{flexGrow: 1}}>
                        {Math.round(day.temperature.actual.high)}&deg;
                    </div>
                        
                    <div style={{flexGrow: 1, textAlign: 'right', color: 'rgba(255, 255, 255, 0.6)'}}>
                        {Math.round(day.temperature.actual.low)}&deg;
                    </div>
                </div>
            </div>
        )
  	}
}

class ForecastDays extends Component {
	render() {
		return (
            <Row style={{borderBottom: '1px solid rgba(255, 255, 255, 0.6)'}}>
                <Col span={6} style={{borderLeft: '1px solid rgba(255, 255, 255, 0.6)', borderRight: '1px solid rgba(255, 255, 255, 0.6)'}}>
                    <ForecastDay data={this.props.data[0]} />
                </Col>

                <Col span={6} style={{borderRight: '1px solid rgba(255, 255, 255, 0.6)'}}>
                    <ForecastDay data={this.props.data[1]} />
                </Col>

                <Col span={6} style={{borderRight: '1px solid rgba(255, 255, 255, 0.6)'}}>
                    <ForecastDay data={this.props.data[2]} />
                </Col>

                <Col span={6} style={{borderRight: '1px solid rgba(255, 255, 255, 0.6)'}}>
                    <ForecastDay data={this.props.data[3]} />
                </Col>
            </Row>
        )
  	}
}

export {
    ForecastDays
}
