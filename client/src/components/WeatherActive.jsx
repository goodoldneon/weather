import React, { Component } from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'

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

        // console.log(data)

        if (data) {
            return (
                <div style={{padding: '10px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{flexGrow: 1, fontSize: '5em'}}>
                            <span style={{marginRight: '20px'}}>
                                <i className={`wi ${getIconName(data.icon)}`}></i>
                            </span>

                            <span>
                                ...
                            </span>
                        </div>

                        <div style={{flexGrow: 10, textAlign: 'center'}}>
                            <Row style={{marginBottom: '5px'}}>
                                <Col span={8}>
                                    <Label>Feels Like</Label>
                                    <Value>...</Value>
                                </Col>

                                <Col span={8}>
                                    <Label>High</Label>
                                    <Value>{Math.round(data.temperature.actual.high)}&deg;</Value>
                                </Col>

                                <Col span={8}>
                                    <Label>Low</Label>
                                    <Value>{Math.round(data.temperature.actual.low)}&deg;</Value>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={8}>
                                    <Label>Wind</Label>
                                    <Value>{Math.round(data.wind.speed)} mph</Value>
                                </Col>

                                <Col span={8}>
                                    <Label>Gust</Label>
                                    <Value>{Math.round(data.wind.gust)} mph</Value>
                                </Col>

                                <Col span={8}>
                                    <Label>Humidity</Label>
                                    <Value>{Math.round(data.humidity * 100)}%</Value>
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
