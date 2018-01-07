import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { getIconName } from './common/icon'
import { Label, Value } from './common/style'

class WeatherCurrent extends Component {
	render() {
        const data = this.props.data

        if (data) {
            return (
                <div style={{
                    padding: '10px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.8)',
                    background: 'rgba(0, 0, 0, 0.3)',
                }}>
					<div style={{fontSize: '1.5em'}}>
						Now
					</div>

					<div style={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
						<div style={{flexGrow: 1, marginLeft: '10px', marginRight: '10px', fontSize: '5em'}}>
							<i className={`wi ${getIconName(data.icon)}`} />
						</div>

						<div style={{flexGrow: 1, fontSize: '5em'}}>
							{Math.round(data.temperature.actual)}&deg;F
						</div>

						<div style={{flexGrow: 10}}>
							<Row style={{marginBottom: '5px'}}>
								<Col span={6}>
									<Label>Feels Like</Label>
									<Value>{Math.round(data.temperature.apparent)}&deg;</Value>
								</Col>

								<Col span={6}>
									<Label>Wind</Label>
									<Value>{Math.round(data.wind.speed)} mph</Value>
								</Col>

								<Col span={6}>
									<Label>Gust</Label>
									<Value>{Math.round(data.wind.gust)} mph</Value>
								</Col>

								<Col span={6}>
									<Label>Humidity</Label>
									<Value>{Math.round(data.humidity * 100)}%</Value>
								</Col>
							</Row>
						</div>
					</div>

					<div style={{fontSize: '1.5em', textAlign: 'center'}}>
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

export default WeatherCurrent
