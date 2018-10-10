import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => props.myVenues.map( myVenue =>{
		return (
			<li className='listing' 
				key={myVenue.venue.id}
				title={myVenue.venue.name}
				onClick={ () => props.listClickHandler(myVenue)}
				// onKeyPress={() => props.listClickHandler(myVenue)}
				onKeyDown={(e) => {props.listKbHandler(e, myVenue)}}
				tabIndex='0'
			>	
				<div className='venue-listing' role='menuitem'>
					<p className='venueName'>
						{myVenue.venue.name}		
					</p>
					<img src={"https://maps.googleapis.com/maps/api/streetview?size=125x125&location=" + myVenue.venue.location.lat + "," + myVenue.venue.location.lng + "&key=AIzaSyCc3E8DG6mm62v4R5R3DZFqCn7et6IgxUY"} className='venueImage' alt={'photo of' + myVenue.venue.name} />
				</div>
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

