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
					const bgColor = (isActiveDay ? 'transparent' : '#ffffff')

                    return (
                        <Col
							span={6}
							key={i}
                            style={{
                                borderLeft: (i !== 0 ? '1px solid #ffffff' : null),
                                borderBottom: `1px solid ${bgColor}`,
                                background: (isActiveDay ? null : 'rgba(0, 0, 0, 0.3)'),
                            }}
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
