import React from 'react';
import './Header.css';
const Header = () => {
	return (
		<header>
			<a href='#main-menu' 
			className='menu-toggle'
			role='button'
			id='main-menu-toggle'
			aria-explanded='false'
			aria-controls='main-menu'
			aria-label='Open main menu'
			>
				<div id='nav-icon' aria-hidden='true'>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
					<div className='hamburger-icon'></div>
				</div>
			</a>
		
			<h1>
				mmm - the morganton meal map
			</h1>

		
		</header>
	);
};

export default Header;