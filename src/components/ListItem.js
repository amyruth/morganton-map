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
				<img src={"https://maps.googleapis.com/maps/api/streetview?size=175x175&location=" + myVenue.venue.location.lat + "," + myVenue.venue.location.lng + "&key=***REMOVED***"}/>
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

