import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Modal } from 'antd'
import '../css/weather-icons.min.css'
import '../css/weather-icons-wind.min.css'

import LocationSearch from './LocationSearch'
import WeatherCurrent from './WeatherCurrent'
import ForecastDays from './ForecastDays'
import WeatherActive from './WeatherActive'

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  background: rgba(0, 0, 0, 0.3);
`

const HorizontalSeparator = styled.div`
  border-bottom: 1px solid #ffffff;
`

const modalError = (title, errorMessage, serverErrorMessage) => {
  const content = (
    <div>
      <div>{errorMessage}</div>
      <br />
      <div>{serverErrorMessage}</div>
    </div>
  )

  Modal.error({
    title,
    content,
  })
}

class MainContainer extends Component {
  constructor() {
    super()

    this.state = {
      location: null,
      current: null,
      days: [],
      hours: [],
      activeDayIndex: 0,
    }
  }

  componentWillMount() {
    const locationDefault = {
      name: 'Ann Arbor, MI 48105, USA',
      placeId: 'ChIJMx9D1A2wPIgR4rXIhkb5Cds',
    }

    this.setState({ location: locationDefault })
    this.getWeather(locationDefault)
  }

  getWeather = async location => {
    const url = `${process.env.REACT_APP_HOST_URL}/api/weather`
    let res = null
console.log(url)
    try {
      res = await axios.post(url, location)
    } catch (error) {
      const title = 'Server Error'
      const errorMessage = error.message
      const serverErrorMessage = error.response.data.error.message

      return modalError(title, errorMessage, serverErrorMessage)
    }

    location = Object.assign({}, location, res.data.location)

    this.setState({
      location: location,
      current: res.data.current,
      days: res.data.days,
      hours: res.data.hours,
    })
  }

  render() {
    const location = this.state.location
    const current = this.state.current
    const hours = this.state.hours
    const days = this.state.days
    const activeDayIndex = this.state.activeDayIndex

    // Make sure index doesn't go past array length.
    const activeDay = activeDayIndex <= days.length + 1 ? days[activeDayIndex] : null

    return (
      <Wrapper>
        <LocationSearch onSelectSearch={location => this.getWeather(location)} />

        <WeatherCurrent location={location} current={current} hours={hours} />

        <HorizontalSeparator />

        {days.length >= 4 && (
          <ForecastDays
            days={days.slice(0, 4)}
            activeDayIndex={activeDayIndex}
            onChangeActiveDayIndex={val => this.setState({ activeDayIndex: val })}
          />
        )}

        <WeatherActive data={activeDay} />
      </Wrapper>
    )
  }
}

export default MainContainer
