import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './VenueList.css';
const VenueList = props => {
	return (
		<ul className='venues' role='menu'>
			<ListItem myVenues={props.myVenues}
				onListKeypress={props.onListKeypress}
				listClickHandler={props.listClickHandler} 
			/>
		</ul>
	);
};

VenueList.propTypes = {
	
};

export default VenueList;