import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const VenueList = props => {
	return (
		<ul className='venues'>
			<ListItem myVenues={props.myVenues}
				listClickHandler={props.listClickHandler} 
			/>
		</ul>
	);
};

VenueList.propTypes = {
	
};

export default VenueList;