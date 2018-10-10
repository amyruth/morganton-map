import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './VenueList.css';
const VenueList = props => {
	return (
		<ul className='venues' role='menu' aria-labelledby='nav-icon'>
			<ListItem myVenues={props.myVenues}
				listKbHandler={props.listKbHandler}
				listClickHandler={props.listClickHandler} 
			/>
		</ul>
	);
};

VenueList.propTypes = {
	
};

export default VenueList;