import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { format, isBefore, startOfToday, addDays } from 'date-fns'

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
    constructor() {
        super()
        this.state = {isHover: false}
    }

	render() {
        const day = this.props.data
        const isToday = isBefore(day.time, addDays(startOfToday(), 1))
        const isHover = this.state.isHover
        
		return (
            <div
                onClick={this.props.onClick}
                onMouseEnter={() => this.setState({isHover: true})}
                onMouseLeave={() => this.setState({isHover: false})}
                style={{padding: '10px', background: (isHover ? 'rgba(255, 255, 255, 0.1)' : null)}}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{flexGrow: 1, fontSize: '1.2em'}}>
                        {isToday ? 'Today' : format(day.time, 'ddd')}
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
            <Row>
                {this.props.days.map((day, i) => {
                    const isActiveDay = (i === this.props.activeDayIndex)

                    return (
                        <Col
                            span={6}
                            style={{
                                borderLeft: (i !== 0 ? '2px solid rgba(255, 255, 255, 0.8)' : null),
                                borderBottom: `2px solid ${isActiveDay ? 'transparent' : 'rgba(255, 255, 255, 0.8)'}`,
                                background: `rgba(0, 0, 0, ${isActiveDay ? 0.3 : 0.7}`,
                            }}
                            key={i}
                        >
                            <ForecastDay
                                data={day}
                                onClick={() => this.props.onChangeActiveDayIndex(i)}
                            />
                        </Col>
                    )
                })}
            </Row>
        )
  	}
}

export {
    ForecastDays
}
