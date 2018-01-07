import React, { Component } from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
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

class WeatherActive extends Component {
	render() {
        const data = this.props.data
        const colorFade = 'rgba(255, 255, 255, 0.6)'

        const Label = styled.div`
            font-size: 0.9em;
            color: rgba(255, 255, 255, 0.6);
        `

        const Value = styled.div`
            font-size: 1.2em;
        `

        console.log(data)

        if (data) {
            return (
                <div style={{padding: '10px', background: 'rgba(0, 0, 0, 0.4'}}>
                    <div style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <div style={{width: '20%', fontSize: '5em'}}>
                            <i className={`wi ${getIconName(data.icon)}`}></i>
                        </div>

                        <div style={{width: '80%'}}>
                            <Row style={{marginBottom: '5px'}}>
                                <Col span={6}>
                                    <Label>High</Label>
                                    <Value>{Math.round(data.temperature.actual.high)}&deg;</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Low</Label>
                                    <Value>{Math.round(data.temperature.actual.low)}&deg;</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Wind</Label>
                                    <Value>{Math.round(data.wind.speed)} mph</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Gust</Label>
                                    <Value>{Math.round(data.wind.gust)} mph</Value>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={6}>
                                    <Label>High (Feel)</Label>
                                    <Value>{Math.round(data.temperature.apparent.high)}&deg;</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Low (Feel)</Label>
                                    <Value>{Math.round(data.temperature.apparent.low)}&deg;</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Sunrise</Label>
                                    <Value>{format(data.sunrise, 'h:mm')}</Value>
                                </Col>

                                <Col span={6}>
                                    <Label>Sunset</Label>
                                    <Value>{format(data.sunset, 'h:mm')}</Value>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div style={{fontSize: '1.5em'}}>
                        {data.summary}
                    </div>
                </div>
            )
        } else {
            return (
                <div />
            )
        }
    }
}

export default WeatherActive
