import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => props.myVenues.map( myVenue =>{
		return (
			<li className='listing' 
				key={myVenue.venue.id}
				title={myVenue.venue.name}
				onClick={ () => props.listClickHandler(myVenue)}
				onKeyPress={() => props.listClickHandler(myVenue)}
				tabIndex='0'
				role='menuitem'
			>	
				<p className='venueName'>
					{myVenue.venue.name}		
				</p>
				<img src={"https://maps.googleapis.com/maps/api/streetview?size=125x125&location=" + myVenue.venue.location.lat + "," + myVenue.venue.location.lng + "&key=***REMOVED***"} className='venueImage' alt={myVenue.venue.name} />
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

