import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => props.myVenues.map( myVenue =>{
		return (
			<li className='listing' key={myVenue.venue.id}
				
				onClick={ () => props.listClickHandler(myVenue)}
			>
				<p className='venueName'>{myVenue.venue.name}</p>
				
				<p>Type: {myVenue.venue.categories[0].shortName}</p>	
			</li>
		)
		
});

ListItem.propTypes = {
	
};

export default ListItem;

