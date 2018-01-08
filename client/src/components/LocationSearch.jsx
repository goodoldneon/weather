import React, { Component } from 'react'
import { Input } from 'antd'

const Search = Input.Search

class LocationSearch extends Component {
	render() {
		return (
			<div>
				<Search placeholder="Enter zip code" enterButton="Search" />
			</div>
		)
	}
}

export default LocationSearch
