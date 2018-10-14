import React from 'react';

const ListItem = props => props.myVenues.map( myVenue =>{
		return (
			<li className='listing' 
				key={myVenue.venue.id}
				title={myVenue.venue.name}
				onClick={ () => props.listClickHandler(myVenue)}
				onKeyDown={(e) => {props.listKbHandler(e, myVenue)}}
				tabIndex='0'
			>	
				<div className='venue-listing' role='menuitem'>
					<p className='venueName'>
						{myVenue.venue.name}		
					</p>
				</div>
			</li>
		)		
});

export default ListItem;

