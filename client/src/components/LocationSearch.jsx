import React, { Component } from 'react'
import axios from 'axios'
import { Input, AutoComplete } from 'antd'

const Search = Input.Search

class LocationSearch extends Component {
	constructor () {
		super()
		this.state = {
			autoCompleteData: []
		}
	}

	handleSelect (value) {
		this.props.onSelectSearch(value)
		this.setState({autoCompleteData: []})
	}

	getLocations = async (text) => {
		// Don't search if auto complete data exists. This prevents searching location when user is trying to select a value in the auto complete dropdown.
		if (this.state.autoCompleteData.length > 0) {
			return
		}

		const url = `http://localhost:60001/api/location?text=${text}`
		const res = await axios.get(url)

		if (res.error) {
			console.log(res.error.msg)
			return
		}

		// Populates auto complete list below the search input.
		const autoCompleteData = res.data.map(a => {
			return {
				text: a.name,
				value: JSON.stringify({
					lat: a.lat,
					lng: a.lng,
					name: a.name,
				}),
			}
		})

		this.setState({
			autoCompleteData: autoCompleteData
		})
	}

	render() {
		return (
			<div>
				<AutoComplete
					placeholder='Enter location'
					enterButton='Search'
					dataSource={this.state.autoCompleteData}
					onSelect={value => this.handleSelect(value)}
					style={{width: '100%'}}
				>
					<Search
						enterButton='Search'
						onSearch={this.getLocations}
					/>
				</AutoComplete>
			</div>
		)
	}
}

export default LocationSearch
