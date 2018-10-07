import React, { Component } from 'react';
import VenueList from './VenueList';
import './Navigation.css';

class Navigation extends Component {

	render() {
		return (
			<nav className='sidebar main-menu'>
				<a href='#' className='close-menu'>&times;</a>
				

				<div className='search-section'>
					{/* <label htmlFor='searchbar'>Search</label> */}
						<input type='text' id='searchbar'
							placeholder='Search restaurants by name' 
							value={this.props.searchQuery}
							onChange={(e) => this.props.setQuery(e.target.value)} 
						/>
                </div>

				<VenueList myVenues={this.props.myVenues}
					listClickHandler={this.props.listClickHandler} 
				/>
			</nav>
		);
	}
}

export default Navigation;