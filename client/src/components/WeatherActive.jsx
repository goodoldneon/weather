import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { format } from 'date-fns'

import { getIconName } from './common/icon.js'
import { Label, Value } from './common/style'

const Wrapper = styled.div`
	padding: 10px;
	padding-top: 0;
`

const ConditionIcon = styled.div`
	width: 20%;
	font-size: 5em;
`

const Detail = styled.div`
	width: 80%;
`

const Summary = styled.div`
	font-size: 1.5em;
	text-align: center;
`

class WeatherActive extends Component {
	render() {
		const data = this.props.data

		if (data) {
			return (
				<Wrapper>
					<div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
						<ConditionIcon>
							<i className={`wi ${getIconName(data.icon)}`} />
						</ConditionIcon>

						<Detail>
							<Row style={{ marginBottom: '5px' }}>
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
						</Detail>
					</div>

					<Summary>{data.summary}</Summary>
				</Wrapper>
			)
		} else {
			return <div />
		}
	}
}

WeatherActive.propTypes = {
	data: PropTypes.object,
}

export default WeatherActive
