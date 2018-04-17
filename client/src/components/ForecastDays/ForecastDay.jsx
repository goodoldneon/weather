import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format, isBefore, startOfToday, addDays } from 'date-fns'
import styled from 'styled-components'

import { getIconName } from '../common/icon'
import { HorizontalSeparator } from '../common/style'

const Wrapper = styled.div`
  padding: 10px;

  :hover {
    ${props => (!props.isActiveDay ? 'background: rgba(255, 255, 255, 0.1)' : '')};
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const DayName = styled.div`
  flex-grow: 1;
  font-size: 1.2em;
`

const Date = styled.div`
  flex-grow: 1;
  font-size: 1.2em;
  text-align: right;
  color: rgba(255, 255, 255, 0.6);
`

const Condition = styled.div`
  flex-grow: 1;
  font-size: 1.8em;
`

const Precip = styled.div`
  flex-grow: 1;
  font-size: 1.2em;
  text-align: right;
`

const TempHigh = styled.div`
  flex-grow: 1;
  font-size: 1.6em;
`

const TempLow = styled.div`
  flex-grow: 1;
  font-size: 1.6em;
  text-align: right;
  color: rgba(255, 255, 255, 0.6);
`

class ForecastDay extends Component {
  render() {
    const day = this.props.data
    const isToday = isBefore(day.time, addDays(startOfToday(), 1))
    const dayName = isToday ? 'Today' : format(day.time, 'ddd')
    const date = format(day.time, 'MMM D')

    return (
      <Wrapper onClick={this.props.onClick} isActiveDay={this.props.isActiveDay}>
        <Row>
          <DayName>{dayName}</DayName>
          <Date>{date}</Date>
        </Row>

        <HorizontalSeparator />

        <Row style={{ marginBottom: '10px' }}>
          <Condition>
            <i className={`wi ${getIconName(day.icon)}`} />
          </Condition>

          <Precip>
            <i className={'wi wi-raindrop'} />

            <span style={{ paddingLeft: '5px' }}>{Math.round(day.precip.probability * 100)}%</span>
          </Precip>
        </Row>

        <Row>
          <TempHigh>{Math.round(day.temperature.actual.high)}&deg;</TempHigh>

          <TempLow>{Math.round(day.temperature.actual.low)}&deg;</TempLow>
        </Row>
      </Wrapper>
    )
  }
}

ForecastDay.propTypes = {
  data: PropTypes.object,
  isActiveDay: PropTypes.bool,
  onClick: PropTypes.func,
}

export default ForecastDay
