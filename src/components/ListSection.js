import React, { Component } from 'react';

class ListSection extends Component {
	render() {
		return (
			<div className='sidebar'>
				<div className='search-section'>
					<label htmlFor='searchbar'>Search Restaurants</label>
					<input type='text' id='searchbar'></input>
                    
				</div>

				<ul id='venues'>
					{this.props.myVenues.map( myVenue => (
						<li key={myVenue.venue.id}>
							<div>
							{myVenue.venue.name}
							</div>
						</li>
					))}
				

				</ul>
			</div>
		);
	}
}

export default ListSection;