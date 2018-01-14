import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Collapse } from 'antd'

import SunChart from './SunChart'
import { getIconName } from './common/icon'
import { Label, Value, HorizontalSeparator } from './common/style'

const Panel = Collapse.Panel

const Wrapper = styled.div`
	padding: 10px;
`

const Location = styled.div`
	display: flex;
	font-size: 1.5em;
`

const Condition = styled.div`
	display: flex;
	align-items: center;
	text-align: center;
`

const ConditionIcon = styled.div`
	flex-grow: 1;
	margin-left: 10px;
	margin-right: 10px;
	font-size: 5em;
`

const Temperature = styled.div`
	flex-grow: 1;
	font-size: 5em;
`

const Detail = styled.div`
	flex-grow: 10;
`

const Summary = styled.div`
	font-size: 1.5em;
	text-align: center;
`

const SunChartSection = styled(Collapse)`
	background: transparent;
	
	div, i {
		color: #ffffff !important;
	}
`

class WeatherCurrent extends Component {
	constructor() {
		super()

		this.state = {isSunChartVisible: false}

		this.toggleSunChart = this.toggleSunChart.bind(this)
	}

	toggleSunChart(e) {
		e.preventDefault()
		this.setState({isSunChartVisible: !this.state.isSunChartVisible})
	}

	render() {
		const location = this.props.location
		const data = this.props.data
		const isSunChartVisible = this.state.isSunChartVisible

        if (data) {
            return (
                <Wrapper>
					<Location>
						<div style={{flexGrow: 1}}>
							Now
						</div>
						
						<div style={{flexGrow: 6, textAlign: 'right'}}>
							{location.name}
						</div>
					</Location>

					<Condition>
						<ConditionIcon>
							<i className={`wi ${getIconName(data.icon)}`} />
						</ConditionIcon>

						<Temperature>
							{Math.round(data.temperature.actual)}&deg;F
						</Temperature>

						<Detail>
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
						</Detail>
					</Condition>

					<Summary>
                        {data.summary}
                    </Summary>

					<HorizontalSeparator />

					<SunChartSection bordered={false}>
						<Panel
							header="Sun Height"
							style={{border: 0}}
						>
							<SunChart
								lat={location.lat}
								lng={location.lng}
							/>
						</Panel>
					</SunChartSection>
                </Wrapper>
            )
        } else {
            return (
                <div />
            )
        }
  	}
}

WeatherCurrent.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}

export default WeatherCurrent
