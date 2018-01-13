import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import ForecastDay from './ForecastDay'

class ForecastDays extends Component {
	render() {
		return (
            <Row>
                {this.props.days.map((day, i) => {
					const isActiveDay = (i === this.props.activeDayIndex)
					const bgColor = (isActiveDay ? 'transparent' : 'rgba(255, 255, 255, 0.8)')

                    return (
                        <Col
                            span={6}
                            style={{
                                borderLeft: (i !== 0 ? '2px solid rgba(255, 255, 255, 0.8)' : null),
                                borderBottom: `2px solid ${bgColor}`,
                                background: `rgba(0, 0, 0, ${isActiveDay ? 0.3 : 0.7}`,
                            }}
                            key={i}
                        >
                            <ForecastDay
                                data={day}
                                onClick={() => this.props.onChangeActiveDayIndex(i)}
                            />
                        </Col>
                    )
                })}
            </Row>
        )
  	}
}

ForecastDays.propTypes = {
	days: PropTypes.arrayOf(PropTypes.object),
	activeDayIndex: PropTypes.number,
	onChangeActiveDayIndex: PropTypes.func,
}

export default ForecastDays
