import React, { Component } from 'react'
// import {AreaChart, Area, Tooltip, ResponsiveContainer} from 'recharts'
import ReactHighcharts from 'react-highcharts'
// import { format } from 'date-fns'

class HourlyChart extends Component {
	render() {
        // const categories = this.props.data
        //     .map(a => format(a.x, 'h A'))
        //     .slice(0, 24)
        //     .filter((a, i) => {
        //         return (i === 0 || i % 3 === 0)
        //     })

        const data = this.props.data
            .map(a => [a.x, Math.round(a.y)])
            .slice(0, 24)
            .filter((a, i) => {
                return (i === 0 || i % 3 === 0)
            })

        const config = {
            title: {
                text: null,
            },
            chart: {
                type: 'area',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                plotBorderWidth: 1,
            },
            xAxis: {
                type: 'datetime',
                lineWidth: 0,
                labels: {
                    format: `{value:%I %p}`,
                    rotation: 0,
                    style: {
                        color: '#ffffff',
                    },
                },
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
            plotOptions: {
                area: {
                    dataLabels: {
                        enabled: true,
                        color: '#ffffff',
                    },
                    enableMouseTracking: false,
                    color: 'rgb(0, 0, 0)',
                },
            },
            series: [{
                data: data,
            }],
            legend: {
                enabled: false,
            },
            credits: {
                enabled: false,
            },
        }

		return (
            <div>
                {/* <ResponsiveContainer height={100}>
                    <AreaChart data={this.props.data}>
                        <Area type='monotone' dataKey='y' stroke='#000000' fill='#000000' />
                        <Tooltip />
                    </AreaChart>
                </ResponsiveContainer> */}

                <ReactHighcharts config={config}></ReactHighcharts>
            </div>
        )
  	}
}

export default HourlyChart
