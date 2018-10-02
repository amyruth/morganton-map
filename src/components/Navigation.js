import React, { Component } from 'react';
import VenueList from './VenueList';
class Navigation extends Component {


	
	render() {
		return (
			<nav className='sidebar'>
				<div className='search-section'>
					<label htmlFor='searchbar'>Search Restaurants</label>
						<input type='text' id='searchbar' 
							value={this.props.searchQuery}
							onChange={(e) => this.props.setQuery(e.target.value)} 
						/>
                    
				</div>

				<VenueList myVenues={this.props.myVenues}
					listClickHandler={this.props.listClickHandler} />
			</nav>
		);
	}
}

export default Navigation;