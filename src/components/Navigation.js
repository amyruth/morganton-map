import React, { Component } from 'react';
import VenueList from './VenueList';
import './Navigation.css';

export default class Navigation extends Component {

	render() {
		return (
			<nav className='sidebar hide' id='main-menu' aria-label='Main Navigation' aria-expanded='false' aria-hidden='true'
			onKeyDown={(e) => this.props.escapeMenu(e)}
			>

				<div className='search-section'>
					
						<input type='text' 
							id='searchbar'
							role='search'
							placeholder='Search places by name' 
							value={this.props.searchQuery}
							onChange={(e) => this.props.setQuery(e.target.value)} 
						/>
                </div>
			
				<a className="attribution" href='https://foursquare.com/' target='blank'>Powered by Foursquare</a>

				<VenueList myVenues={this.props.myVenues}
					listKbHandler={this.props.listKbHandler}
					listClickHandler={this.props.listClickHandler} 
				/>
			</nav>
		);
	}
}