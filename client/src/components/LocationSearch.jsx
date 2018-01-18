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

const modalError = (title, content) => {
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

	handleChange(value) {
		clearTimeout(this.timer)
		value = (value === '0' ? '' : value)

		this.setState({
			value,
			results: [],
		})

		// Debounce changes to prevent excessive API calls.
		this.timer = setTimeout(() => this.getLocations(value), WAIT_INTERVAL)
	}

	handleSelect(value) {
		const location = this.state.results[value]
		this.props.onSelectSearch(location)
		this.setState({results: []})
	}

	getLocations = async (text) => {
		const doesAutoCompleteDataAlreadyExist = (this.state.results.length > 0)
		const isNoText = (text === undefined || text.length === 0)

		if (doesAutoCompleteDataAlreadyExist || isNoText) {
			return
		}

		const url = `http://localhost:60001/api/location?text=${text}`
		let res = null

		try {
			res = await axios.get(url)
		} catch (error) {
			res = {
				error: {
					msg: error.message,
				},
			}
		}

		if (res.error) {
			const title = 'Server error'
			const content = res.error.msg
			modalError(title, content)
			return
		}

		const results = res.data.map(a => {
			return {
				name: a.name,
				lat: a.lat,
				lng: a.lng,
			}
		})

		this.setState({
			results: results,
			// isSearching: false,
		})
	}

	render() {
		// Convert search results into an object used to display results to the user.
		const autoCompleteData = this.state.results.map((a, i) => {
			return {
				text: a.name,
				value: i,
			}
		})

		return (
			<Wrapper>
				<AutoComplete
					value={this.state.value}
					placeholder={'Search for location'}
					dataSource={autoCompleteData}
					size={'large'}
					onChange={value => this.handleChange(value)}
					onSelect={value => this.handleSelect(value)}
					style={{width: '100%'}}
				>
					<Search
						size={'large'}
						onSearch={this.getLocations}
					/>
				</AutoComplete>
			</Wrapper>
		)
	}
}

LocationSearch.propTypes = {
	onSelectSearch: PropTypes.func,
}

export default LocationSearch
