import React from 'react';
import PropTypes from 'prop-types';

let streetView = 'https://maps.googleapis.com/maps/api/streetview?size=100x100&location=';

const ListItem = props => props.myVenues.map( myVenue =>{
		let lat = myVenue.venue.location.lat;
		let lng = myVenue.venue.location.lng
		return (
			<li className='listing' key={myVenue.venue.id}
				title={myVenue.venue.name}
				onClick={ () => props.listClickHandler(myVenue)}
			>				<p className='venueName'>{myVenue.venue.name}</p>
				
				<p>Type: {myVenue.venue.categories[0].shortName}</p>	
				<img src={"https://maps.googleapis.com/maps/api/streetview?size=150x150&location=" + myVenue.venue.location.lat + "," + myVenue.venue.location.lng + "&key=googlekey"}></img>
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

