import React, { Component } from 'react';
import VenueList from './VenueList';
import './Navigation.css';

class Navigation extends Component {

	render() {
		return (
			<nav className='sidebar' id='main-menu' aria-label='Main Navigation' aria-expanded='false'>
				{/* <a href='#' className='close-menu'>&times;</a> */}
				<a href="#main-menu" role='button'
					aria-pressed='false'
					aria-expanded='false' 
					className='close-btn'
					onClick={this.props.openMenu}
				>
					Close Menu
				</a>

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