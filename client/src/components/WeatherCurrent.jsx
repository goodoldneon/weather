import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Collapse } from 'antd'

import SunChart from './SunChart'
import Hourly from './Hourly'
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

const CollapseStyled = styled(Collapse)`
  background: transparent;

  i {
    color: #ffffff;
  }
`

const PanelHeader = styled.span`
  color: #ffffff;
`

class WeatherCurrent extends Component {
  render() {
    const location = this.props.location
    const current = this.props.current
    const hours = this.props.hours

    if (current) {
      return (
        <Wrapper>
          <Location>
            <div style={{ flexGrow: 1 }}>Now</div>

            <div style={{ flexGrow: 6, textAlign: 'right' }}>{location.name}</div>
          </Location>

          <Condition>
            <ConditionIcon>
              <i className={`wi ${getIconName(current.icon)}`} />
            </ConditionIcon>

            <Temperature>{Math.round(current.temperature.actual)}&deg;F</Temperature>

            <Detail>
              <Row style={{ marginBottom: '5px' }}>
                <Col span={6}>
                  <Label>Feels Like</Label>
                  <Value>{Math.round(current.temperature.apparent)}&deg;</Value>
                </Col>

                <Col span={6}>
                  <Label>Wind</Label>
                  <Value>{Math.round(current.wind.speed)} mph</Value>
                </Col>

                <Col span={6}>
                  <Label>Gust</Label>
                  <Value>{Math.round(current.wind.gust)} mph</Value>
                </Col>

                <Col span={6}>
                  <Label>Humidity</Label>
                  <Value>{Math.round(current.humidity * 100)}%</Value>
                </Col>
              </Row>
            </Detail>
          </Condition>

          <Summary>{current.summary}</Summary>

          <HorizontalSeparator />

          <CollapseStyled bordered={false}>
            <Panel header={<PanelHeader>Sun Height</PanelHeader>} style={{ border: 0 }}>
              <SunChart lat={location.lat} lng={location.lng} />
            </Panel>
          </CollapseStyled>

          <CollapseStyled bordered={false}>
            <Panel header={<PanelHeader>Hourly Conditions</PanelHeader>} style={{ border: 0 }}>
              <Hourly data={hours} />
            </Panel>
          </CollapseStyled>
        </Wrapper>
      )
    } else {
      return <div />
    }
  }
}

WeatherCurrent.propTypes = {
  location: PropTypes.object,
  current: PropTypes.object,
  hours: PropTypes.arrayOf(PropTypes.object),
}

export default WeatherCurrent
