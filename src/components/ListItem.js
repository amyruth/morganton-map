import React from 'react';
import PropTypes from 'prop-types';

const ListItem = props => {
	return (
			<li className='listing' key={myVenue.venue.id}>
				<div>
					<p className='venueName'>{myVenue.venue.name}</p>
					<p>{myVenue.venue.location.formattedAddress[0]}</p>
					<p>{myVenue.venue.location.formattedAddress[1]}</p>
					<p>Type: {myVenue.venue.categories[0].shortName}</p>
				</div>
			</li>
	);
};

ListItem.propTypes = {
	
};

export default ListItem;