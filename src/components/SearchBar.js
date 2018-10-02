import React, { Component } from 'react';

class SearchBar extends Component {
	render() {
		return (
			<div className='search-section'>
					<label htmlFor='searchbar'>Search Restaurants</label>
					<input type='text' id='searchbar'
						value={this.props.searchQuery}
						onChange={ (e) => this.props.setQuery(e.target.value)} 
					 />            
			</div>
		);
	}
}

export default SearchBar;