import React from 'react';
import './Header.css';


const Header = (props) => {
	return (
		<header>
			<h1>
				mmm - the morganton meal map
			</h1>
			<a href='#main-menu' 
			className='menu-toggle'
			role='button'
			id='main-menu-toggle'
			aria-explanded='false'
			aria-controls='main-menu'
			aria-label='Open main menu'
			>
				<div id='nav-icon' aria-hidden='true' onClick={props.openMenu}>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
				</div>
			</a>
		

		
		</header>
	);
};

export default Header;