import React, { Component } from 'react';
import VenueList from './VenueList';
import './Navigation.css';

class Navigation extends Component {

	render() {
		return (
			<nav className='sidebar' id='main-menu' aria-label='Main Navigation' aria-expanded='false'>
				{/* <a href='#' className='close-menu'>&times;</a> */}
				

				<div className='search-section'>
					
						<input type='text' id='searchbar'
							aria-label='Search restaurants by name'
							role='search'
							placeholder='Search places by name' 
							value={this.props.searchQuery}
							onChange={(e) => this.props.setQuery(e.target.value)} 
						/>
                </div>

				<a className="attribution" href='https://foursquare.com/' target='blank'>Powered by Foursquare</a>

				<VenueList myVenues={this.props.myVenues}
					onListKeypress={this.props.onListKeypress} 
					listClickHandler={this.props.listClickHandler} 
				/>
			</nav>
		);
	}
}

export default Navigation;