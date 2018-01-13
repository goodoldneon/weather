import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format, isBefore, startOfToday, addDays } from 'date-fns'

import { getIconName } from '../common/icon'

class ForecastDay extends Component {
    constructor() {
        super()
        this.state = {isHover: false}
    }

	render() {
        const day = this.props.data
        const isToday = isBefore(day.time, addDays(startOfToday(), 1))
        const isHover = this.state.isHover
        
		return (
            <div
                onClick={this.props.onClick}
                onMouseEnter={() => this.setState({isHover: true})}
                onMouseLeave={() => this.setState({isHover: false})}
                style={{padding: '10px', background: (isHover ? 'rgba(255, 255, 255, 0.1)' : null)}}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{flexGrow: 1, fontSize: '1.2em'}}>
                        {isToday ? 'Today' : format(day.time, 'ddd')}
                    </div>

                    <div style={{
						flexGrow: 1,
						fontSize: '1.2em',
						textAlign: 'right',
						color: 'rgba(255, 255, 255, 0.6)'
					}}>
                        {format(day.time, 'MMM D')}
                    </div>
                </div>

                <div style={{
					borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
					margin: '10px'
				}} />

                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <div style={{flexGrow: 1, fontSize: '1.8em'}}>
                        <i className={`wi ${getIconName(day.icon)}`} />
                    </div>

                    <div style={{
						flexGrow: 1,
						fontSize: '1.2em',
						textAlign: 'right'
					}}>
                        <i className={'wi wi-raindrop'} style={{paddingRight: '5px'}} />
                        {Math.round(day.precip.probability * 100)}%
                    </div>
                </div>

                <div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '1.6em'
				}}>
                    <div style={{flexGrow: 1}}>
                        {Math.round(day.temperature.actual.high)}&deg;
                    </div>
                        
                    <div style={{
						flexGrow: 1,
						textAlign: 'right',
						color: 'rgba(255, 255, 255, 0.6)'
					}}>
                        {Math.round(day.temperature.actual.low)}&deg;
                    </div>
                </div>
            </div>
        )
  	}
}

ForecastDay.propTypes = {
	data: PropTypes.object,
	onClick: PropTypes.func,
}

export default ForecastDay
