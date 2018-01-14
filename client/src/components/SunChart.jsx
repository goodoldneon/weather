import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sunCalc from 'suncalc'
import { format, addHours } from 'date-fns'
import ReactHighcharts from 'react-highcharts'

// Highcharts config object.
const config = {
    chart: {
		height: '200px',
		backgroundColor: 'transparent',
		margin: [0, 0, 0, 0],
		animation: false,
	},
	legend: {
		enabled: false,
	},
	credits: {
		enabled: false,
	},
    title: {
        text: null,
    },
    xAxis: {
		type: 'datetime',
        labels: {
            enabled: false,
		},
		gridLineWidth: 0,
		lineWidth: 0,
		tickWidth: 0,
    },
    yAxis: {
        title: {
            text: null,
        },
        labels: {
            enabled: false,
        },
		gridLineWidth: 0,
    },
    tooltip: {
        formatter: function () {
			return `
				${Number(this.y).toFixed(2)} radians
				<br />
				${this.series.name === 'Now' ? 'Now' : format(this.x, 'h:mm a')}
			`
        },
    },
    series: [],
}

class SunChart extends Component {
	render() {
		const timeNow = new Date()
		let time
		const hours = []

		// Iterate hourly from +/- 12 hours around current time.
		for (let i = -12; i <= 12; i++) {
			time = addHours(timeNow, i)

			hours.push({
				x: time.getTime(),
				y: sunCalc.getPosition(time, this.props.lat, this.props.lng).altitude,
			})
		}

		const now = [{
			x: timeNow,
			y: sunCalc.getPosition(timeNow, this.props.lat, this.props.lng).altitude,
		}]

		config.series = [
			{
				name: null,
				type: 'area',
				color: '#FDC754',
				negativeColor: '#101046',
				marker: {
					enabled: false,
				},
				lineWidth: 0,
				animation: false,
				states: {
					hover: {
						lineWidthPlus: 0,
					},
				},
				data: hours,
			},
			{
				name: 'Now',
				marker: {
					symbol: 'circle',
					radius: 15,
					fillColor: '#FDC754',
					lineColor: '#000000',
					lineWidth: 2,
				},
				animation: false,
				data: now,
			},
		]

		return (
			<ReactHighcharts config={config} />
		)
	}
}

SunChart.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
}

export default SunChart
