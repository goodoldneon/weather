import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { format, isBefore, startOfToday, addDays } from 'date-fns'

import { getIconName } from './common/icon'

const Wrapper = styled.div`
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

const ExpandToggle = styled.div`
	padding-top: 20px;
	text-align: center;
	
	a {
		color: #ffffff;
	}

	a:hover {
		color: #ffffff;
	}
`

class Hourly extends Component {
	constructor() {
		super()

		this.state = {
			areRowsLimited: true,
		}
	}

	toggleRowLimit() {
		const areRowsLimited = this.state.areRowsLimited
		this.setState({areRowsLimited: !areRowsLimited})
	}
	
	render() {
		const areRowsLimited = this.state.areRowsLimited
		const maxRows = (areRowsLimited ? 8 : 24)
		const data = this.props.data.slice(0, maxRows)
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

								return (
									<tr key={i}>
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

										<td>{Math.round(a.precip * 100)}%</td>
										<td>{Math.round(a.wind)} mph</td>
										<td>{Math.round(a.temperature)}&deg;</td>
									</tr>
								)
							})}
						</tbody>
					</Table>

					<ExpandToggle>
						<a onClick={() => this.toggleRowLimit()}>
							{areRowsLimited ? 'View all hours' : 'View less hours'}
						</a>
					</ExpandToggle>
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
