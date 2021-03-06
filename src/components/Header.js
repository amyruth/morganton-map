import React from 'react';
import './Header.css';

const Header = (props) => {
	return (
		<header role='banner'>
			<button id='nav-icon'
				aria-haspopup='true'
				aria-controls='main-menu'
				aria-label='Restaurant menu button' 
				onClick={props.toggleMenu}
				
			>
				menu
			</button>
			
			<h1>
				the morganton meal map
			</h1>
		</header>
	);
};

export default Header;