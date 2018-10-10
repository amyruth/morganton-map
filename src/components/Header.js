import React from 'react';
import './Header.css';

const Header = (props) => {
	return (
		<header role='banner'>
			<a href='#main-menu'	 id='nav-icon' role='button'
				aria-pressed='false'
				aria-expanded='false'
				aria-controls='main-menu'
				aria-label='Open and close main menu' 
				onClick={props.openMenu} 
				onKeyPress={props.openMenu}
				>
				menu
			</a>
			
			<h1>
				the morganton meal map
			</h1>
		
		

		
		</header>
	);
};

export default Header;