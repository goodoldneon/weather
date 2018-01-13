import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Input, AutoComplete } from 'antd'

const Search = Input.Search

class LocationSearch extends Component {
	constructor() {
		super()

		this.state = {
			results: []
		}
	}

	handleSelect(value) {
		const location = this.state.results[value]
		this.props.onSelectSearch(location)
		this.setState({results: []})
	}

	getLocations = async (text) => {
		/*
			Don't search if auto complete data exists.

			This prevents searching location when user is trying to select a value in the 
			auto complete dropdown.
		*/
		if (this.state.results.length > 0) {
			return
		}

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
			results: results
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
			<div>
				<AutoComplete
					placeholder={'Enter location'}
					enterButton={'Search'}
					dataSource={autoCompleteData}
					size={'large'}
					onSelect={value => this.handleSelect(value)}
					style={{width: '100%'}}
				>
					<Search
						enterButton={'Search'}
						size={'large'}
						onSearch={this.getLocations}
					/>
				</AutoComplete>
			</div>
		)
	}
}

LocationSearch.propTypes = {
	onSelectSearch: PropTypes.func,
}

export default LocationSearch
