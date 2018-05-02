import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { Input, AutoComplete, Modal } from 'antd'

const Search = Input.Search

const Wrapper = styled.div`
  input {
    border-radius: 0;
  }
`

const WAIT_INTERVAL = 1000

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

class LocationSearch extends Component {
  constructor() {
    super()

    this.state = {
      value: '',
      results: [],
    }
  }

  handleChange = value => {
    clearTimeout(this.timer)

    this.setState({
      value,
      results: [],
    })

    // Debounce changes to prevent excessive API calls.
    this.timer = setTimeout(() => this.getLocations(value), WAIT_INTERVAL)
  }

  handleSelect = (value, option) => {
    const location = this.state.results.filter(result => result.name === value)[0]
    this.props.onSelectSearch(location)
    this.setState({ results: [] })
  }

  getLocations = async text => {
    const doesAutoCompleteDataAlreadyExist = this.state.results.length > 0
    const isNoText = text === undefined || text.length === 0

    if (doesAutoCompleteDataAlreadyExist || isNoText) {
      return
    }

    const url = `${process.env.REACT_APP_API_URL}/api/location-autocomplete?text=${text}`
    let res = null

    try {
      res = await axios.get(url)
    } catch (error) {
      const title = 'Server Error'
      const errorMessage = error.message
      const serverErrorMessage = error.response.data.error.message

      return modalError(title, errorMessage, serverErrorMessage)
    }

    const results = res.data

    this.setState({
      results: results,
    })
  }

  render() {
    // Convert search results into an object used to display results to the user.
    const dataSource = this.state.results.map((a, i) => {
      return {
        text: a.name,
        value: a.name,
      }
    })

    return (
      <Wrapper>
        <AutoComplete
          value={this.state.value}
          placeholder={'Search for location'}
          dataSource={dataSource}
          size={'large'}
          autoFocus={true}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          style={{ width: '100%' }}
        >
          <Search size={'large'} onSearch={this.getLocations} />
        </AutoComplete>
      </Wrapper>
    )
  }
}

LocationSearch.propTypes = {
  onSelectSearch: PropTypes.func,
}

export default LocationSearch
