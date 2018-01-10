import React, { Component } from 'react'
import { Row, Col } from 'antd'

import SunChart from './SunChart'
import { getIconName } from './common/icon'
import { Label, Value } from './common/style'

class WeatherCurrent extends Component {
	constructor () {
		super()

		this.state = {
			isSunChartVisible: false
		}

		this.toggleSunChart = this.toggleSunChart.bind(this)
	}

	toggleSunChart (e) {
		e.preventDefault()
		this.setState({isSunChartVisible: !this.state.isSunChartVisible})
	}

	render () {
		const location = this.props.location
		const data = this.props.data
		const isSunChartVisible = this.state.isSunChartVisible

        if (data) {
            return (
                <div style={{
                    padding: '10px',
                    background: 'rgba(0, 0, 0, 0.3)',
                }}>
					<div style={{display: 'flex', fontSize: '1.5em'}}>
						<div>Now</div>
						
						<div style={{flexGrow: 1, textAlign: 'right'}}>
							{this.props.locationName}
						</div>
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

					<div style={{
						margin: '10px',
						borderBottom: '1px solid rgba(255, 255, 255, 0.6)'
					}} />

					<div>
						<a href='#'
							onClick={this.toggleSunChart}
							style={{
								color: '#FFFFFF',
								textDecoration: 'none'
							}}
						>
							<div
								style={{
									marginLeft: '10px',
									marginRight: '10px'
								}}
							>
								<span>Sun Height</span>

								<span style={{float: 'right'}}>
									{isSunChartVisible ? '(Hide)' : '(Show)'}
								</span>
							</div>
						</a>

						{isSunChartVisible &&
							<SunChart
								lat={location.lat}
								lng={location.lng}
							/>
						}
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
