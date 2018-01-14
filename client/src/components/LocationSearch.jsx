import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { Input, AutoComplete } from 'antd'

const Search = Input.Search

const Wrapper = styled.div`
	input {
		border-radius: 0;
	}
`

class LocationSearch extends Component {
	constructor() {
		super()

		this.state = {
			value: '',
			results: [],
			isSearching: false,
		}
	}

	handleChange(value) {
		value = (value === '0' ? '' : value)

		this.setState({
			value,
			results: [],
		})
	}

	handleSelect(value) {
		const location = this.state.results[value]
		this.props.onSelectSearch(location)
		this.setState({results: []})
	}

	getLocations = async (text) => {
		const doesAutoCompleteDataAlreadyExist = (this.state.results.length > 0)

		if (doesAutoCompleteDataAlreadyExist) {
			return
		}

		this.setState({isSearching: true})

		const url = `http://localhost:60001/api/location?text=${text}`
		const res = await axios.get(url)

		if (res.error) {
			console.log(res.error.msg)
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
			isSearching: false,
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
					disabled={this.state.isSearching}
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
