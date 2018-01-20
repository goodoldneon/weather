import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format, isBefore, startOfToday, addDays } from 'date-fns'

import { getIconName } from './common/icon'

// const data = [
// 	{
// 		time: new Date(0).setUTCSeconds(1516467600),
// 		summary: 'Clear',
// 		icon: 'clear-day',
// 		precip: 0.5,
// 		wind: 10.35,
// 		temperature: 41.2,
// 	},
// 	{
// 		time: new Date(0).setUTCSeconds(1516471200),
// 		summary: 'Rain',
// 		icon: 'rain',
// 		precip: 0,
// 		wind: 5,
// 		temperature: 45,
// 	},
// 	{
// 		time: new Date(0).setUTCSeconds(1516640400),
// 		summary: 'Rain',
// 		icon: 'rain',
// 		precip: 0,
// 		wind: 5,
// 		temperature: 45,
// 	},
// ]

const Wrapper = styled.div`
	padding-left: 10px;
	padding-right: 10px;
	color: #ffffff;
`

const WrapperNoData = styled(Wrapper)`
	text-align: center;
	font-style: italic;
`

const Table = styled.table`
	width: 100%;
	text-align: right;

	thead {
		color: rgba(255, 255, 255, 0.8);
		border-bottom: 1px solid #ffffff;
	}

	th {
		width: 20%;
		padding-left: 10px;
		padding-right: 10px;
		font-weight: normal;
	}

	tbody {
		tr {
			border-bottom: 1px solid rgba(255, 255, 255, 0.4);
		}
	}

	td {
		padding-left: 10px;
		padding-right: 10px;
		white-space: nowrap;
	}
`

const Day = styled.div`
	color: rgba(255,255,255,0.6);
`

class Hourly extends Component {
	render() {
		const data = this.props.data.slice(0, 24)
		const timeFormat = 'h a'

		if (data.length === 0) {
			return (
				<WrapperNoData>
					No hourly data
				</WrapperNoData>
			)
		} else {
			return (
				<Wrapper>
					<Table>
						<thead>
							<tr>
								<th style={{textAlign: 'left'}}>Time</th>
								<th style={{textAlign: 'left'}}>Summary</th>
								<th>Precip</th>
								<th>Wind</th>
								<th>Temp</th>
							</tr>
						</thead>

						<tbody>
							{data.map((a, i) => {
								const isToday = isBefore(a.time, addDays(startOfToday(), 1))
								const day = (isToday ? 'Today' : format(a.time, 'dddd'))
								const time = format(a.time, timeFormat)
								const isLastRow = (i === (data.length - 1))
								let rowStyle = {}

								if (isLastRow) {
									rowStyle = {
										borderWidth: 0,
									}
								}

								return (
									<tr
										key={i}
										style={rowStyle}
									>
										<td style={{textAlign: 'left'}}>
											<div>{time}</div>
											<Day>{day}</Day>
										</td>

										<td style={{textAlign: 'left'}}>
											<i className={`wi ${getIconName(a.icon)}`} />

											<span style={{paddingLeft: '5px'}}>
												{a.summary}
											</span>
										</td>

										<td>
											<i className={'wi wi-raindrop'} />

											<span style={{paddingLeft: '5px'}}>
												{Math.round(a.precip * 100)}%
											</span>
										</td>

										<td>{Math.round(a.wind)} mph</td>

										<td>{Math.round(a.temperature)}&deg;</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Wrapper>
			)
		}
	}
}

Hourly.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
}

Hourly.defaultProps = {
	data: [],
}

export default Hourly
