import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => props.myVenues.map( myVenue =>{
		let lat = myVenue.venue.location.lat;
		let lng = myVenue.venue.location.lng
		return (
			<li className='listing' key={myVenue.venue.id}
				title={myVenue.venue.name}
				onClick={ () => props.listClickHandler(myVenue)}
			>				<p className='venueName'>{myVenue.venue.name}</p>
				
				<p>Category: {myVenue.venue.categories[0].shortName}</p>	
				
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

