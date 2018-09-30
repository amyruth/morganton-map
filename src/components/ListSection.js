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
							<p className='venueName'>{myVenue.venue.name}</p>
							<p>{myVenue.venue.location.formattedAddress[0]}</p>
							<p>{myVenue.venue.location.formattedAddress[1]}</p>
							<p>Type: {myVenue.venue.categories[0].shortName}</p>
							</div>
						</li>
					))}
				

				</ul>
			</div>
		);
	}
}

export default ListSection;